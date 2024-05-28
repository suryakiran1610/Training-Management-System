import { useEffect, useState } from "react";
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './CustomDatePicker1.css';

function Attendance1(){

    const [traineeattendence, setTraineeattendence] = useState(false);
    const [traineeprofile, setTraineeprofile] = useState([]);
    const [batch,setBatch]=useState([])
    const [viewbtn,setViewbtn]=useState(true)
    const [attendenceon,setAttendenceon]=useState(false)
    const [titleon,seTtitleon]=useState(true)
    const [showattends,setShowattends]=useState(false)
    const [currentDate, setCurrentDate] = useState("");




    useEffect(() => {
        const date = new Date();
        const formattedDate = date.toISOString().split('T')[0];  
        setCurrentDate(formattedDate);
    }, []);


    const addattendencetab = () => {
        seTtitleon(false)
        setViewbtn(true)
        setTraineeattendence(true);
        setShowattends(false)
        setAttendenceon(true)


        const type = { usertype: "Trainee" };

        axios.get('http://127.0.0.1:8000/myapp/allusersprofile/', { params: type })
            .then(response => {
                setTraineeprofile(response.data);
                console.log("trainees",response.data);
            })
            .catch(error => {
                console.log("error", error);
            });

        const token=Cookies.get('token')
        const decoded=jwtDecode(token)

        axios.get('http://127.0.0.1:8000/myapp/trainerBatchfilter/'+decoded.user_id)
            .then(response => {
                setBatch(response.data);
                console.log("batch",response.data);
            })
            .catch(error => {
                console.log("error", error);
            });       
    }

    return(
        <>
            <div className="md:h-full h-screen w-4/6 md:w-full bg-gradient-to-r from-blue-50 to-blue-100">
                <div className="md:flex-row flex flex-col w-11/12">
                    <div className="flex justify-start mt-2">
                        <p className="cursor-pointer md:ml-1 hover:text-blue-500" onClick={addattendencetab}>Add / </p>
                        {viewbtn && (
                            <p
                                className="cursor-pointer md:ml-1 hover:text-blue-500"
                                onClick={() => {
                                    setViewbtn(false);
                                    setShowattends(true);
                                    setAttendenceon(false)
                                    seTtitleon(false)
                                    setTraineeattendence(false);
                                }}
                            >
                                View
                            </p>
                        )}
                        {showattends && (
                            <>
                                <p onClick={trainerattendenceshow} className="cursor-pointer md:ml-1 hover:text-blue-500">Trainer / </p>
                                <p onClick={traineeattendenceshow} className="cursor-pointer md:ml-1 hover:text-blue-500">Trainee</p>
                            </>
                        )}
                    </div>
                    {titleon &&
                        <div className="mt-2 flex justify-center flex-1">
                            <p className="font-bold font text-2xl text-purple-600">Attendance</p>
                        </div>
                    }
                    {attendenceon &&
                    <div className="mt-2 flex flex-1 justify-center">
                        <p className="font-bold font md:text-2xl text-lg text-purple-600">Attendance on {currentDate}</p>
                    </div>
                    }
                </div>

                
                    
            </div>    
        </>

    )
}

export default Attendance1