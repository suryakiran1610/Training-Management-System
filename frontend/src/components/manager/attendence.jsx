import { useEffect, useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './CustomDatePicker.css';

function Attendence() {
    const [trainerattendence, setTrainerattendence] = useState(true);
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
    const [attendenceon,setAttendenceon]=useState(true)
    const [titleon,seTtitleon]=useState(false)

    const [selecttab,setSelecttab]=useState(false)
    const [deptss, setDeptss] = useState([]);
    const [department,setDepartment]=useState("")
    const [filteredusers,setFilteredusers]=useState([])
    const [user,setUser]=useState("")
    const [filterattendence,setFilterattendence]=useState([])
    const [allFilteredusers,setAllFilteredusers]=useState([])

    const [deptss1, setDeptss1] = useState([]);
    const [selecttab1,setSelecttab1]=useState(false)
    const [department1,setDepartment1]=useState("")
    const [user1,setUser1]=useState("")
    const [filteredusers1,setFilteredusers1]=useState([])
    const [filterattendence1,setFilterattendence1]=useState([])
    const [allFilteredusers1,setAllFilteredusers1]=useState([])











 




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
        seTtitleon(false)
        setTrainerattendence(true);
        setViewbtn(true)
        setSelecttab1(false)
        setShowattends(false)
        setViewtrainerattendence(false)
        setViewtraineeattendence(false)
        setAttendenceon(true)
        setSelecttab(false)


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

    useEffect(()=>{
        const type = { usertype: "Trainer" };

        axios.get('http://127.0.0.1:8000/myapp/allusersprofile/', { params: type })
            .then(response => {
                setTrainerprofile(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log("error", error);
            });
    },[])

    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/myapp/departments/')
        .then(response => {
            setDepts(response.data);
            console.log(response.data);
        })
        .catch(error => {
            console.log("error", error);
        });    
    },[])


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

    useEffect(() => {
        if (department && department !== "All") {
            const type = { usertype: "Trainer", depts: department };
    
            axios.get('http://127.0.0.1:8000/myapp/allUsersProfilefilter/', { params: type })
                .then(response => {
                    setFilteredusers(response.data)
                    console.log(response.data);
                })
                .catch(error => {
                    console.log("error", error);
                });
        }
        else {
            const type = { usertype: "Trainer" };
            axios.get('http://127.0.0.1:8000/myapp/allusersprofile/', { params: type })
                .then(response => {
                    setFilteredusers(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.log("error", error);
                });
        }
    }, [department]);

    useEffect(() => {
        if (department1 && department1 !== "All") {
            const type = { usertype: "Trainee", depts: department1 };
    
            axios.get('http://127.0.0.1:8000/myapp/allUsersProfilefilter/', { params: type })
                .then(response => {
                    setFilteredusers1(response.data)
                    console.log(response.data);
                })
                .catch(error => {
                    console.log("error", error);
                });
        }
        else {
            const type = { usertype: "Trainee" };
            axios.get('http://127.0.0.1:8000/myapp/allusersprofile/', { params: type })
                .then(response => {
                    setFilteredusers1(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.log("error", error);
                });
        }
    }, [department1]);




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
        setSelecttab(true)
        setTrainerattendence(false);
        setViewbtn(false)
        setViewtrainerattendence(false)
        setViewtraineeattendence(false)
        setSelecttab1(false)


        axios.get('http://127.0.0.1:8000/myapp/departments/')
            .then(response => {
                setDeptss(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log("error", error);
            });
        
            const type = { usertype: "Trainer" };
            axios.get('http://127.0.0.1:8000/myapp/allusersprofile/', { params: type })
                .then(response => {
                    setAllFilteredusers(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.log("error", error);
                });    
    }

    const toggleattdsuser=()=>{

        const type = { userattendence: user };

        axios.get('http://127.0.0.1:8000/myapp/filterrainerattendence/', { params: type })
        .then(response => {
            console.log(response.data);
            setFilterattendence(response.data)
            setViewtrainerattendence(true)
        })
        .catch(error => {
            console.log("error", error);
        });

    }
    const getDateClass = (date) => {
        const formattedDate = date.toLocaleDateString('en-CA');
        const attendanceRecords = filterattendence.filter(att => att.date === formattedDate);

        if (attendanceRecords.length > 0) {
            const isPresent = attendanceRecords.some(att => att.status === 'present');
            return isPresent ? 'present' : 'absent';
        }

        return '';
    };
    

    

    const traineeattendenceshow=()=>{
        setTrainerattendence(false);
        setViewbtn(false)
        setViewtrainerattendence(false)
        setViewtraineeattendence(false)
        setSelecttab(false)
        setSelecttab1(true)

        axios.get('http://127.0.0.1:8000/myapp/departments/')
            .then(response => {
                setDeptss1(response.data);
                console.log("new",response.data);
            })
            .catch(error => {
                console.log("error", error);
            });
        
            const type = { usertype: "Trainee" };
            axios.get('http://127.0.0.1:8000/myapp/allusersprofile/', { params: type })
                .then(response => {
                    setAllFilteredusers1(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.log("error", error);
                });    
    }

    const toggleattdsuser1=()=>{

        const type = { userattendence: user1 };

        axios.get('http://127.0.0.1:8000/myapp/filterraineeattendence/', { params: type })
        .then(response => {
            console.log(response.data);
            setFilterattendence1(response.data)
            setViewtraineeattendence(true)
        })
        .catch(error => {
            console.log("error", error);
        });

    }
    const getDateClass1 = (date) => {
        const formattedDate = date.toLocaleDateString('en-CA');
        const attendanceRecords = filterattendence1.filter(att => att.date === formattedDate);

        if (attendanceRecords.length > 0) {
            const isPresent = attendanceRecords.some(att => att.status === 'present');
            return isPresent ? 'present' : 'absent';
        }

        return '';
    };
    



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
                                    setAttendenceon(false)
                                    seTtitleon(false)
                                    setSelecttab(false)
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
                    { attendenceon &&
                    <div className="mt-2 flex flex-1 justify-center">
                        <p className="font-bold font md:text-2xl text-lg text-purple-600">Attendance on {currentDate}</p>
                    </div>
                    }
                </div>

                {trainerattendence && (
                    <div className="flex flex-col md:flex-row justify-center h-2/4 w-full md:mt-1">
                        <div className="container mx-auto px-4 sm:px-8 md:mt-1">
                            <div className="py-8 md:mt-1">
                                <div className="my-2 flex sm:flex-row flex-col md:mt-1 mt-40 ">
                                    <div className="flex">
                                        <div className="relative ">
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
                {selecttab && (
                    <div className="flex flex-col md:flex-row justify-evenly mt-8 w-11/12 md:w-3/5">
                        <div className="mb-2 flex justify-between items-center relative z-10">
                            <label className="font-medium mr-2">Department</label>
                            <select onChange={(e) => { setDepartment(e.target.value) }}
                                className="w-full text-sm md:text-base mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400">
                                <option>All</option>
                                {deptss.map((department, index) => (
                                    <option key={index}>{department.dept}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-2 flex justify-center items-center relative z-10">
                            <label className="text-sm font-medium mr-2">Name</label>
                            <select
                                onChange={(e) => setUser(e.target.value)}
                                className="w-full text-sm md:text-base mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400"
                            >
                                <option >Select User</option>
                                {filteredusers.map((user, index) => (
                                    <option key={index} value={user.id}>{user.first_name + " " + user.last_name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-2 flex justify-center items-center relative z-10 ">
                        <button type="button" onClick={toggleattdsuser} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm w-14 h-7 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">GO</button>
                        </div>   
                    </div>
                )}
                {viewtrainerattendence && (
                    <div className="mt-6">
                        <div className="md:w-3/5 w-3/4 flex justify-end">
                        <div className="w-full md:w-2/4 md:h-16 flex justify-start md:mb-3 mb-9 rounded-l-full rounded-r-full" style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.7)' }}>
                            {allFilteredusers.map((user) => {
                                if (filterattendence.some((attendance) => attendance.userid === user.id)) {
                                    const attendanceRecord = filterattendence.find((attendance) => attendance.userid === user.id);
                                        return (
                                            <div className="flex justify-center items-center">
                                                <div key={user.id} className="relative block h-16 w-16 rounded-full overflow-hidden shadow focus:outline-none">
                                                    <img src={`http://127.0.0.1:8000${user.user_image}`} alt="User Profile" className="h-full w-full object-cover cursor-pointer"/>
                                                </div>
                                                <div className="ml-3 md:ml-9 md:text-xl font-serif">
                                                    <p>{user.first_name + " " + user.last_name} - {user.dept}</p>
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
                                    dayClassName={date => getDateClass(date)}
                                />
                            </div>
                        </div>
                    </div>
                )}


                {selecttab1 && (
                    <div className="flex flex-col md:flex-row justify-evenly mt-8 w-11/12 md:w-3/5">
                        <div className="mb-2 flex justify-between items-center relative z-10">
                            <label className="font-medium mr-2">Department</label>
                            <select onChange={(e) => { setDepartment1(e.target.value) }}
                                className="w-full text-sm md:text-base mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400">
                                <option>All</option>
                                {deptss1.map((department, index) => (
                                    <option key={index}>{department.dept}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-2 flex justify-center items-center relative z-10">
                            <label className="text-sm font-medium mr-2">Name</label>
                            <select
                                onChange={(e) => setUser1(e.target.value)}
                                className="w-full text-sm md:text-base mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400"
                            >
                                <option >Select User</option>
                                {filteredusers1.map((user, index) => (
                                    <option key={index} value={user.id}>{user.first_name + " " + user.last_name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-2 flex justify-center items-center relative z-10 ">
                        <button type="button" onClick={toggleattdsuser1} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm w-14 h-7 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">GO</button>
                        </div>   
                    </div>
                )}
                
                {viewtraineeattendence && (
                    <div className="mt-6">
                        <div className="md:w-3/5 w-3/4 flex justify-end">
                        <div className="w-full md:w-2/4 md:h-16 flex justify-start md:mb-3 mb-9 rounded-l-full rounded-r-full" style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.7)' }}>
                            {allFilteredusers1.map((user) => {
                                if (filterattendence1.some((attendance) => attendance.userid === user.id)) {
                                    const attendanceRecord = filterattendence1.find((attendance) => attendance.userid === user.id);
                                        return (
                                            <div className="flex justify-center items-center">
                                                <div key={user.id} className="relative block h-16 w-16 rounded-full overflow-hidden shadow focus:outline-none">
                                                    <img src={`http://127.0.0.1:8000${user.user_image}`} alt="User Profile" className="h-full w-full object-cover cursor-pointer"/>
                                                </div>
                                                <div className="ml-3 md:ml-9 md:text-xl font-serif">
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
                )}
    
            </div>        
        </>
    )
}

export default Attendence;
