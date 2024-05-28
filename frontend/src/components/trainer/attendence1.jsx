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
    const [batchh, setBatchh] = useState("");
    const [filteredbatchname,setFilteredbatchname]=useState([])
    const [filteredTrainees, setFilteredTrainees] = useState([]);
    const [getAttendance, setGetAttendance] = useState([]);




    useEffect(() => {
        axios.get('http://127.0.0.1:8000/myapp/traineeattendence1/')
        .then(response => {
            setGetAttendance(response.data);
            console.log("get",response.data);
        })
        .catch(error => {
            console.log("error", error);
        });
        
    }, []);


    useEffect(() => {
        const date = new Date();
        const formattedDate = date.toISOString().split('T')[0];  
        setCurrentDate(formattedDate);
    }, []);


    useEffect(() => {
        if (batchh) {
            if (batchh === "All") {
                // Get all trainee IDs from all batches
                const allTraineeIds = batch.reduce((acc, b) => {
                    return acc.concat(b.traineeid.map(id => Number(id)));
                }, []);
                // Filter trainee profiles based on these IDs
                const filtered = traineeprofile.filter(tp => allTraineeIds.includes(tp.id));
                console.log(filtered);
                setFilteredTrainees(filtered);
        } else {
            const selectedBatch = batch.find(b => b.batchname === batchh);
            console.log(selectedBatch);
            if (selectedBatch) {
                const traineeIds = selectedBatch.traineeid.map(id => Number(id)); 
                const filtered = traineeprofile.filter(tp => traineeIds.includes(tp.id));
                console.log(filtered);
                setFilteredTrainees(filtered);
            } else {
                setFilteredTrainees([]);
            }
        }
    }
}, [batchh, batch, traineeprofile]);



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
                const mergedBatches = mergeBatches(response.data);
                setBatch(mergedBatches);
                console.log("newmerged",mergedBatches);
            })
            .catch(error => {
                console.log("error", error);
            });       
    }
    const mergeBatches = (batches) => {
        const batchMap = new Map();

        batches.forEach(batch => {
            if (batchMap.has(batch.batchname)) {
                batchMap.get(batch.batchname).traineeid.push(batch.traineeid);
            } else {
                batchMap.set(batch.batchname, {
                    ...batch,
                    traineeid: [batch.traineeid]
                });
            }
        });

        return Array.from(batchMap.values());
    };

    const markAttendance = (status, deptt, date, id, name) => {
        const formData = new FormData();
        formData.append('username', name);
        formData.append('userid', id);
        formData.append('department', deptt);
        formData.append('date', date);
        formData.append('status', status);

        axios.post('http://127.0.0.1:8000/myapp/traineePostAttendence1/', formData)
            .then(response => {
                setGetAttendance(prevGetAttendance => [
                    ...prevGetAttendance,
                    { userid: id, date, status }
                ]);
                console.log(response.data);
            })
            .catch(error => {
                console.log("error", error);
            });
    }
    const trainerattendenceshow=()=>{
        setSelecttab(true)
        setViewbtn(false)
        setSelecttab1(false)
    }
    
    const traineeattendenceshow=()=>{
        setViewbtn(false)
        setSelecttab(false)
        setSelecttab1(true)
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
                
                {traineeattendence && (
                    <div className="flex flex-col md:flex-row justify-center h-2/4 w-full md:mt-1">
                        <div className="container mx-auto px-4 sm:px-8 md:mt-1">
                            <div className="py-8 md:mt-1">
                                <div className="my-2 flex sm:flex-row flex-col md:mt-1 mt-16 ">
                                    <div className="flex">
                                        <div className="relative">
                                            <select onChange={(e) => { setBatchh(e.target.value) }}
                                                className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r border-b border-l border-r block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                                                <option>All</option>
                                                {batch.map((bat, index) => (
                                                    <option key={index}>{bat.batchname}</option>
                                                ))}
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                                        <table className="min-w-full leading-normal">
                                            <thead>
                                                <tr>
                                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                        Trainer
                                                    </th>
                                                    <th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                        Department
                                                    </th>
                                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                        Date
                                                    </th>
                                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                        Attendance
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredTrainees.map((profile, index) => (
                                                    <tr key={index}>
                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0 w-10 h-10">
                                                                    <img className="w-full h-full rounded-full" src={`http://127.0.0.1:8000${profile.user_image}`} alt="profileimg" />
                                                                </div>
                                                                <div className="ml-3">
                                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                                        {profile.first_name + " " + profile.last_name}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                            <p className="text-gray-900 whitespace-no-wrap">{profile.dept}</p>
                                                        </td>
                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                {currentDate}
                                                            </p>
                                                        </td>
                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                            <div className="flex items-center">
                                                                {getAttendance.some(att => att.userid === profile.id && att.date === currentDate) ? (
                                                                    <span className={`w-20 rounded-lg h-7 flex justify-center items-center text-white ${
                                                                        getAttendance.find(att => att.userid === profile.id && att.date === currentDate).status === 'present'
                                                                        ? 'bg-green-600'
                                                                        : 'bg-red-600'
                                                                    }`}>
                                                                        {getAttendance.find(att => att.userid === profile.id && att.date === currentDate).status === 'present' ? 'Present' : 'Absent'}
                                                                    </span>
                                                                ) : (
                                                                    <>
                                                                        <button
                                                                            onClick={() => markAttendance('absent', profile.dept, currentDate, profile.id, profile.first_name + " " + profile.last_name)}
                                                                            className="bg-red-600 w-8 rounded-sm h-6 text-white flex justify-center items-center mr-3"
                                                                        >
                                                                            A
                                                                        </button>
                                                                        <button
                                                                            onClick={() => markAttendance('present', profile.dept, currentDate, profile.id, profile.first_name + " " + profile.last_name)}
                                                                            className="bg-green-600 w-8 rounded-sm h-6 text-white flex justify-center items-center ml-3"
                                                                        >
                                                                            P
                                                                        </button>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr> 
                                                ))}   
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}  
                    
            </div>    
        </>

    )
}

export default Attendance1