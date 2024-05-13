import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Register() {
    const [profile, setProfile] = useState(false);
    const [degree, setDegree] = useState(false);
    const [usertype, setUsertype] = useState("");
    const[users,setUsers]=useState([])

    const navigate=useNavigate()

    const[email,setEmail]=useState("")
    const[phone,setPhone]=useState("")
    const[first,setFirst]=useState("")
    const[second,setSecond]=useState("")
    const[user,setUser]=useState("")
    const[dept,setDept]=useState("")
    const[gender,setGender]=useState("")
    const[profileimg,setProfileimg]=useState(null)
    const[degreeimg,setDegreeimg]=useState([])

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/myapp/users/')
        .then(response => {
            setUsers(response.data);
            console.log(response.data)
        })
        .catch(error => {
            console.log("error", error);
        });
    }, []);


    const handleUserTypeChange = (e) => {
        const userType = e.target.value;
        setUsertype(userType);
        setUser(userType);

        if (userType === "Trainer") {
            setProfile(true);
            setDegree(false);
        } else if (userType === "Trainee") {
            setProfile(true);
            setDegree(true);
        } else {
            setProfile(false);
            setDegree(false);
        }
    };


    const handlesubmit=(e)=>{
        e.preventDefault();
   

        const formData=new FormData();
        formData.append('email',email)
        formData.append('phone',phone)
        formData.append('first',first)
        formData.append('second',second)
        formData.append('user',user)
        formData.append('dept',dept)
        formData.append('gender',gender)
        formData.append('profileimg',profileimg)
        degreeimg.forEach(file => {
            formData.append('image', file);
        });

        axios.post('http://127.0.0.1:8000/myapp/register/',formData)
        .then(response=>{
            console.log(response.data);
            toast.success('Registration Successfull', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
                });
            const timer = setTimeout(() => {
                navigate('/login')
              }, 3000);
        })
        .catch(error=>{
            console.log(error)
        })
    }




    return (
        <div className="flex  p-2 h-screen flex-col bg-gradient-to-b from-sky-400 to-sky-200">
            <h1 className="text-center text-3xl font-bold text-blue-700">TRAINING DEPARTMENT</h1>
            <div className="bg-white w-full md:w-11/12 lg:w-3/4 xl:w-2/3 mx-auto p-8 mt-16 rounded-lg ">
                <div className="text-center mb-3">
                    <h2 className="text-2xl font-bold text-red-500">REGISTER</h2>
                </div>
                <form onSubmit={handlesubmit} encType="multipart/form-data">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="mb-3">
                            <label className="block text-sm font-medium">Email</label>
                            <input type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email" required className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400" />
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm font-medium">Phone</label>
                            <input type="tel" onChange={(e)=>{setPhone(e.target.value)}} placeholder="Phone Number" required className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400" />
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm font-medium">First Name</label>
                            <input type="text" onChange={(e)=>{setFirst(e.target.value)}} placeholder="First Name" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400" />
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm font-medium">Last Name</label>
                            <input type="text" onChange={(e)=>{setSecond(e.target.value)}} placeholder="Last Name" required className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400" />
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm font-medium">Select User</label>
                            <select onChange={handleUserTypeChange}  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400">
                                <option>Select User</option>
                                <option>Trainer</option>
                                <option>Trainee</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="block text-sm font-medium">Select Department</label>
                            <select onChange={(e)=>{setDept(e.target.value)}} className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400">
                                <option>Select Department</option>
                                <option>React</option>
                                <option>Python</option>
                            </select>
                        </div>

                        {(profile || degree) && (
                            <div className="flex flex-col  md:flex-row md:space-x-4 md:w-full">
                                {profile && (
                                    <div>
                                    <label className="block text-sm font-medium">Profile Image</label>
                                    <input onChange={(e)=>{setProfileimg(e.target.files[0])}} type="file" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400" />
                                    </div>
                                )}

                                {degree && (
                                    <div>
                                    <label className="block text-sm font-medium">Degree Certificate</label>
                                    <input type="file" multiple required accept="image/*" onChange={(e)=>setDegreeimg(Array.from(e.target.files))} className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400" />
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="mb-4 col-span-2">
                            <label className="block text-sm font-medium">Gender</label>
                            <div className="flex items-center">
                                <input type="radio" name="gender" id="male" className="mr-2" value="Male" onChange={(e)=>{setGender(e.target.value)}}/>
                                <label htmlFor="male" className="mr-4">Male</label>
                                <input type="radio" name="gender" id="female" className="mr-2" value="Female" onChange={(e)=>{setGender(e.target.value)}} />
                                <label htmlFor="female">Female</label>
                            </div>
                        </div>
                        <div className="mb-4 col-span-2">
                            <button type="submit" className="w-full bg-blue-400 text-white py-2 px-4 rounded-md hover:bg-yellow-500 focus:outline-none focus:bg-yellow-500">Register</button>
                        </div>
                        <div className="mb-4 col-span-2">
                            <h3>Redirecting in 3 sec</h3>
                        </div>
                    </div>
                </form>
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
        </div>
    );
}

export default Register;
