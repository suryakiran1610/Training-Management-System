import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
import axios from 'axios';
import Profile from "../components/manager/profile";
import Dashboard from "../components/manager/dashboard";
import Users from "../components/manager/users";
import Attendence from "../components/manager/attendence";
import Leave from "../components/manager/leave";
import Departments from "../components/manager/departments";
import Batch from "../components/manager/batch";
import Notifications from "../components/manager/notifications";
import { useNavigate } from "react-router-dom";


function Managerpage(){
    const [sidenav, setSidenav] = useState(true);
    const[toggleprofile,setToggleprofile]=useState(false)
    const[toggleusers,setToggleUsers]=useState(false)
    const[toggledashboard,setToggleDashboard]=useState(true)
    const[toggleallusers,setToggleallusers]=useState(false)
    const [toggleattendence,setToggleAttendence]=useState(false)
    const[userprofile,setUserprofile]=useState([])
    const [showDropdown, setShowDropdown] = useState(false);
    const [toggleleave,seTtoggleleave]=useState(false)
    const [toggledepartment,setToggledepartment]=useState(false)
    const [togglebatch,setTogglebatch]=useState(false)
    const [togglenotification,setTogglenotification]=useState(false)
    const [notifications,setNotifications]=useState([])

    const navigatee=useNavigate()




    const toggleSidenav = () => {
        setSidenav(!sidenav);
    };

    const profile=()=>{
        setToggleprofile(true)
        setToggleDashboard(false)
        setShowDropdown(false)
        setToggleallusers(false)
        setToggleAttendence(false)
        seTtoggleleave(false)
        setToggledepartment(false)
        setTogglebatch(false)
        setTogglenotification(false)




    }

    const dashboard=()=>{
        setToggleDashboard(true)
        setToggleprofile(false)
        setToggleallusers(false)
        setToggleAttendence(false)
        seTtoggleleave(false)
        setToggledepartment(false)
        setTogglebatch(false)
        setTogglenotification(false)





    
    }
    const allusers=()=>{
        setToggleallusers(true)
        setToggleDashboard(false)
        setToggleprofile(false)
        setToggleAttendence(false)
        seTtoggleleave(false)
        setToggledepartment(false)
        setTogglebatch(false)
        setTogglenotification(false)





    }
    const Attendences=()=>{
        setToggleAttendence(true)
        setToggleallusers(false)
        setToggleDashboard(false)
        setToggleprofile(false)
        seTtoggleleave(false)
        setToggledepartment(false)
        setTogglebatch(false)
        setTogglenotification(false)




    }
    const Leaves=()=>{
        seTtoggleleave(true)
        setToggleAttendence(false)
        setToggleallusers(false)
        setToggleDashboard(false)
        setToggleprofile(false)
        setToggledepartment(false)
        setTogglebatch(false)
        setTogglenotification(false)



    }
    const Department=()=>{
        setToggledepartment(true)
        seTtoggleleave(false)
        setToggleAttendence(false)
        setToggleallusers(false)
        setToggleDashboard(false)
        setToggleprofile(false)
        setTogglebatch(false)
        setTogglenotification(false)

    }

    const Batches=()=>{
        setTogglebatch(true)
        setToggledepartment(false)
        seTtoggleleave(false)
        setToggleAttendence(false)
        setToggleallusers(false)
        setToggleDashboard(false)
        setToggleprofile(false)
        setTogglenotification(false)
    }
    const Notification=()=>{
        setTogglenotification(true)
        setToggleprofile(false)
        setToggleDashboard(false)
        setShowDropdown(false)
        setToggleallusers(false)
        setToggleAttendence(false)
        seTtoggleleave(false)
        setToggledepartment(false)
        setTogglebatch(false)

    }

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


    useEffect(() => {
        updateNotification();
    }, [togglenotification, toggledashboard]);

    const updateNotification=()=>{
        axios.get('http://127.0.0.1:8000/myapp/filterednotification/')
        .then(response => {
            setNotifications(response.data);
            console.log(response.data)
        })
        .catch(error => {
            console.log("error", error);
        });

    }

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/myapp/filterednotification/')
        .then(response => {
            setNotifications(response.data);
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
    }, [toggleusers, toggledashboard]);

    const updateUserProfileImage = (newImage) => {
        setUserprofile(prevState => ({
            ...prevState,
            user_image: newImage
        }));
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleLogout = () => {
        setShowDropdown(false)
        Cookies.remove('token')
        navigatee('/login')
    };

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
                                    <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={profile}>Profile</a>
                                    <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>Logout</a>
                                </div>
                            )}
                    </div>
                </header>
            </div>

            <div id="view" className="md:h-screen w-full flex flex-row h-full "> 
                <button
                    onClick={toggleSidenav}
                    className="p-2 border-2 bg-white rounded-md border-gray-200 shadow-lg text-gray-500 focus:bg-teal-500 focus:outline-none focus:text-white absolute  sm:hidden"
                >
                    <svg
                    className="w-5 h-5 fill-current"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        fillRule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                    ></path>
                    </svg>
                </button>
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
                        <p className="text-xs text-gray-500 text-center">Manager</p>
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
                        onClick={allusers}
                        className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out cursor-pointer"
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
                        <span className="">Users</span>
                        </a>
                        <a
                        onClick={Attendences}
                        className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out cursor-pointer"
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
                        onClick={Leaves}
                        className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out cursor-pointer"
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
                        onClick={Department}
                        className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out cursor-pointer"
                        >
                        <svg
                            className="w-6 h-6 fill-current inline-block"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                            d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
                            ></path>
                        </svg>
                        <span className="">Departments</span>
                        </a>
                    
                        <a
                        onClick={Batches}
                        className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out cursor-pointer"
                        >
                        <svg
                            className="w-6 h-6 fill-current inline-block"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                            d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z"
                            ></path>
                        </svg>
                        <span className="">Add Batch</span>
                        </a>
                        
                        <a
                            onClick={Notification}
                            className="relative text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out cursor-pointer"
                            >
                            <div className="absolute left-0 top-0 bg-red-500 rounded-full">
                                <span className="text-sm text-white p-1">{notifications.length}</span>
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
                {toggleprofile &&
                <Profile userProfile={userprofile} fetchUserProfile={fetchUserProfile} updateUserProfileImage={updateUserProfileImage} updateUserProfile={updateUserProfile}/>
                }
                {toggledashboard &&
                    <Dashboard/>
                }
                {toggleallusers &&
                    <Users/>
                }
                {toggleattendence  &&
                    <Attendence/>
                }
                {toggleleave &&
                    <Leave/>
                }
                {toggledepartment &&
                    <Departments/>
                }
                {togglebatch &&
                    <Batch/>
                }
                {togglenotification &&
                    <Notifications updateNotification={updateNotification}/>
                }
            
            </div>
            
    </>
    )
}

export default Managerpage