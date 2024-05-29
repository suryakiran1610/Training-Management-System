import React, { useState,useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";

function Batch1(){
    const [filteredbatch, setFilteredbatch] = useState([]);
    const [viewdeptss, setViewdeptss] = useState([]);
    const [viewfilteredusers1, setViewfilteredusers1] = useState([]);
    const [toggleedit,setToggleedit]=useState(null)
    const [time,setTime]=useState("")
    c







    useEffect(()=>{
        const token=Cookies.get('token')
        const decoded=jwtDecode(token)

        const type = { userid: decoded.user_id };
        axios.get('http://127.0.0.1:8000/myapp/filteredBatchesuserid/', { params: type })
        .then(response => {
            const mergedBatches = mergeBatches(response.data);
            setFilteredbatch(mergedBatches);
            console.log(mergedBatches);
        })
        .catch(error => {
            console.log("error", error);
        });
    },[])

    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/myapp/departments/')
            .then(response => {
                setViewdeptss(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log("error", error);
            });

    },[])

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/myapp/users/')
            .then(response => {
                setViewfilteredusers1(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log("error", error);
            });
    }, []);


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


        const getTraineeNames = (traineeIds) => {
        return traineeIds.map(id => {
        const trainee = viewfilteredusers1.find(user => user.id.toString() === id.toString());
        return trainee ? `${trainee.first_name} ${trainee.last_name}` : id;
        }).join(', ');
        };



        const getdeptlogo = (dept) => {
        const department = viewdeptss.find(dep => dep.dept === dept);
        return department ? department.dept_image : "";
        };

        const addtimeschedule=(index)=>{
            setToggleedit(index)
        }

    return(
        <>
            <div className="md:h-full h-screen w-4/6 md:w-full bg-gradient-to-r from-blue-50 to-blue-100">
                <div className="md:flex-row flex flex-col w-11/12 md:w-full md:justify-evenly mt-5 flex-wrap justify-center items-center">
                                {filteredbatch.map((batch, index) => (
                                    <div key={index} className="md:w-1/4 ml-2 mr-2 w-full overflow-hidden rounded-lg bg-white shadow-md duration-300 hover:scale-105 hover:shadow-xl md:p-3 mb-9">
                                        <div>
                                        <FaEdit onClick={()=>addtimeschedule(index)} className="text-red-600 cursor-pointer" />
                                        </div>
                                        <div className="mx-auto mt-1 h-8 w-8 text-green-400">
                                            <img className="w-full h-full rounded-full" src={`http://127.0.0.1:8000${getdeptlogo(batch.dept)}`} alt="department image" />
                                        </div>
                                        <h1 className="mt-2 text-center text-xl font-bold text-gray-500">{batch.batchname}</h1>
                                        <p className="my-2 text-center text-sm text-gray-500 ">Trainer: <span className="font-serif font-bold">{batch.trainer}</span></p>
                                        <div className="flex flex-wrap justify-center items-center">
                                            <p className="my-2 text-center text-sm text-gray-500"> Trainee:<span className="font-serif font-bold  flex flex-col">{getTraineeNames(batch.traineeid)}</span></p>
                                        </div>
                                        <div className="flex-col justify-center items-center">
                                            <p className="my-1 text-center text-sm text-gray-500">Date: {batch.time}</p>
                                            <p className="my-1 text-center text-sm text-gray-500">Time: {batch.time}</p>
                                        </div>
                                        {toggleedit === index && (
                                            <div className="w-full">
                                                <div className="w-full flex justify-center items-center mt-4">
                                                    <input className="cursor-pointer" type="time"></input>
                                                    <input className=" bg-slate-200 rounded-md w-28 ml-4" type="text"></input>
                                                </div>
                                                <div className="w-full flex justify-center items-center mt-4">
                                                    <button className="bg-orange-500 w-16 h-7 rounded-md text-white mr-4" onClick={()=>{setToggleedit(null)}}>Cancel</button>
                                                    <button className="bg-green-500 w-16 h-7 rounded-md text-white" type="submit">Save</button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                </div>
            </div>
        </>
    )
}

export default Batch1