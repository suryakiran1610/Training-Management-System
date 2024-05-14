import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";


function Login(){
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")

    const data={
        "username":email,
        "password":password
    }

    const navigate=useNavigate()


    const handlesubmit=((e)=>{
        e.preventDefault()
            axios.post('http://127.0.0.1:8000/myapp/login/',data)
                .then((response)=>{
                    if(response.data.error){
                        console.log(response.data.error)
                        toast.error(response.data.error, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                            });
                    }
                    else{
                        const token = response.data.token;
                        const decoded = jwtDecode(token);
                        if(decoded.user){
                            console.log("Manager login Successful")
                            Cookies.set("token",response.data.token)
                            navigate('/managerpage')
                        }
                        if(decoded.user=="Trainer"){
                            console.log("Trainer login Successful")
                            Cookies.set("token",response.data.token)
                            navigate('/trainerpage')
                        }
                        if(decoded.user=="Trainee"){
                            console.log("Trainee login Successful")
                            Cookies.set("token",response.data.token)
                            navigate('/traineepage')
                        } 
                    }
                })
                .catch((error)=>{
                    console.log("error")
                })
    })

    return(

        <>
        <div className="flex p-2 h-screen w-full flex-col  items-center  bg-gradient-to-b from-sky-400 to-sky-200">
            <h1 className="text-center text-3xl font-bold  ">TRAINING DEPARTMENT</h1>
            <div className=" w-11/12 md:w-11/12 lg:w-3/4 xl:w-2/3 mx-auto p-8 mt-16  flex flex-col justify-center ">
                <div className="text-center mb-3">
                    <h2 className="text-2xl font-bold  text-red-500">LOGIN</h2>
                </div>
                <form className="form" onSubmit={handlesubmit}>
                    <div className="flex flex-col justify-center w-full items-center">
                        <div className="mt-7 w-full flex justify-center">
                            <input type="text" placeholder="Username" onChange={(e)=>setEmail(e.target.value)} required className="w-2/4 mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400" />
                        </div>
                        <div className="mt-7 w-full flex justify-center">
                            <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} required className="w-2/4 mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400" />
                        </div>
                        <div className="mt-7 w-full flex justify-center">
                            <button type="submit" className="w-6/12 bg-blue-400 text-white py-2 px-4 rounded-md hover:bg-yellow-500 focus:outline-none focus:bg-yellow-500">Register</button>
                        </div>
                    </div> 
                </form> 
                <div className="flex flex-col justify-center w-full items-center mt-6">
                    <Link to="/register"><p> Don't have an account? Register </p></Link> 
                </div>
            </div>        

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

        </>
    )
}
export default Login