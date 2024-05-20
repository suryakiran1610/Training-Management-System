import { useEffect, useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './CustomDatePicker.css';

function Attendence() {
    const [trainerattendence, setTrainerattendence] = useState(false);
    const [trainerprofile, setTrainerprofile] = useState([]);
    const [currentDate, setCurrentDate] = useState("");
    const [depts, setDepts] = useState([]);
    const [dept, setDept] = useState("");
    const [attendance, setAttendance] = useState({});
    const [getAttendance, setGetAttendance] = useState([]);
    const [showattends,setShowattends]=useState(false)
    const [viewbtn,setViewbtn]=useState(true)
    const [viewtrainerattendence,setViewtrainerattendence]=useState(false)
    const [viewtraineeattendence,setViewtraineeattendence]=useState(false)
    const [selectedDate, setSelectedDate] = useState(null);
    const [displaytrainerattendence,setDisplaytrainerattendence]=useState([])


    useEffect(() => {
        const date = new Date();
        const formattedDate = date.toISOString().split('T')[0];  
        setCurrentDate(formattedDate);
    }, []);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/myapp/trainerattendence/')
        .then(response => {
            setGetAttendance(response.data);
            console.log(response.data);
        })
        .catch(error => {
            console.log("error", error);
        });
    }, []);

    const addattendencetab = () => {
        setTrainerattendence(true);
        setViewbtn(true)
        setShowattends(false)
        setViewtrainerattendence(false)
        setViewtraineeattendence(false)

        const type = { usertype: "Trainer" };

        axios.get('http://127.0.0.1:8000/myapp/allusersprofile/', { params: type })
            .then(response => {
                setTrainerprofile(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log("error", error);
            });

        axios.get('http://127.0.0.1:8000/myapp/departments/')
            .then(response => {
                setDepts(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log("error", error);
            });    
    }


    useEffect(() => {
        if (dept && dept !== "All") {
            const type = { usertype: "Trainer", depts: dept };
    
            axios.get('http://127.0.0.1:8000/myapp/allUsersProfilefilter/', { params: type })
                .then(response => {
                    setTrainerprofile(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.log("error", error);
                });
        } else {
            const type = { usertype: "Trainer" };
            axios.get('http://127.0.0.1:8000/myapp/allusersprofile/', { params: type })
                .then(response => {
                    setTrainerprofile(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.log("error", error);
                });
        }
    }, [dept]);


    const markAttendance = (status, deptt, date, id, name) => {
        const formData = new FormData();
        formData.append('username', name);
        formData.append('userid', id);
        formData.append('department', deptt);
        formData.append('date', date);
        formData.append('status', status);

        axios.post('http://127.0.0.1:8000/myapp/attendence/', formData)
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
        setTrainerattendence(false);
        setViewbtn(false)
        setViewtrainerattendence(true)
        setViewtraineeattendence(false)

        axios.get('http://127.0.0.1:8000/myapp/trainerattendence/')
        .then(response => {
            console.log(response.data);
            setDisplaytrainerattendence(response.data)
        })
        .catch(error => {
            console.log("error", error);
        });

        const type = { usertype: "Trainer" };

        axios.get('http://127.0.0.1:8000/myapp/allusersprofile/', { params: type })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log("error", error);
            });

        axios.get('http://127.0.0.1:8000/myapp/departments/')
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log("error", error);
            });    

    }
    const traineeattendenceshow=()=>{
        setTrainerattendence(false);
        setViewbtn(false)
        setViewtrainerattendence(false)
        setViewtraineeattendence(false)

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
                                    setTrainerattendence(false)
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
                    <div className="mt-2 flex flex-1 justify-center">
                        <p className="font-bold font md:text-2xl text-xl text-purple-600">Attendance on {currentDate}</p>
                    </div>
                </div>

                {trainerattendence && (
                    <div className="flex flex-col md:flex-row justify-center h-2/4 w-full md:mt-1">
                        <div className="container mx-auto px-4 sm:px-8 md:mt-1">
                            <div className="py-8 md:mt-1">
                                <div className="my-2 flex sm:flex-row flex-col md:mt-1 ">
                                    <div className="flex">
                                        <div className="relative">
                                            <select onChange={(e) => { setDept(e.target.value) }}
                                                className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r border-b border-l border-r block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                                                <option>All</option>
                                                {depts.map((department, index) => (
                                                    <option key={index}>{department.dept}</option>
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
                                                {trainerprofile.map((profile, index) => (
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
                                                                    <span className={`w-14 rounded-sm h-7 flex justify-center items-center text-white ${
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
                {viewtrainerattendence &&(
                    <div className="flex flex-col md:flex-row justify-center h-2/4 w-full md:mt-1 overflow-hidden">
                    <DatePicker
                         selected={selectedDate}
                         onChange={(date) => setSelectedDate(date)}
                         inline
                         calendarClassName="custom-calendar"
                     />
                 </div>
             )}
            </div>        
        </>
    )
}

export default Attendence;
