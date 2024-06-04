import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Dashboard2 from "../components/trainee/dashboard2";
import Attendance2 from "../components/trainee/attendence2";
import Leave2 from "../components/trainee/leave2";
import Notifications2 from "../components/trainee/notification2";
import Project2 from "../components/trainee/project2";

function Traineepage(){
    const [showDropdown, setShowDropdown] = useState(false);
    const [sidenav, setSidenav] = useState(true);
    const[toggledashboard,setToggleDashboard]=useState(true)
    const [toggleattendence,setToggleAttendence]=useState(false)
    const [toggleleave,setToggleLeave]=useState(false)
    const [togglebatch,setTogglebatch]=useState(false)
    const [togglenotification,setTogglenotification]=useState(false)
    const [toggleproject,setToggleproject]=useState(false)

    const[userprofile,setUserprofile]=useState([])
    const [notifications,setNotifications]=useState([])
    const [notifications1,setNotifications1]=useState([])



    const navigatee=useNavigate()






    const dashboard=()=>{
        setToggleDashboard(true)
        setToggleAttendence(false)
        setToggleLeave(false)
        setTogglebatch(false)
        setTogglenotification(false)
        setToggleproject(false)

    }  
    const project=()=>{
        setToggleproject(true)
        setToggleDashboard(false)
        setToggleAttendence(false)
        setToggleLeave(false)
        setTogglebatch(false)
        setTogglenotification(false)

    }
    const Attendence=()=>{
        setToggleAttendence(true)
        setToggleDashboard(false)
        setToggleLeave(false)
        setTogglebatch(false)
        setTogglenotification(false)
        setToggleproject(false)





    }

    const Leave=()=>{
        setToggleLeave(true)
        setToggleAttendence(false)
        setToggleDashboard(false)
        setTogglebatch(false)
        setTogglenotification(false)
        setToggleproject(false)


    }
    const batch=()=>{
        setTogglebatch(true)
        setToggleLeave(false)
        setToggleAttendence(false)
        setToggleDashboard(false)
        setTogglenotification(false)
        setToggleproject(false)


    }
    const Notifications=()=>{
        setTogglenotification(true)
        setTogglebatch(false)
        setToggleLeave(false)
        setToggleAttendence(false)
        setToggleDashboard(false)
        setToggleproject(false)

    }
    
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleLogout = () => {
        setShowDropdown(false)
        Cookies.remove('token')
        navigatee('/login')
    };

    const updateUserProfile = (updatedProfile) => {
        setUserprofile(updatedProfile);
    };
    
    useEffect(() => {
        const token=Cookies.get('token')
        const decoded=jwtDecode(token)
        axios.get('http://127.0.0.1:8000/myapp/profiledetails/'+decoded.user_id)
        .then(response => {
            setUserprofile(response.data);
            console.log(response.data)
        })
        .catch(error => {
            console.log("error", error);
        });
    }, []);

    const fetchUserProfile = () => {
        const token=Cookies.get('token')
        const decoded=jwtDecode(token)
        axios.get('http://127.0.0.1:8000/myapp/profiledetails/'+decoded.user_id)
        .then(response => {
            setUserprofile(response.data);
            console.log(response.data)
        })
        .catch(error => {
            console.log("Error fetching user profile:", error);
        });
    };

    useEffect(() => {
        fetchUserProfile();
    }, [toggledashboard]);

    const updateUserProfileImage = (newImage) => {
        setUserprofile(prevState => ({
            ...prevState,
            user_image: newImage
        }));
    };

    useEffect(() => {
        updateNotification();
    }, [togglenotification, toggledashboard]);

    const updateNotification=()=>{
        const token=Cookies.get('token')
        const decoded=jwtDecode(token)
        const type = { userid: decoded.user_id };

        axios.get('http://127.0.0.1:8000/myapp/filterednotificationuserid5/',{ params: type })
        .then(response => {
            setNotifications1(response.data);
            console.log(response.data)
        })
        .catch(error => {
            console.log("error", error);
        });

    }

    useEffect(()=>{
        const token = Cookies.get('token');
        const decoded = jwtDecode(token);
        const type = { userid: decoded.user_id };
        axios.get('http://127.0.0.1:8000/myapp/filterednotificationuserid4/',{ params: type })
        .then(response => {
            setNotifications(response.data);
            console.log(response.data)
        })
        .catch(error => {
            console.log("error", error);
        });
    },[])



    return(
        <>
            <div className="flex flex-col w-full">
                <header className="text-white bg-gradient-to-r from-slate-50 to-sky-400 sticky left-auto top-0 right-0">
                    <div className="h-12 px-6 flex relative items-center justify-between">
                        <div>
                            <h1 className="text-purple-600 font-bold text-xl">Training Management System</h1>
                        </div>
                        <div className="relative block h-8 w-8 rounded-full overflow-hidden shadow focus:outline-none">
                            <img src={`http://127.0.0.1:8000${userprofile.user_image}`} alt="User Profile"  className="h-full w-full object-cover cursor-pointer" onClick={toggleDropdown} />
                        </div>
                        {showDropdown && (
                                <div className="absolute  top-8 right-1 mt-2 w-auto bg-white rounded-md shadow-lg">
                                    <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>Logout</a>
                                </div>
                            )}
                    </div>
                </header>
            </div>

            <div id="view" className="md:h-screen w-full flex flex-row h-full "> 
                
                {sidenav &&
                <div
                    id="sidebar"
                    className="bg-white h-screen md:block  px-3 md:w-1/6 w-70 overflow-x-hidden transition-transform duration-300 ease-in-out"                >
                    <div className="space-y-6 md:space-y-10 mt-10">
                    <div id="profile" className="w-10/12 mx-auto">
                        <img
                        src={`http://127.0.0.1:8000${userprofile.user_image}`}
                        alt="Avatar user"
                        className="w-16 h-16 rounded-full mx-auto"
                        />
                        <div>
                        <h2 className="font-medium text-xs md:text-sm text-center text-teal-500">
                            {`${userprofile.first_name} ${userprofile.last_name}`}
                        </h2>
                        <p className="text-xs text-gray-500 text-center">Trainee</p>
                        </div>
                    </div>

                    <div id="menu" className="flex flex-col space-y-2">
                        <a
                        className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out cursor-pointer"
                        onClick={dashboard}
                        >
                        <svg
                            className="w-6 h-6 fill-current inline-block"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                            d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                            ></path>
                        </svg>
                        <span className="">Dashboard</span>
                        </a>
                        <a
                        className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out cursor-pointer"
                        onClick={project}
                        >
                        <svg
                            className="w-6 h-6 fill-current inline-block"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                            d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
                            ></path>
                        </svg>
                        <span className="">Projects</span>
                        </a>
                        <a
                        className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out cursor-pointer"
                        onClick={Attendence}
                        >
                        <svg
                            className="w-6 h-6 fill-current inline-block"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                            ></path>
                        </svg>
                        <span className="">Attendence</span>
                        </a>
                        <a
                        className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out cursor-pointer"
                        onClick={Leave}

                        >
                        <svg
                            className="w-6 h-6 fill-current inline-block"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                            <path
                            fillRule="evenodd"
                            d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                            clipRule="evenodd"
                            ></path>
                        </svg>
                        <span className="">Leave</span>
                        </a>
            
                        <a
                            onClick={Notifications}
                            className="relative text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out cursor-pointer"
                            >
                            <div className="absolute left-0 top-0 bg-red-500 rounded-full">
                                <span className="text-sm text-white p-1">{notifications1.length}</span>
                            </div>
                            <svg
                                className="w-6 h-6 fill-current inline-block"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"
                                ></path>
                                <path
                                d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"
                                ></path>
                            </svg>
                            <span>Notifications</span>
                        </a>


                    </div>
                    </div>
                </div>
                }

                {toggledashboard &&
                    <Dashboard2 userProfile={userprofile} fetchUserProfile={fetchUserProfile} updateUserProfileImage={updateUserProfileImage} updateUserProfile={updateUserProfile} />
                }
                {togglenotification &&
                    <Notifications2 updateNotification={updateNotification} />
                }
                {toggleattendence &&
                    <Attendance2/>
                }
                {toggleleave &&
                    <Leave2/>
                }
                {toggleproject &&
                    <Project2/>
                }
            </div>
            
        </>
    )
}

export default Traineepage