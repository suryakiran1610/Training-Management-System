import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
import axios from 'axios';


function Leave2(){
    const [reason,setReason]=useState("")
    const [from,setFrom]=useState("")
    const [to,setTo]=useState("")
    const [toggleviewleave,setToggleviewleave]=useState(false)
    const [toggleadleave,setToggleaddleave]=useState(false)
    const [traineefilter,setTraineefilter]=useState([])



    const Addleave=()=>{
        setToggleaddleave(true)
        setToggleviewleave(false)

    }
    const Viewleave=()=>{
        setToggleviewleave(true)
        setToggleaddleave(false)

        const token=Cookies.get('token')
        const decoded=jwtDecode(token)
        
        const type = { userid: decoded.user_id };
        axios.get('http://127.0.0.1:8000/myapp/leavefilterss/', { params: type })
            .then(response => {
                setTraineefilter(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log("error", error);
            });    

    }


    const leavesubmit=(e)=>{
        e.preventDefault()

        const token=Cookies.get('token')
        const decoded=jwtDecode(token)

        const formData = new FormData();
        formData.append('username', decoded.userfullname);
        formData.append('userid', decoded.user_id);
        formData.append('department', decoded.department);
        formData.append('fromdate', from);
        formData.append('todate', to);
        formData.append('status', "Pending");
        formData.append('usertype', decoded.user)
        formData.append('message', reason);

        axios.post('http://127.0.0.1:8000/myapp/leavesubmit/', formData)
            .then(response => {
                console.log(response.data);

                const notificationFormData = new FormData();
                notificationFormData.append('name',decoded.userfullname);
                notificationFormData.append('dept',decoded.department);
                notificationFormData.append('traineeid',decoded.user_id);
                notificationFormData.append('type', "leavesubmit");
                notificationFormData.append('message', "Leave Appication ");

    
                axios.post('http://127.0.0.1:8000/myapp/notificationpost3/', notificationFormData)
                    .then(notificationResponse => {
                        console.log(notificationResponse.data);
                    })
                    .catch(error=>{
                        console.log("notification error")
                    })    


                toast.success('Leave Application Submitted', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            })
            .catch(error => {
                console.log("error", error);
            });

    }

    const getStatusClass1 = (status) => {
        switch (status) {
            case "Approved":
                return "bg-green-700";
            case "Rejected":
                return "bg-red-900";
            case "Pending":
                return "bg-orange-400";
            default:
                return "bg-gray-400";
        }
    };
    return(
        <>
            <div className="md:h-full h-screen w-4/6 md:w-full bg-gradient-to-r from-blue-50 to-blue-100">
                    <div className="flex justify-start mt-2 ">
                        <p className="cursor-pointer md:ml-1 hover:text-blue-500" onClick={Addleave}>Apply / </p>
                        <p className="cursor-pointer md:ml-1 hover:text-blue-500" onClick={Viewleave}>View</p>
                    </div>
                {toggleadleave &&(    
                    <div className="flex items-center justify-center p-12">
                        <div className="mx-auto w-full max-w-[550px]">
                            <form onSubmit={leavesubmit}>
        
                                <div className="mb-5">
                                    <label
                                    htmlFor="guest"
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                    >
                                    Reason For Applying Leave
                                    </label>
                                    <input
                                    type="text"
                                    name="guest"
                                    onChange={(e)=>{setReason(e.target.value)}}
                                    className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    />
                                </div>

                                <div className="-mx-3 flex flex-wrap">
                                    <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label
                                        className="mb-3 block text-base font-medium text-[#07074D]"
                                        >
                                        From Date
                                        </label>
                                        <input
                                        type="date"
                                        onChange={(e)=>{setFrom(e.target.value)}}
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                    </div>
                                    </div>
                                    <div className="w-full px-3 sm:w-1/2">
                                    <div className="mb-5">
                                        <label
                                        htmlFor="date"
                                        className="mb-3 block text-base font-medium text-[#07074D]"
                                        >
                                        To Date
                                        </label>
                                        <input
                                        type="date"
                                        onChange={(e)=>{setTo(e.target.value)}}
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                    </div>
                                    </div>
                                </div>

                                <div className="flex justify-center mt-6">
                                    <button
                                    className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                                    type="submit"
                                    >
                                    Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                {toggleviewleave && (
                    <div className="md:flex-row flex flex-col w-full md:justify-evenly mt-9 flex-wrap justify-center items-center">
                        {traineefilter.map((leave,index)=>
                                <div key={index} className="relative bg-yellow-100 p-4 rounded-lg shadow-lg max-w-sm w-11/12 mb-6 card duration-300 hover:scale-105 hover:shadow-xl">
                                    <div className="flex items-center mb-4">
                                        <div className="bg-yellow-400 rounded-full h-10 w-10 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div className="flex w-full justify-between">
                                            <h2 className="ml-3 text-xl font-bold">{leave.username}</h2>
                                            <h2 className="ml-3 text-lg font-bold">{leave.depatment}</h2>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 mb-4">{leave.message}</p>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-gray-600">From Date</p>
                                            <p className="font-medium">{leave.fromdate}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">To Date</p>
                                            <p className="font-medium">{leave.todate}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 text-right">
                                        <span className={`${getStatusClass1(leave.status)} text-white py-1 px-3 rounded-full text-sm`}>{leave.status}</span>
                                    </div>
        
                                </div>
                        )}
                    </div>
                )}
        </div>
            <div>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
            </div>
            <style>
                {`
                    .card-buttons {
                        display: none;

                    }
                    .card:hover .card-buttons {
                        display: flex;
                        background-color: rgba(147, 145, 145, 0.5);
                    }
                `}
            </style>
        </>
    )
}

export default Leave2