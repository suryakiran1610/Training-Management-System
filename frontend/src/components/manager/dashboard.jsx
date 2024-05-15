import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
import axios from 'axios';

function Dashboard(){

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
            <div className="flex flex-col md:flex-row justify-center  h-full w-full bg-gradient-to-r from-blue-50 to-blue-100">
                <div className="md:order-1 w-4/6 md:w-2/6 h-2/6 flex flex-col justify-center items-center md:mt-6 ml-9 shadow-2xl rounded-md bg-white">
                    <div className="relative block h-32 w-32 rounded-full overflow-hidden shadow focus:outline-none">
                        <img src={`http://127.0.0.1:8000${userprofile.user_image}`} alt="User Profile"  className="h-full w-full object-cover" />
                    </div>
                    <div className="mt-4 font-bold font-sans text-xl">
                        <h1>{`${userprofile.first_name} ${userprofile.last_name}`}</h1>
                    </div>
                </div>

                <div className="md:order-2 shadow-2xl mt-6 w-11/12 md:w-3/6 h-3/6 flex flex-col justify-evenly items-center ml-3 rounded-md bg-white font-bold font-mono">
                    <div className="md:flex w-full justify-evenly">
                        <div className="flex justify-center ">
                            <label>FirstName:</label>
                            <p className="ml-2">{userprofile.first_name}</p>
                        </div>
                        <div className="flex justify-center">
                            <label>LastName:</label>
                            <p className="ml-2">{userprofile.last_name}</p>
                        </div>
                    </div>
                    <div className="md:flex  w-full justify-evenly">
                        <div className="flex justify-center">
                            <label>Phone:</label>
                            <p className="ml-2">{userprofile.phone}</p>
                        </div>
                        <div className="flex justify-center">
                            <label>Email:</label>
                            <p className="ml-2">{userprofile.email}</p>
                        </div>
                    </div>
                    <div className="md:flex flex w-full justify-evenly">
                        <div className="flex justify-center">
                            <label>Gender:</label>
                            <p className="ml-2">{userprofile.gender}</p>
                        </div>
                        <div className="flex justify-center">
                            <label>Username:</label>
                            <p className="ml-2">{userprofile.username}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
