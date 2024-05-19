import React, { useEffect, useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


function Attendence() {

    const [trainerattendence,setTrainerattendence]=useState(false)
    const [trainerprofile, setTrainerprofile] = useState([]);
    const [currentDate, setCurrentDate] = useState("");
    const [depts, setDepts] = useState([]);
    const [dept, setDept] = useState("");
    const [attendence,setAttendence]=useState([])



    useEffect(() => {
        const date = new Date();
        const formattedDate = date.toISOString().split('T')[0];  
        setCurrentDate(formattedDate);
    }, []);



    const addattendencetab=()=>{
        setTrainerattendence(true)

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

    const absent=(deptt,date,id,name)=>{
        const formData=new FormData();
            formData.append('username',name)
            formData.append('userid',id)
            formData.append('department',deptt)
            formData.append('date',date)
            formData.append('status','absent')

        axios.post('http://127.0.0.1:8000/myapp/attendence/',formData)
            .then(response => {
                setAttendence(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log("error", error);
            });    
    }

    const present=(deptt,date,id,name)=>{
        const formData=new FormData();
            formData.append('username',name)
            formData.append('userid',id)
            formData.append('department',deptt)
            formData.append('date',date)
            formData.append('status','present')

        axios.post('http://127.0.0.1:8000/myapp/attendence/',formData)
            .then(response => {
                setAttendence(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log("error", error);
            });    
    }

    return(
        <>

            <div className="md:h-full h-screen w-4/6 md:w-full bg-gradient-to-r from-blue-50 to-blue-100">
                <div className="flex w-11/12 ml-4">
                    <div className="flex justify-start mt-2 flex-1">
                        <p className="cursor-pointer md:ml-1 hover:text-blue-500" onClick={addattendencetab}>Add / </p>
                        <p className="cursor-pointer md:ml-1 hover:text-blue-500" >View</p>
                    </div>
                    <div className="mt-2 flex justify-start flex-1 ">
                        <p className="font-bold font text-2xl text-purple-600">Attendence</p>
                    </div>
                </div>
                {trainerattendence &&(
                    <div className="flex flex-col md:flex-row justify-center h-2/4 w-full mt-9 md:mt-1" >
                        <div className="container mx-auto px-4 sm:px-8 mt-9 md:mt-1">
                            <div className="py-8 mt-9 md:mt-1">
                                <div className="my-2 flex sm:flex-row flex-col mt-9 md:mt-1">
                                    <div className="flex ">
                                        <div className="relative">
                                            <select onChange={(e)=>{setDept(e.target.value)}}
                                                className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r  border-b border-l border-r block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                                                <option>All</option>
                                                {depts.map((depatment,index)=>(
                                                    <option key={index}>{depatment.dept}</option>
                                                ))}
                                            </select>
                                            <div
                                                className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
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
                                                <tr >
                                                    <th
                                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                        Trainer
                                                    </th>
                                                    <th
                                                        className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                        Department
                                                    </th>
                                                    <th
                                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                        Date
                                                    </th>
                                                    <th
                                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                        Status
                                                    </th>
                                                    <th
                                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                        Attendence
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
                                                                        {profile.first_name + profile.last_name }
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
                                                            <span
                                                                className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                                <span aria-hidden
                                                                    className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                                                <span className="relative">Activo</span>
                                                            </span>
                                                        </td>
                                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                            <p className="text-gray-900 whitespace-no-wrap flex">
                                                                <button onClick={()=>absent(profile.dept,currentDate,profile.id,profile.first_name+profile.last_name)} className="bg-red-600 w-8 rounded-sm h-6 text-white flex justify-center items-center mr-3">A</button>
                                                                <button onClick={()=>present(profile.dept,currentDate,profile.id,profile.first_name+profile.last_name)}  className=" bg-green-600 w-8 rounded-sm h-6 text-white flex justify-center items-center ml-3">P</button>
                                                            </p>
                                                        </td>
                                                    </tr> 
                                                ))}   
                                            </tbody>
                                        </table>
                                        <div
                                            className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                                            <span className="text-xs xs:text-sm text-gray-900">
                                                Showing 1 to 4 of 50 Entries
                                            </span>
                                            <div className="inline-flex mt-2 xs:mt-0">
                                                <button
                                                    className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                                                    Prev
                                                </button>
                                                <button
                                                    className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                                                    Next
                                                </button>
                                            </div>
                                        </div>
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
export default Attendence    