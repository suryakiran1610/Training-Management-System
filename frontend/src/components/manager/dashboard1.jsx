import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
import axios from 'axios';

function Dashboard1(){

    const[userprofile,setUserprofile]=useState([])

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

    return(
        <>
            <div className="flex flex-col h-full w-full bg-gradient-to-r from-blue-50 to-blue-100 ">
            
            <div className="flex flex-col md:flex-row justify-center h-2/3 w-full " >
                <div className="md:order-1 w-4/6 md:w-2/6 md:h-3/4 h-full flex flex-col justify-center items-center md:mt-6 ml-9 shadow-2xl rounded-md bg-white mt-6">
                    <div className="relative block h-32 w-32 rounded-full overflow-hidden shadow focus:outline-none">
                        <img src={`http://127.0.0.1:8000${userprofile.user_image}`} alt="User Profile"  className="h-full w-full object-cover" />
                    </div>
                    <div className="mt-4 font-bold font-sans text-xl">
                        <h1>{`${userprofile.first_name} ${userprofile.last_name}`}</h1>
                    </div>
                </div>
                </div>
                </div>
        </>
    )
} 
export default Dashboard1       