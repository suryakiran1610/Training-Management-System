import { useEffect, useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { FcDepartment } from "react-icons/fc";
import { FaRegMessage } from "react-icons/fa6";
import Select from 'react-select';
import 'react-toastify/dist/ReactToastify.css';



function Departments() {
    const [toggleView, setToggleView] = useState(false);
    const [toggleAdd, setToggleAdd] = useState(false);
    const [togglemessage,setTogglemessage]=useState(false)
    const [departments, setDepartments] = useState([]);
    const [trainers, setTrainers] = useState([]);
    const [trainees, setTrainees] = useState([]);
    const [toggleEdit,setToggleEdit]=useState(false)
    const [image,setImage]=useState(null)
    const [deptname,setDeptname]=useState("")
    const [image1,setImage1]=useState(null)
    const [deptname1,setDeptname1]=useState("")
    const [editDeptId, setEditDeptId] = useState(null);
    const [filteredtrainee,setFilteredtrainee]=useState([])
    const [filteredtrainer,setFilteredtrainer]=useState([])
    const [trainees1, setTrainees1] = useState([]);
    const [trainers1,setTrainers1]=useState([]);
    const [messages,setMessages]=useState("")


    const View = () => {
        setToggleView(true);
        setToggleAdd(false);

        axios.get('http://127.0.0.1:8000/myapp/departments/')
            .then(response => {
                setDepartments(response.data);
                console.log("dept",response.data)
            })
            .catch(error => {
                console.log("error", error);
            });

        axios.get('http://127.0.0.1:8000/myapp/allUsersfilter/', { params: { usertype: "Trainer" } })
            .then(response => {
                setTrainers(response.data);
                console.log("trainer",response.data)

            })
            .catch(error => {
                console.log("error", error);
            });

        axios.get('http://127.0.0.1:8000/myapp/allUsersfilter/', { params: { usertype: "Trainee" } })
            .then(response => {
                setTrainees(response.data);
                console.log("trainee",response.data)

            })
            .catch(error => {
                console.log("error", error);
            });
    };

    const countUsersInDept = (department, users) => {
        return users.filter(user => user.dept === department).length;
    };

    const deletedept=(Id)=>{

        axios.delete("http://127.0.0.1:8000/myapp/deptlistdelete/"+Id)
          .then((response) => {
            setDepartments(departments.filter((dept) => dept.id !== Id));
            console.log(response.data,"Dept deleted successfully");
            toast.success("Dept Deleted", {
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

    }


    const Add = () => {
        setToggleAdd(true);
        setToggleView(true);
        setToggleEdit(false)
        setTogglemessage(false)
    };

    const handleadddept=(e)=>{
        e.preventDefault()

        const formData=new FormData();
        formData.append('departname',deptname);
        formData.append('dept_image',image);

        axios.post('http://127.0.0.1:8000/myapp/adddept/',formData)
            .then(response => {
                console.log(response.data)
                setDepartments([...departments, response.data]);
                setToggleAdd(false)
                toast.success("Department Added", {
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
                toast.error("Error Adding Department", {
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
    }

    const editdept = (department) => {
        setToggleEdit(true);
        setToggleAdd(false);
        setToggleView(true);
        setEditDeptId(department.id);
        setDeptname1(department.dept);
        setTogglemessage(false)
    };
    

        const handleupdatedept=(e)=>{
            e.preventDefault();

            const formData=new FormData();
            formData.append('dept',deptname1);
            formData.append('dept_image',image1);

        axios.put('http://127.0.0.1:8000/myapp/deptedit/'+editDeptId,formData)
            .then(response => {
                console.log(response.data)
                setDepartments(departments.map(dept => dept.id === editDeptId ? response.data : dept));
                setToggleEdit(false)
                toast.success("Department Edited", {
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
                toast.error("Error Editing Department", {
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
        }

        const message=(deptname)=>{
        setTogglemessage(true)
        setToggleAdd(false);
        setToggleView(true);
        setToggleEdit(false)

        const type = { usertype: "Trainee", depts: deptname };
        axios.get('http://127.0.0.1:8000/myapp/allUsersProfilefilter/', { params: type })
            .then(response => {
                setFilteredtrainee(response.data);
                console.log("trainee",response.data);
            })
            .catch(error => {
                console.log("error", error);
            });


        const type1 = { usertype: "Trainer", depts: deptname };
        axios.get('http://127.0.0.1:8000/myapp/allUsersProfilefilter/', { params: type1 })
            .then(response => {
                setFilteredtrainer(response.data);
                console.log("trainer",response.data);
            })
            .catch(error => {
                console.log("error", error);
            });
        }
        const handleTraineesChange = (selectedOptions) => {
            setTrainees1(selectedOptions.map(option => option.value));
        };
        const handleTrainersChange = (selectedOptions) => {
            setTrainers1(selectedOptions.map(option => option.value));
        };

        const submitmessage=(e)=>{
            e.preventDefault()

                const notificationFormData = new FormData();
                    notificationFormData.append('id',trainees1);
                    notificationFormData.append('trainerid',trainers1);
                    notificationFormData.append('type', "message");
                    notificationFormData.append('message', messages);

        
                    axios.post('http://127.0.0.1:8000/myapp/notificationpost5/', notificationFormData)
                        .then(notificationResponse => {
                            console.log(notificationResponse.data);
                            setTogglemessage(false)
                            toast.success("Message Send", {
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
                        .catch(error=>{
                            console.log("notification error")
                        })    
        }

    return (
        <>
            <div className="md:h-full h-screen w-3/4 md:w-full bg-gradient-to-r from-blue-50 to-blue-100">
                <div className="flex w-full">
                    <div className="flex justify-start mt-2 flex-1">
                        <p className="cursor-pointer md:ml-1 hover:text-blue-500" onClick={View}>View / </p>
                        <p className="cursor-pointer md:ml-1 hover:text-blue-500" onClick={Add}>Add</p>
                    </div>
                    <div className="mt-2 flex justify-start flex-1">
                        <p className="font-bold font text-2xl text-purple-600">Departments</p>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row md:justify-center h-full w-full">
                    {toggleView && (
                        <section className="container mx-auto p-6 font-mono">
                            <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                                <div className="w-full overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                                                <th className="px-4 py-3">DeptName</th>
                                                <th className="px-4 py-3">Trainers</th>
                                                <th className="px-4 py-3">Trainees</th>
                                                <th className="px-4 py-3">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white">
                                            {departments.map((department, index) => (
                                                <tr className="text-gray-700" key={index}>
                                                    <td className="px-4 py-3 border">
                                                        <div className="flex items-center text-sm">
                                                            <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                                                                <img className="object-cover w-full h-full rounded-full" src={`http://127.0.0.1:8000${department.dept_image}`} alt="Department" />
                                                                <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                                                            </div>
                                                            <div>
                                                                <p className="font-semibold text-black">{department.dept}</p>
                                                                <p className="text-xs text-gray-600">Department</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 text-ms font-semibold border">{countUsersInDept(department.dept, trainers)}</td>
                                                    <td className="px-4 py-3 text-sm font-semibold border">{countUsersInDept(department.dept, trainees)}</td>
                                                    <td className="px-2 py-3 text-xs border">
                                                        <div className="p-3 px-3 flex justify-start">
                                                            <button onClick={()=>editdept(department)} type="button" className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Edit</button>
                                                            <button onClick={()=>deletedept(department.id)} type="button" className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button>
                                                            <button onClick={()=>message(department.dept)} type="button" className="text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline ml-3">Message</button>
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
                </div>

                {toggleAdd && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50">
                        <div className="relative w-full max-w-lg p-5 mx-auto my-auto bg-white rounded-xl shadow-lg">
                        <form onSubmit={handleadddept} encType="multipart/form-data">
                            <div className="text-center p-5 flex-auto justify-center">

                                <svg className="w-16 h-16 flex items-center text-red-500 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                                    <FcDepartment />
                                </svg>
                                <h2 className="text-xl font-bold py-4">Add Department</h2>
                                    <input type="text" onChange={(e)=>setDeptname(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></input>
                                    <input type="file" onChange={(e)=>setImage(e.target.files[0])} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></input>
                            </div>
                            <div className="p-3 mt-2 text-center space-x-4 md:block">
                                <button className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100" onClick={() => setToggleAdd(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600">
                                    Save
                                </button>
                            </div>
                            </form>
                        </div>
                    </div>
                )}

                {toggleEdit && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50">
                        <div className="relative w-full max-w-lg p-5 mx-auto my-auto bg-white rounded-xl shadow-lg">
                            <form onSubmit={handleupdatedept} encType="multipart/form-data">
                                <div className="text-center p-5 flex-auto justify-center">

                                    <svg className="w-16 h-16 flex items-center text-red-500 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                                        <FcDepartment />
                                    </svg>
                                    <h2 className="text-xl font-bold py-4">Edit Department</h2>
                                    <input type="text" defaultValue={deptname1} onChange={(e)=>setDeptname1(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></input>
                                    <input type="file" onChange={(e)=>setImage1(e.target.files[0])} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></input>
                                </div>
                                <div className="p-3 mt-2 text-center space-x-4 md:block">
                                    <button className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100" onClick={() => setToggleEdit(false)}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600">
                                        Save
                                    </button>
                                </div>
                            </form>    
                        </div>
                    </div>
                )}
                {togglemessage && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50">
                        <div className="relative w-full max-w-lg p-5 mx-auto my-auto bg-white rounded-xl shadow-lg">
                            <form onSubmit={submitmessage} encType="multipart/form-data">
                                <div className="text-center p-5 flex-auto justify-center">

                                    <svg className="w-16 h-16 flex items-center text-blue-500 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                                        <FaRegMessage />
                                    </svg>
                                    <h2 className="text-xl font-bold py-4">Message Department</h2>
                                        <div className="flex flex-col justify-evenly">
                                            <div className="mb-3 flex items-center">
                                                <label htmlFor="title" className="text-lx font-serif">Trainer:</label>
                                                    <Select
                                                        isMulti
                                                        onChange={handleTrainersChange}
                                                        options={filteredtrainer.map(user => ({ value: user.id, label: user.first_name + " " + user.last_name }))}
                                                        className="ml-2 outline-none py-1 px-2 md:px-4 text-md  rounded-md"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-evenly">
                                            <div className="mb-3 flex items-center">
                                                <label htmlFor="title" className="text-lx font-serif">Trainee:</label>
                                                    <Select
                                                        isMulti
                                                        onChange={handleTraineesChange}
                                                        options={filteredtrainee.map(user => ({ value: user.id, label: user.first_name + " " + user.last_name }))}
                                                        className="ml-2 outline-none py-1 px-2 md:px-4 text-md  rounded-md"
                                                />
                                            </div>
                                        </div>
                                    <input type="text" onChange={(e)=>{setMessages(e.target.value)}} placeholder="Enter Message" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></input>
                                </div>
                                <div className="p-3 mt-2 text-center space-x-4 md:block">
                                    <button className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100" onClick={() => setTogglemessage(false)}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600">
                                        Send
                                    </button>
                                </div>
                            </form>    
                        </div>
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
        </>
    );
}

export default Departments;
