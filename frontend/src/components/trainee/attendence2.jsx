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
import './CustomDatePicker2.css';

function Attendance2(){
    const [filterattendence1,setFilterattendence1]=useState([])
    const [allFilteredusers1,setAllFilteredusers1]=useState([])
    const [selectedDate, setSelectedDate] = useState(null);




    useEffect(()=>{
        const token=Cookies.get('token')
        const decoded=jwtDecode(token)

        const type = { userattendence: decoded.user_id };

        axios.get('http://127.0.0.1:8000/myapp/filtertraineeattendence1/', { params: type })
        .then(response => {
            console.log("attendebcetrainer",response.data);
            setFilterattendence1(response.data)
        })
        .catch(error => {
            console.log("error", error);
        });
    },[])

    const getDateClass1 = (date) => {
        const formattedDate = date.toLocaleDateString('en-CA');
        const attendanceRecords = filterattendence1.filter(att => att.date === formattedDate);

        if (attendanceRecords.length > 0) {
            const isPresent = attendanceRecords.some(att => att.status === 'present');
            return isPresent ? 'present' : 'absent';
        }

        return '';
    };

        useEffect(()=>{
            const type1 = { usertype: "Trainee" };
                axios.get('http://127.0.0.1:8000/myapp/allusersprofile/', { params: type1 })
                    .then(response => {
                        setAllFilteredusers1(response.data);
                        console.log("allne",response.data);
                    })
                    .catch(error => {
                        console.log("error", error);
                    });  
            },[])         

    return(
        <>
            <div className="md:h-full h-screen w-4/6 md:w-full bg-gradient-to-r from-blue-50 to-blue-100">
                    <div className="mt-6">
                        <div className="md:w-full w-3/4 flex justify-center items-center">
                            <div className="w-full md:w-2/5 md:h-16 flex justify-start md:mb-3 mb-9 rounded-l-full rounded-r-full" style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.7)' }}>
                                {allFilteredusers1.map((user) => {
                                    if (filterattendence1.some((attendance) => attendance.userid === user.id)) {
                                        const attendanceRecord = filterattendence1.find((attendance) => attendance.userid === user.id);
                                            return (
                                                <div key={user.id} className="flex  justify-center items-center">
                                                    <div  className="relative block h-16 w-16 rounded-full overflow-hidden shadow focus:outline-none">
                                                        <img src={`http://127.0.0.1:8000${user.user_image}`} alt="User Profile" className="h-full w-full object-cover cursor-pointer"/>
                                                    </div>
                                                    <div className="ml-3 md:ml-3 md:text-xl font-serif">
                                                        <p>{user.first_name + " " + user.last_name}  - {user.dept}</p>
                                                    </div>
                                                </div>
                                            );
                                    }
                                    return null;
                                })}
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row justify-center h-2/4 w-full md:mt-9 overflow-hidden">
                            <div className="datepicker-container bg-white border border-gray-200 rounded-md shadow-lg font-sans w-full md:w-3/5 flex flex-col md:flex-row">
                                <DatePicker
                                    selected={selectedDate}
                                    inline
                                    calendarClassName="custom-calendar"
                                    dayClassName={date => getDateClass1(date)}
                                />
                            </div>
                        </div>
                    </div>                    
            </div>    
        </>

    )
}

export default Attendance2