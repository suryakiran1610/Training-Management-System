import { useEffect, useState } from "react";
import axios from 'axios';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';


function Batch() {
    const [selecttab, setSelecttab] = useState(false);
    const [viewtab,setViewtab]=useState(false)
    const [deptss, setDeptss] = useState([]);
    const [filteredusers, setFilteredusers] = useState([]);
    const [trainer, setTrainer] = useState("");
    const [trainees, setTrainees] = useState([]);
    const [batchname, setBatchname] = useState("");
    const [department, setDepartment] = useState("");
    const [filteredusers1, setFilteredusers1] = useState([]);
    const [allregusers, setAllregusers] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/myapp/users/')
            .then(response => {
                setAllregusers(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log("error", error);
            });
    }, []);

    const Addbatch = () => {
        setSelecttab(true);
        setViewtab(false)
        axios.get('http://127.0.0.1:8000/myapp/departments/')
            .then(response => {
                setDeptss(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log("error", error);
            });
    };

    useEffect(() => {
        if (department && department !== "All") {
            const type = { usertype: "Trainer", depts: department };
            axios.get('http://127.0.0.1:8000/myapp/allUsersProfilefilter/', { params: type })
                .then(response => {
                    setFilteredusers(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.log("error", error);
                });
        } else {
            const type = { usertype: "Trainer" };
            axios.get('http://127.0.0.1:8000/myapp/allusersprofile/', { params: type })
                .then(response => {
                    setFilteredusers(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.log("error", error);
                });
        }
    }, [department]);

    useEffect(() => {
        if (department && department !== "All") {
            const type = { usertype: "Trainee", depts: department };
            axios.get('http://127.0.0.1:8000/myapp/allUsersProfilefilter/', { params: type })
                .then(response => {
                    setFilteredusers1(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.log("error", error);
                });
        } else {
            const type = { usertype: "Trainee" };
            axios.get('http://127.0.0.1:8000/myapp/allusersprofile/', { params: type })
                .then(response => {
                    setFilteredusers1(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.log("error", error);
                });
        }
    }, [department]);

    const handleTraineesChange = (selectedOptions) => {
        setTrainees(selectedOptions.map(option => option.value));
    };

    const addbatchto = (e) => {
        e.preventDefault();
    
        const selectedTrainer = allregusers.find(user => user.id.toString() === trainer.toString());
    
        console.log("selectedTrainer:", selectedTrainer);
    
        const trainerName = selectedTrainer ? `${selectedTrainer.first_name} ${selectedTrainer.last_name}` : "";
    
        console.log("trainerName:", trainerName);
    
        const formData = new FormData();
        formData.append('department', department);
        formData.append('trainer', trainerName);
        formData.append('trainerid', trainer);
        formData.append('batchname', batchname);
        formData.append('traineeid', trainees);

        axios.post('http://127.0.0.1:8000/myapp/addBatch/', formData)
            .then(response => {
                console.log(response.data);
                setSelecttab(false)
                toast.success("Batch Added", {
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
                toast.error("Error Adding Batch", {
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
    

    const Viewbatch = () => {
        setViewtab(true)
        setSelecttab(false);
        
    };

    return (
        <>
            <div className="md:h-full h-screen w-4/6 md:w-full bg-gradient-to-r from-blue-50 to-blue-100">
                <div className="flex w-full">
                    <div className="flex justify-start mt-2 flex-1">
                        <p className="cursor-pointer md:ml-1 hover:text-blue-500" onClick={Addbatch}>Add / </p>
                        <p className="cursor-pointer md:ml-1 hover:text-blue-500" onClick={Viewbatch}>View</p>
                    </div>
                    <div className="mt-2 flex justify-start flex-1">
                        <p className="font-bold font text-2xl text-purple-600">Batch</p>
                    </div>
                </div>
                {selecttab && (
                    <form>
                        <div className="bg-indigo-50 min-h-screen md:px-20 pt-6">
                            <div className="bg-white rounded-md px-6 py-10 max-w-3xl mx-auto">
                                <h1 className="text-center text-2xl font-bold text-gray-500 mb-10">ADD Batch</h1>
                                <div className="space-y-4 flex-col justify-center items-center">
                                    <div className="md:flex-row flex flex-col justify-evenly">
                                        <div className="mb-4">
                                            <label htmlFor="title" className="text-lx font-serif">Department:</label>
                                            <select onChange={(e) => { setDepartment(e.target.value) }}
                                                className="ml-2 outline-none py-1 px-5 text-md border-2 rounded-md">
                                                <option>All</option>
                                                {deptss.map((department, index) => (
                                                    <option key={index}>{department.dept}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="mb-4">
                                            <label htmlFor="name" className="text-lx font-serif">Trainer:</label>
                                            <select
                                                onChange={(e) => setTrainer(e.target.value)}
                                                className="ml-2 outline-none py-1 px-2 md:px-4 text-md border-2 rounded-md"
                                            >
                                                <option>Select User</option>
                                                {filteredusers.map((user, index) => (
                                                    <option key={index} value={user.id}>{user.first_name + " " + user.last_name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="text-lx font-serif">Name:</label>
                                            <input onChange={(e) => setBatchname(e.target.value)} type="text" placeholder="name" id="email" className="ml-2 outline-none py-1 w-36 px-1 text-md border-2 rounded-md" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-evenly">
                                        <div className="mb-3 flex items-center">
                                            <label htmlFor="title" className="text-lx font-serif">Trainee:</label>
                                            <Select
                                                isMulti
                                                onChange={handleTraineesChange}
                                                options={filteredusers1.map(user => ({ value: user.id, label: user.first_name + " " + user.last_name }))}
                                                className="ml-2 outline-none py-1 px-2 md:px-4 text-md  rounded-md"
                                            />
                                        </div>
                                    </div>
                                    <button onClick={addbatchto} type="submit" className="px-6 py-2 mx-auto block rounded-md text-lg font-semibold text-indigo-100 bg-indigo-600">ADD</button>
                                </div>
                            </div>
                        </div>
                    </form>
                )}
                {viewtab &&(
                    <div class="flex h-screen flex-col items-center justify-center space-y-6 bg-gray-100 px-4 sm:flex-row sm:space-x-6 sm:space-y-0">
                    <div class="w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-md duration-300 hover:scale-105 hover:shadow-xl">
                      <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto mt-8 h-16 w-16 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                      </svg>
                      <h1 class="mt-2 text-center text-2xl font-bold text-gray-500">Success</h1>
                      <p class="my-4 text-center text-sm text-gray-500">Woah, successfully completed 3/5 Tasks</p>
                      <div class="space-x-4 bg-gray-100 py-4 text-center">
                        <button class="inline-block rounded-md bg-red-500 px-10 py-2 font-semibold text-red-100 shadow-md duration-75 hover:bg-red-400">Cancel</button>
                        <button class="inline-block rounded-md bg-green-500 px-6 py-2 font-semibold text-green-100 shadow-md duration-75 hover:bg-green-400">Dashboard</button>
                      </div>
                    </div>
                    <div class="w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-md duration-300 hover:scale-105 hover:shadow-xl">
                      <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto mt-8 h-16 w-16 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                      </svg>
                      <h1 class="mt-2 text-center text-2xl font-bold text-gray-500">Cancel</h1>
                      <p class="my-4 text-center text-sm text-gray-500">Just a small miss, 2/5 Tasks</p>
                      <div class="space-x-4 bg-gray-100 py-4 text-center">
                        <button class="inline-block rounded-md bg-red-500 px-10 py-2 font-semibold text-red-100 shadow-md duration-75 hover:bg-red-400">Cancel</button>
                        <button class="inline-block rounded-md bg-green-500 px-6 py-2 font-semibold text-green-100 shadow-md duration-75 hover:bg-green-400">Try Again</button>
                      </div>
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

export default Batch;
