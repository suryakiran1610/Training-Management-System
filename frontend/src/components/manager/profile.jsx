import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";

function Profile(props){

    const[userprofile,setUserprofile]=useState([])
    const[toggleedit,setToggleedit]=useState(false)
    const[togglepassword,setTogglepassword]=useState(false)
    const[togglepasscriteria,setTogglecriteria]=useState(false)

    const[username,setUsername]=useState("")
    const[email,setEmail]=useState("")
    const[phone,setPhone]=useState("")
    const[first,setfirst]=useState("")
    const[second,setsecond]=useState("")
    const[image,setImage]=useState(null)

    const [enteredOldPassword, setEnteredOldPassword] = useState("");
    const[newpassword,setNewPassword]=useState("")
    const[minLengthMet, setMinLengthMet] = useState(false);
    const[specialCharMet, setSpecialCharMet] = useState(false);
    const[numberMet, setNumberMet] = useState(false);


    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#ffffff");

    const [verificationStatus, setVerificationStatus] = useState("");






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

    const handleNewPasswordChange = (e) => {
        const newPasswordValue = e.target.value;
        setNewPassword(newPasswordValue);

        if (newPasswordValue.length >= 8) {
            setMinLengthMet(true);
        } else {
            setMinLengthMet(false);
        }

        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (specialCharRegex.test(newPasswordValue)) {
            setSpecialCharMet(true);
        } else {
            setSpecialCharMet(false);
        }

        const numberRegex = /[0-9]/;
        if (numberRegex.test(newPasswordValue)) {
            setNumberMet(true);
        } else {
            setNumberMet(false);
        }
    };


    const edit=()=>{
        setToggleedit(true)
        setTogglepassword(false)
    }
    const editpassword=()=>{
        setTogglepassword(true)
        setToggleedit(false)
    }
    const passcriteria=()=>{
        setTogglecriteria(true)
    }

    const handlesubmit=(e)=>{
        e.preventDefault()
        const token=Cookies.get('token')
        const decoded=jwtDecode(token)

        const formData=new FormData();
        if (username !== "") formData.append('username',username);
        if (email !== "") formData.append('email',email);
        if (phone !== "") formData.append('phone',phone);
        if (first !== "") formData.append('first_name',first);
        if (second !== "") formData.append('last_name',second);
        if (image !== "") formData.append('user_image',image)

        if (formData.has('username') || formData.has('email') || formData.has('phone') || formData.has('first_name') || formData.has('last_name') || formData.has('user_image')) {
        axios.put('http://127.0.0.1:8000/myapp/profiledetails/'+decoded.user_id,formData)
        .then(response => {
            props.updateUserProfile(response.data);
            props.updateUserProfileImage(response.data.user_image);
            props.fetchUserProfile();
            console.log(response.data)
            setUserprofile(response.data)

        toast.success('Profile Updated Successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        setToggleedit(false)

        })
        .catch(error => {
            console.log("error", error);
            toast.error('Error', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        });
    }
    }

    const verifypass=(e)=>{
        e.preventDefault()
        setLoading(true)
        const token=Cookies.get('token')
        const decoded=jwtDecode(token)
        const data={
            "oldpass":enteredOldPassword,
            "userid":decoded.user_id
        };
        console.log(data)
        const timer = setTimeout(() => {
            axios.post('http://127.0.0.1:8000/myapp/verifypassword/',data)
            .then(response => {
                console.log(response.data)
                setVerificationStatus(<TiTick className="text-green-600 text-2xl" />);
                setLoading(false)
            })
            .catch(error => {
                console.log("error", error);
                setVerificationStatus(<ImCross className="text-red-600 " />);
                setLoading(false);
            });
        }, 2000);


    }


    const handlepasswordsubmit=(e)=>{
        e.preventDefault()
            const token=Cookies.get('token')
            const decoded=jwtDecode(token)
            const data={
                "newpass":newpassword,
                "userid":decoded.user_id
            };
            console.log(data)
                axios.put('http://127.0.0.1:8000/myapp/verifypassword/',data)
                .then(response => {
                    console.log(response.data)
                    toast.success('Password Updated Successfully', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    setTogglepassword(false);
                })
                .catch(error => {
                    console.log("error", error);
                    toast.error('Error updating password', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                });
    }


    return(
        <>
        <div className="flex flex-col md:h-full md:w-full h-screen w-full bg-gradient-to-r from-blue-50 to-blue-100 ">
            
            <div className="flex flex-col md:flex-row justify-center h-2/4 w-full " >
                <div className="md:order-1 w-4/6 md:w-2/6 md:h-3/4 h-4/5 flex flex-col justify-center items-center md:mt-6 ml-9 shadow-2xl rounded-md bg-white mt-6">
                    <div className="relative block h-32 w-32 rounded-full overflow-hidden shadow focus:outline-none">
                        <img src={`http://127.0.0.1:8000${userprofile.user_image}`} alt="User Profile"  className="h-full w-full object-cover" />
                    </div>
                    <div className="mt-4 font-bold font-sans text-xl">
                        <h1>{`${userprofile.first_name} ${userprofile.last_name}`}</h1>
                    </div>
                </div>

                <div className="md:order-2 shadow-2xl mt-6 w-11/12 md:w-3/6 h-full flex flex-col justify-evenly items-center ml-3 rounded-xl bg-white font-bold font-serif">
                    <h1 className="font-serif font-bold ">Profile Details</h1>
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
                    <div>
                        <button onClick={edit} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm md:px-6 px-4 md:py-2.0 py-1.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit Profile</button>
                        <button  onClick={editpassword}type="button" className="text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-300 font-medium rounded-md text-sm md:px-6 px-4 md:py-2.0 py-1.5 text-center me-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">Chanage Password</button>
                    </div>
                </div>
            </div>
            {toggleedit &&
                <div className="flex  h-2/3 w-full mt-8" >
                    <div className="md:order-1 w-11/12 md:w-2/5 md:h-4/5 h-4/6 flex flex-col justify-center items-center ml-3 shadow-2xl rounded-xl bg-white">
                        <form onSubmit={handlesubmit} className=" flex  flex-col justify-center items-center">
                            <h1 className="font-serif font-bold mb-3">Edit Profile</h1>
                            <div className="flex mb-1 w-11/12 justify-evenly">
                                <label className="mr-1" >First Name:</label>
                                <input type="text" defaultValue={userprofile.first_name} onChange={(e)=>setfirst(e.target.value)} className="bg-slate-200 rounded-md border-none focus:outline-none" />
                            </div>
                            <div className="flex mb-1 w-11/12 justify-evenly">
                                <label className="mr-1" >Last Name:</label>
                                <input type="text" defaultValue={userprofile.last_name} onChange={(e)=>setsecond(e.target.value)} className="bg-slate-200 rounded-md border-none focus:outline-none" />
                            </div>
                            <div className="flex mb-1 w-11/12 justify-evenly">
                                <label className="mr-1" >Phone:</label>
                                <input type="text" defaultValue={userprofile.phone} onChange={(e)=>setPhone(e.target.value)} className="bg-slate-200 rounded-md border-none focus:outline-none ml-7" />
                            </div>
                            <div className="flex mb-1 w-11/12 justify-evenly">
                                <label className="mr-1" >Email:</label>
                                <input type="text" defaultValue={userprofile.email} onChange={(e)=>setEmail(e.target.value)} className="bg-slate-200 rounded-md border-none focus:outline-none ml-8"  />
                            </div>
                            <div className="flex mb-1 w-11/12 justify-evenly">
                                <label className="mr-1" >username:</label>
                                <input type="text" defaultValue={userprofile.username} onChange={(e)=>setUsername(e.target.value)} className="bg-slate-200 rounded-md border-none focus:outline-none ml-1" />
                            </div>
                            
                            <div className="flex ml-3">
                                <input type="file"  onChange={(e)=>setImage(e.target.files[0])}/>
                            </div>
                            <div className=" flex mt-3">
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm md:px-6 px-4 md:py-2.0 py-1.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                                <button onClick={() => { setToggleedit(false) }} type="button" className="text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-300 font-medium rounded-md text-sm md:px-6 px-4 md:py-2.0 py-1.5 text-center me-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            }
            {togglepassword &&
                <div className="flex  h-2/3 w-full mt-8 " >
                <div className="md:order-1 w-11/12 md:w-2/5 md:h-4/5 h-4/6 flex flex-col justify-center items-center ml-3 shadow-2xl rounded-xl bg-white">
                        <h1 className="font-serif font-bold mb-6">Edit Password</h1>
                        <div className="flex justify-center mb-4 w-11/12 items-center">
                            <label className="mr-1" >Old Password:</label>
                            <input type="password"  value={enteredOldPassword}  onChange={(e) => setEnteredOldPassword(e.target.value)} className="bg-slate-200 rounded-md border-none focus:outline-none md:w-auto w-5/12" />
                            <p  onClick={verifypass} className="text-xs cursor-pointer hover:text-sky-500 ml-2"> 
                            {loading ? ( <ClipLoader color="#36d7b7" size={20} className="ml-2"/>):
                            (verificationStatus ? verificationStatus : 'Verify')}</p>
                        </div>
                        <form onSubmit={handlepasswordsubmit} className=" flex w-full flex-col justify-center items-center">
                        <div className="flex mb-1 justify-center w-11/12">
                            <label className="mr-1" >New Password:</label>
                            <input type="password" onClick={passcriteria} onChange={handleNewPasswordChange}  className="bg-slate-200 rounded-md border-none focus:outline-none md:w-auto w-5/12 mr-7" />
                        </div>
                        {togglepasscriteria &&
                            <div className="w-11/12 mt-3 ml-6">
                                <ol className="list-disc md:flex md:justify-evenly md:mt-6">
                                    <div className="flex">
                                    <li>Length</li>
                                    {minLengthMet ? (<TiTick className="text-green-600 text-2xl" />) : (<ClipLoader color="#36d7b7" size={20} className="ml-2" />)}
                                    </div>
                                    <div className="flex">
                                    <li>Special char</li>
                                    {specialCharMet ? (<TiTick className="text-green-600 text-2xl" />) : (<ClipLoader color="#36d7b7" size={20} className="ml-2" />)}
                                    </div>
                                    <div className="flex">
                                    <li>Numbers</li>
                                    {numberMet ? (<TiTick className="text-green-600 text-2xl" />) : (<ClipLoader color="#36d7b7" size={20} className="ml-2" />)}
                                    </div>
                                </ol>
                            </div>
                        }


                        <div className=" flex mt-6">
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm md:px-6 px-4 md:py-2.0 py-1.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                            <button onClick={() => { setTogglepassword(false) }} type="button" className="text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-300 font-medium rounded-md text-sm md:px-6 px-4 md:py-2.0 py-1.5 text-center me-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">Cancel</button>
                        </div>
                    </form>
                </div>
                </div>    
            
            }

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
            <div>
            </div>
        </>
    );
}

export default Profile;
