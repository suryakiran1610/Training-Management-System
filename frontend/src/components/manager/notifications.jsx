import { useEffect, useState } from "react";
import axios from 'axios';

function Notifications(props){
    const [allnotifications,setAllnotifications]=useState([])
    const [allusers,setAllusers]=useState([])

    useEffect(() => {
            axios.get('http://127.0.0.1:8000/myapp/getallnotifications/')
                .then(response => {
                    setAllnotifications(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.log("error", error);
                });
    }, []);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/myapp/users/')
            .then(response => {
                setAllusers(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log("error", error);
            });
    }, []);



    const activestatus=(Id)=>{
        const type={"userid":Id}
        axios.put('http://127.0.0.1:8000/myapp/activateuser/', type)
                .then(response => {
                    console.log(response.data);
                    setAllusers(allusers.filter((user) => user.id !==Id));


                })
                .catch(error => {
                    console.log("error", error);
                });
    }
    const deleteuser = (userId) => {
        axios.delete("http://127.0.0.1:8000/myapp/userdeletetable/" + userId)
            .then(response => {
                console.log(response.data);
                setAllnotifications(allnotifications.filter((noti) => noti.userid !== userId));


            })
            .catch(error => {
                console.log("error", error);
            });
    };
    const deletenotification=(Id)=>{
        axios.delete("http://127.0.0.1:8000/myapp/notificationdeletetable/" + Id)
        .then(response => {
            console.log(response.data);
            setAllnotifications(allnotifications.filter((noti) => noti.id !== Id));


        })
        .catch(error => {
            console.log("error", error);
        });

    }
    const deleteallnotification=()=>{
        axios.delete("http://127.0.0.1:8000/myapp/notificationdeletetableall/")
        .then(response => {
            console.log(response.data);
            setAllnotifications([]);


        })
        .catch(error => {
            console.log("error", error);
        });

    }
    const readed=(Id)=>{
        const type={"notificationid":Id}
        axios.put('http://127.0.0.1:8000/myapp/readednotification/', type)
                .then(response => {
                    console.log(response.data);
                    props.updateNotification();
                    setAllnotifications(allnotifications.map((noti) => 
                        noti.id === Id ? { ...noti, isread: true } : noti
                    ));
                })
                .catch(error => {
                    console.log("error", error);
                });

    }


    return(
        <>
            <div className="md:h-full h-screen w-3/4 md:w-full bg-gradient-to-r from-blue-50 to-blue-100">

                <div className="2xl:w-4/12 bg-gradient-to-r from-blue-50 to-blue-100 h-screen overflow-y-auto md:p-8 p-4 ">
                    <div className="flex items-center justify-between">
                        <p tabIndex="0" className="focus:outline-none text-2xl font-semibold leading-6 text-gray-800">Notifications</p>
                        <p onClick={deleteallnotification} className="cursor-pointer text-sm">Clear All</p>
                    </div>
                    {allnotifications.map((notification,index)=>(
                        <div onClick={()=>{readed(notification.id)}} key={index}  className={`w-full p-3 mt-4 rounded shadow hover:shadow-lg transition-shadow duration-300 ease-in-out flex flex-shrink-0 ${notification.isread ? 'bg-white' : 'bg-blue-200'}`}>
                            <div tabIndex="0" aria-label="group icon" role="img" className="focus:outline-none w-8 h-8 border rounded-full border-gray-200 flex flex-shrink-0 items-center justify-center">
                                {notification.type === 'userregistration' ? (
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M1.33325 14.6667C1.33325 13.2522 1.89516 11.8956 2.89535 10.8954C3.89554 9.89523 5.2521 9.33333 6.66659 9.33333C8.08107 9.33333 9.43763 9.89523 10.4378 10.8954C11.438 11.8956 11.9999 13.2522 11.9999 14.6667H1.33325ZM6.66659 8.66666C4.45659 8.66666 2.66659 6.87666 2.66659 4.66666C2.66659 2.45666 4.45659 0.666664 6.66659 0.666664C8.87659 0.666664 10.6666 2.45666 10.6666 4.66666C10.6666 6.87666 8.87659 8.66666 6.66659 8.66666ZM11.5753 10.1553C12.595 10.4174 13.5061 10.9946 14.1788 11.8046C14.8515 12.6145 15.2515 13.6161 15.3219 14.6667H13.3333C13.3333 12.9267 12.6666 11.3427 11.5753 10.1553ZM10.2266 8.638C10.7852 8.13831 11.232 7.52622 11.5376 6.84183C11.8432 6.15743 12.0008 5.41619 11.9999 4.66666C12.0013 3.75564 11.7683 2.85958 11.3233 2.06466C12.0783 2.21639 12.7576 2.62491 13.2456 3.2208C13.7335 3.81668 14.0001 4.56315 13.9999 5.33333C14.0001 5.80831 13.8987 6.27784 13.7027 6.71045C13.5066 7.14306 13.2203 7.52876 12.863 7.84169C12.5056 8.15463 12.0856 8.38757 11.6309 8.52491C11.1762 8.66224 10.6974 8.7008 10.2266 8.638Z"
                                            fill="#047857"
                                        />
                                    </svg>
                                    ) : notification.type === 'leaveapply' ? (
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.30325 12.6667L1.33325 15V2.66667C1.33325 2.48986 1.40349 2.32029 1.52851 2.19526C1.65354 2.07024 1.82311 2 1.99992 2H13.9999C14.1767 2 14.3463 2.07024 14.4713 2.19526C14.5963 2.32029 14.6666 2.48986 14.6666 2.66667V12C14.6666 12.1768 14.5963 12.3464 14.4713 12.4714C14.3463 12.5964 14.1767 12.6667 13.9999 12.6667H4.30325ZM5.33325 6.66667V8H10.6666V6.66667H5.33325Z" fill="#4338CA" />
                                    </svg>
                                ) : null}
                                 
                            </div>
                            <div className="pl-3 w-auto md:w-2/5 flex-col">
                                <div className="flex items-center justify-between">
                                    <p tabIndex="0" className="focus:outline-none text-sm leading-none"><span className="text-indigo-700">{notification.username}</span> {notification.message}</p>
                                </div>  
                                <p tabIndex="0" className="focus:outline-none text-xs leading-3 pt-1 text-gray-500"><span className="text-indigo-700"> {notification.dept}</span> Department</p>
                            </div> 
                            {allusers.find(user => user.id===notification.userid && user.is_active===false) ?(
                                <div  className="flex cursor-pointer">
                                            <div className="flex flex-col items-center mr-4 ">
                                                <div  className="flex items-center justify-center w-7 h-7 border-2 hover:border-4 border-green-500 rounded-full">
                                                    <svg onClick={()=>{activestatus(notification.userid)}} className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path  strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                                                    </svg>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-center">
                                                <div className="flex items-center justify-center w-7 h-7 border-2 hover:border-4 border-red-500 rounded-full">
                                                    <svg onClick={()=>{deleteuser(notification.userid)}} className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path  strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                </div>
                            ):
                                <div className="flex text-sm text-green-600">Activated</div>
                            }

                            <div className="focus:outline-none cursor-pointer flex w-3/5 justify-end">
                                    <svg onClick={()=>{deletenotification(notification.id)}} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.5 3.5L3.5 10.5" stroke="#4B5563" strokeWidth="1.25"  strokeLinejoin="round" />
                                        <path d="M3.5 3.5L10.5 10.5" stroke="#4B5563" strokeWidth="1.25"  strokeLinejoin="round" />
                                    </svg>
                            </div>
                            


                        </div>
                    ))}    
                </div>
            </div>

        </>
    )
}

export default Notifications