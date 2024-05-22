import { useEffect, useState } from "react";
import axios from 'axios';

function Leave() {
    const [trainerApplications, setTrainerApplications] = useState(false);
    const [traineeApplications, setTraineeApplications] = useState(false);

    const [trainerfilter,setTrainerfilter]=useState([])
    const [traineefilter,setTraineefilter]=useState([])


    const trainer = (e) => {
        e.preventDefault()
        setTrainerApplications(true);
        setTraineeApplications(false);

        const type = { usertype: "Trainer" };
        axios.get('http://127.0.0.1:8000/myapp/leavefilter/', { params: type })
            .then(response => {
                setTrainerfilter(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log("error", error);
            });    
    };

    const trainee = (e) => {
        e.preventDefault()
        setTraineeApplications(true);
        setTrainerApplications(false);

        const type = { usertype: "Trainee" };
        axios.get('http://127.0.0.1:8000/myapp/leavefilter/', { params: type })
            .then(response => {
                setTraineefilter(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log("error", error);
            });    
    };

    const updatestatus=(id,status)=>{

        const formData=new FormData();
        formData.append('userid',id);
        formData.append('status',status);

        axios.put('http://127.0.0.1:8000/myapp/changeleavestatus/',formData)
            .then(response => {
                console.log(response.data);
                setTrainerfilter(prevState => 
                    prevState.map(leave => 
                        leave.userid === id ? { ...leave, status: status } : leave
                    )
                );
            })
            .catch(error => {
                console.log("error", error);
            });   
    }

    const getStatusClass = (status) => {
        switch (status) {
            case "Approved":
                return "bg-green-400";
            case "Rejected":
                return "bg-red-400";
            case "Pending":
                return "bg-orange-400";
            default:
                return "bg-gray-400";
        }
    };

    const updatestatus1=(id,status)=>{

        const formData=new FormData();
        formData.append('userid',id);
        formData.append('status',status);

        axios.put('http://127.0.0.1:8000/myapp/changeleavestatus/',formData)
            .then(response => {
                console.log(response.data);
                setTraineefilter(prevState => 
                    prevState.map(leave => 
                        leave.userid === id ? { ...leave, status: status } : leave
                    )
                );
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


    return (
        <>
            <div className="flex flex-col md:h-full md:w-full h-screen w-full bg-gradient-to-r from-blue-50 to-blue-100">
                <div className="flex w-full">
                    <div className="flex justify-start mt-2 flex-1">
                        <p className="cursor-pointer md:ml-1 hover:text-blue-500" onClick={trainer}>Trainer / </p>
                        <p className="cursor-pointer md:ml-1 hover:text-blue-500" onClick={trainee}>Trainee</p>
                    </div>
                    <div className="mt-2 flex justify-start flex-1">
                        <p className="font-bold font text-2xl text-purple-600">Applications</p>
                    </div>
                </div>
                {trainerApplications && (
                    <div className="md:flex-row flex flex-col w-full md:justify-evenly mt-9 flex-wrap justify-center items-center">
                        {trainerfilter.map((leave,index)=>
                            <div key={index} className="relative bg-yellow-100 p-4 rounded-lg shadow-lg max-w-sm w-11/12 mb-6 card">
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
                                    <span className={`${getStatusClass(leave.status)} text-white py-1 px-3 rounded-full text-sm`}>{leave.status}</span>
                                </div>
                                {leave.status === "Pending" && (
                                    <div className="absolute inset-0 flex justify-center items-center card-buttons space-x-4">
                                        <button onClick={()=>updatestatus(leave.userid,"Approved")} className="bg-purple-500 text-white py-1 px-4 rounded-full">Approve</button>
                                        <button onClick={()=>updatestatus(leave.userid,"Rejected")} className="bg-red-500 text-white py-1 px-4 rounded-full">Reject</button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
                {traineeApplications && (
                    <div className="md:flex-row flex flex-col w-full md:justify-evenly mt-9 flex-wrap justify-center items-center">
                    {traineefilter.map((leave,index)=>
                            <div key={index} className="relative bg-yellow-100 p-4 rounded-lg shadow-lg max-w-sm w-11/12 mb-6 card">
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
                                {leave.status === "Pending" && (
                                    <div className="absolute inset-0 flex justify-center items-center card-buttons space-x-4">
                                        <button onClick={()=>updatestatus1(leave.userid,"Approved")} className="bg-purple-500 text-white py-1 px-4 rounded-full">Approve</button>
                                        <button onClick={()=>updatestatus1(leave.userid,"Rejected")} className="bg-red-500 text-white py-1 px-4 rounded-full">Reject</button>
                                    </div>
                                )}
                            </div>
                        )}
                </div>
                )}
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
    );
}

export default Leave;
