import React, { useEffect, useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { IoCloudDownload } from "react-icons/io5";
import { Image } from 'antd';
import { saveAs } from 'file-saver';



function Users() {
    const [trainers, setTrainers] = useState(false);
    const [trainees, setTrainees] = useState(false);
    const [usertypedetails,setUsertypedetails]=useState(false)
    const[toggleedit,setToggleedit]=useState(false)
    const [togglecertificates,setTogglecertificates]=useState(false)
    const [trainerprofile, setTrainerprofile] = useState([]);
    const [traineeprofile, setTraineeprofile] = useState([]);
    const [userprofile,setUserprofile]= useState([])
    const [usercertificates,setUsercertificates]=useState([])


    const[username,setUsername]=useState("")
    const[email,setEmail]=useState("")
    const[phone,setPhone]=useState("")
    const[first,setfirst]=useState("")
    const[second,setsecond]=useState("")
    const[image,setImage]=useState(null)


    const trainer = () => {
        setTrainers(true);
        setTrainees(false);
        setUsertypedetails(false)
        setTogglecertificates(false)

        const type = { usertype: "Trainer" };

        axios.get('http://127.0.0.1:8000/myapp/allusersprofile/', { params: type })
            .then(response => {
                setTrainerprofile(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log("error", error);
            });
    };

    const trainee = () => {
        setTrainees(true);
        setTrainers(false);
        setUsertypedetails(false)
        setTogglecertificates(false)

        const type = { usertype: "Trainee" };

        axios.get('http://127.0.0.1:8000/myapp/allusersprofile/', { params: type })
            .then(response => {
                setTraineeprofile(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log("error", error);
            });  
    };

    const handleviewuser=(userid)=>{
        setTrainers(false);
        setTrainees(false);
        setUsertypedetails(true)
        setTogglecertificates(true)

        axios.get('http://127.0.0.1:8000/myapp/profiledetails/'+userid)
        .then(response => {
            setUserprofile(response.data);
            console.log(response.data)
        })
        .catch(error => {
            console.log("error", error);
        });

        axios.get('http://127.0.0.1:8000/myapp/certificates/',{ params: { userid1:userid } })
        .then(response => {
            setUsercertificates(response.data);
            console.log(response.data)
        })
        .catch(error => {
            console.log("error", error);
        });

    }

    const download=(image)=>{
        const img= `http://127.0.0.1:8000${image}`;
        saveAs(img,image)
    }

    const deletettrainer = (userId) => {
        axios
          .delete("http://127.0.0.1:8000/myapp/userlistdelete/" + userId)
          .then((response) => {
            setTrainerprofile(trainerprofile.filter((profile) => profile.id !== userId));
            console.log(response.data,"User deleted successfully");
            toast.success("User Deleted", {
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
          .catch((error) => {
            console.log("error", error);
            toast.error("Error", {
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
    };

    const deletettrainee = (userId) => {
        axios
          .delete("http://127.0.0.1:8000/myapp/userlistdelete/" + userId)
          .then((response) => {
            setTraineeprofile(traineeprofile.filter((profile) => profile.id !== userId));
            console.log(response.data,"User deleted successfully");
            toast.success("User Deleted", {
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
          .catch((error) => {
            console.log("error", error);
            toast.error("Error", {
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
      };
    
    

    

    const edit=()=>{
        setToggleedit(true)
        setTogglecertificates(false)
    }

    const handlesubmit=(e,userid)=>{
        e.preventDefault()

        const formData=new FormData();
        if (username !== "") formData.append('username',username);
        if (email !== "") formData.append('email',email);
        if (phone !== "") formData.append('phone',phone);
        if (first !== "") formData.append('first_name',first);
        if (second !== "") formData.append('last_name',second);
        if (image !== "") formData.append('user_image',image)

        if (formData.has('username') || formData.has('email') || formData.has('phone') || formData.has('first_name') || formData.has('last_name') || formData.has('user_image')) {
        axios.put('http://127.0.0.1:8000/myapp/profiledetails/'+userid,formData)
        .then(response => {
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
        setTogglecertificates(true)

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

    return (
        <>
            <div className="md:h-full h-screen w-3/4 md:w-full bg-gradient-to-r from-blue-50 to-blue-100">
                <div className="flex w-full">
                    <div className="flex justify-start mt-2 flex-1">
                        <p className="cursor-pointer md:ml-1 hover:text-blue-500" onClick={trainer}>Trainer / </p>
                        <p className="cursor-pointer md:ml-1 hover:text-blue-500" onClick={trainee}>Trainee</p>
                    </div>
                    <div className="mt-2 flex justify-start flex-1">
                        <p className="font-bold font text-2xl text-purple-600">USERS</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row md:justify-center h-full w-full">
                    {trainers && (
                        <section className="container mx-auto p-6 font-mono">
                            <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                                <div className="w-full overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                                                <th className="px-4 py-3">Name</th>
                                                <th className="px-4 py-3">Dept</th>
                                                <th className="px-4 py-3">Email</th>
                                                <th className="px-4 py-3">Gender</th>
                                                <th className="px-4 py-3">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white">
                                            {trainerprofile.map((profile, index) => (
                                                <tr className="text-gray-700" key={index}>
                                                    <td className="px-4 py-3 border">
                                                        <div className="flex items-center text-sm">
                                                            <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                                                                <img className="object-cover w-full h-full rounded-full" src={`http://127.0.0.1:8000${profile.user_image}`} alt="User Profile" />
                                                                <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                                                            </div>
                                                            <div>
                                                                <p className="font-semibold text-black">{profile.first_name + profile.last_name }</p>
                                                                <p className="text-xs text-gray-600">{profile.usertype}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 text-ms font-semibold border">{profile.dept}</td>
                                                    <td className="px-4 py-3 text-sm border font-semibold">{profile.email}</td>
                                                    <td className="px-4 py-3 text-sm border font-semibold">{profile.gender}</td>
                                                    <td className="px-4 py-3 text-xs border">
                                                        <div className="p-3 px-5 flex justify-start">
                                                            <button type="button" onClick={()=>handleviewuser(profile.id)} className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">View</button>
                                                            <button type="button" onClick={() => deletettrainer(profile.id)} className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>
                    )}
                    {trainees && (
                        <section className="container mx-auto p-6 font-mono">
                            <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                                <div className="w-full overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                                                <th className="px-4 py-3">Name</th>
                                                <th className="px-4 py-3">Dept</th>
                                                <th className="px-4 py-3">Email</th>
                                                <th className="px-4 py-3">Gender</th>
                                                <th className="px-4 py-3">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white">
                                            {traineeprofile.map((profile, index) => (
                                                <tr className="text-gray-700" key={index}>
                                                    <td className="px-4 py-3 border">
                                                        <div className="flex items-center text-sm">
                                                            <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                                                                <img className="object-cover w-full h-full rounded-full" src={`http://127.0.0.1:8000${profile.user_image}`} alt="User Profile" />
                                                                <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                                                            </div>
                                                            <div>
                                                                <p className="font-semibold text-black">{profile.first_name + profile.last_name }</p>
                                                                <p className="text-xs text-gray-600">{profile.usertype}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 text-ms font-semibold border">{profile.dept}</td>
                                                    <td className="px-4 py-3 text-sm border">{profile.email}</td>
                                                    <td className="px-4 py-3 text-sm border">{profile.gender}</td>
                                                    <td className="px-4 py-3 text-xs border">
                                                        <div className="p-3 px-5 flex justify-start">
                                                            <button type="button" onClick={()=>handleviewuser(profile.id)} className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">View</button>
                                                            <button type="button" onClick={() => deletettrainee(profile.id)} className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>
                    )}
                    {usertypedetails && 
                        <div className="flex flex-col md:h-full md:w-full h-screen w-full bg-gradient-to-r from-blue-50 to-blue-100 ">
            
                            <div className="flex  flex-col md:flex-row justify-center md:h-2/4 h-3/5 w-full " >
                                <div className="md:order-1 w-4/6 md:w-2/6 md:h-3/4 h-5/6 flex flex-col justify-center items-center md:mt-6 ml-9 shadow-2xl rounded-md bg-white mt-6">
                                    <div className="relative block h-32 w-32 rounded-full overflow-hidden shadow focus:outline-none">
                                        <img src={`http://127.0.0.1:8000${userprofile.user_image}`} alt="User Profile"  className="h-full w-full object-cover" />
                                    </div>
                                    <div className="mt-4 font-bold font-sans text-xl">
                                        <h1>{`${userprofile.first_name} ${userprofile.last_name}`}</h1>
                                    </div>
                                    <div className="font-sans text-base">
                                        <h1>{userprofile.dept}</h1>
                                    </div>
                                </div>
                
                                <div className="md:order-2 p-2 shadow-2xl mt-6 w-11/12 md:w-3/6 h-full flex flex-col justify-evenly items-center ml-3 rounded-xl bg-white md:font-bold md:text-base font-serif text-sm">
                                    <h1 className="font-serif font-bold text-orange-600">Profile Details</h1>
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
                                    <div className="md:flex-row flex flex-col w-full justify-evenly">
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
                                    </div>
                                </div>
                            </div>
                            {togglecertificates && (
                                <div className="flex h-1/2 md:h-2/5 md:w-3/4 w-11/12 md:mt-0 mt-8 md:mb-9 mb-0 md:ml-24">
                                    <div className="md:order-1 w-full md:w-2/5 md:h-4/5 h-4/6 flex flex-col justify-center items-center ml-3 shadow-2xl rounded-xl bg-white">
                                        <h1 className="font-serif font-bold mb-3 text-orange-600">Certificates</h1>
                                        {usercertificates.map((img, index) => (
                                            <div key={index} className="px-4 py-3 text-sm  font-semibold w-full">
                                                <div className="flex justify-evenly items-center">
                                                    <div className="relative w-8 h-8 mr-3 md:block cursor-pointer">
                                                        <Image className="object-cover w-full h-full" src={`http://127.0.0.1:8000${img.degreeimage}`} alt="User Profile" />
                                                    </div>
                                                    <div className="mb-3">
                                                        <button onClick={() => { download(img.degreeimage) }} className=" h-6 w-20 cursor-pointer rounded-md bg-indigo-500 text-white hover:bg-indigo-800">Download</button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {toggleedit &&
                                <div className="flex h-2/3 md:h-3/5 md:w-full w-11/12 mt-8  md:mb-9 mb-0" >
                                    <div className="md:order-1 w-full md:w-2/5 md:h-4/5 h-4/6 flex flex-col justify-center items-center ml-3 shadow-2xl rounded-xl bg-white">
                                        <form onSubmit={(e) => handlesubmit(e, userprofile.id)} className=" flex  flex-col justify-center items-center">
                                            <h1 className="font-serif font-bold mb-3">Edit Profile</h1>
                                            <div className="flex mb-1 w-11/12 md:justify-evenly justify-center items-center">
                                                <label className="md:mr-1 md:text-base text-sm" >First Name:</label>
                                                <input type="text" defaultValue={userprofile.first_name} onChange={(e)=>setfirst(e.target.value)} className="bg-slate-200 rounded-md border-none focus:outline-none" />
                                            </div>
                                            <div className="flex mb-1 w-11/12 md:justify-evenly justify-center items-center">
                                                <label className="md:mr-1 md:text-base text-sm" >Last Name:</label>
                                                <input type="text" defaultValue={userprofile.last_name} onChange={(e)=>setsecond(e.target.value)} className="bg-slate-200 rounded-md border-none focus:outline-none" />
                                            </div>
                                            <div className="flex mb-1 w-11/12 md:justify-evenly justify-center items-center">
                                                <label className="md:mr-1 md:text-base text-sm" >Phone:</label>
                                                <input type="text" defaultValue={userprofile.phone} onChange={(e)=>setPhone(e.target.value)} className="bg-slate-200 rounded-md border-none focus:outline-none ml-7" />
                                            </div>
                                            <div className="flex mb-1 w-11/12 md:justify-evenly justify-center items-center">
                                                <label className="md:mr-1 md:text-base text-sm" >Email:</label>
                                                <input type="text" defaultValue={userprofile.email} onChange={(e)=>setEmail(e.target.value)} className="bg-slate-200 rounded-md border-none focus:outline-none ml-8"  />
                                            </div>
                                            <div className="flex mb-1 w-11/12 md:justify-evenly justify-center items-center">
                                                <label className="md:mr-1 md:text-base text-sm" >username:</label>
                                                <input type="text" defaultValue={userprofile.username} onChange={(e)=>setUsername(e.target.value)} className="bg-slate-200 rounded-md border-none focus:outline-none ml-1" />
                                            </div>
                                            
                                            <div className="flex mb-1 w-11/12 md:justify-evenly justify-center items-center">
                                                <input type="file" className="" onChange={(e)=>setImage(e.target.files[0])}/>
                                            </div>
                                            <div className=" flex mt-3">
                                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm md:px-6 px-4 md:py-2.0 py-1.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                                                <button onClick={() => { setToggleedit(false),setTogglecertificates(true) }} type="button" className="text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-300 font-medium rounded-md text-sm md:px-6 px-4 md:py-2.0 py-1.5 text-center me-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">Cancel</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            }
                        </div>
                    }
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
    );
}

export default Users;
