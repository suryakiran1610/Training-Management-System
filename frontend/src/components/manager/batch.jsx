import { useEffect, useState } from "react";
import axios from 'axios';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcDepartment } from "react-icons/fc";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";


function Batch() {
    const [selecttab, setSelecttab] = useState(true);
    const [viewtab, setViewtab] = useState(false);
    const [deptss, setDeptss] = useState([]);
    const [filteredusers, setFilteredusers] = useState([]);
    const [trainer, setTrainer] = useState("");
    const [trainees, setTrainees] = useState([]);
    const [batchname, setBatchname] = useState("");
    const [department, setDepartment] = useState("");
    const [filteredusers1, setFilteredusers1] = useState([]);
    const [allregusers, setAllregusers] = useState([]);
    const [viewdepartment, setViewdepartment] = useState("");
    const [viewdeptss, setViewdeptss] = useState([]);
    const [toggleselectview, setToggleselectview] = useState(false);
    const [filteredbatch, setFilteredbatch] = useState([]);
    const [viewfilteredusers1, setViewfilteredusers1] = useState([]);
    const [loading, setLoading] = useState(false);
    const [toggleeditbatch,setToggleeditbatch]=useState(false)
    const [filteredbatch1, setFilteredbatch1] = useState([]);
    const [filteredbatch2, setFilteredbatch2] = useState([]);
    const [filteredbatch3, setFilteredbatch3] = useState([]);
    const [allbatchesnames,setAllbatchesnames]=useState([])
    const [trainees1, setTrainees1] = useState([]);
    const [isTrainerAvailable, setIsTrainerAvailable] = useState(true);
    const [isTraineeAvailable, setIsTraineeAvailable] = useState(true);
    const [nameExists,setNameExists]=useState(false)



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


    const Addbatch = () => {
        setSelecttab(true);
        setViewtab(false);
        setToggleselectview(false);
        axios.get('http://127.0.0.1:8000/myapp/departments/')
            .then(response => {
                setDeptss(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log("error", error);
            });


        axios.get('http://127.0.0.1:8000/myapp/getallbatches/')
            .then(response => {
                console.log("all",response.data)
                setAllbatchesnames(response.data)
            })
            .catch(error => {
                console.log("error", error);
            });
            
            
    };

    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/myapp/departments/')
            .then(response => {
                setDeptss(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log("error", error);
            });
    },[])

    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/myapp/getallbatches/')
            .then(response => {
                console.log("all",response.data)
                setAllbatchesnames(response.data)
            })
            .catch(error => {
                console.log("error", error);
            });
    },[])

    useEffect(() => {
        if (department && department !== "select") {
            const type = { depts: department };

            axios.get('http://127.0.0.1:8000/myapp/filteredBatches/', { params: type })
                .then(response => {
                    const mergedBatches = mergeBatches3(response.data);
                    setFilteredbatch3(mergedBatches);
                    console.log("newmerged",mergedBatches);
                })
                .catch(error => {
                    console.log("error", error);
                });
        }
    }, [department]);

    const mergeBatches3 = (batches) => {
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

    
useEffect(() => {
    if (trainer && trainer !== "Select User") {
        console.log("Selected trainer:", trainer);
        console.log("Filtered batches:", filteredbatch3);

        const trainerIdAsNumber = Number(trainer);

        const isTrainerInMergedBatch = filteredbatch3.some(batch => {
            const matches = batch.trainerid === trainerIdAsNumber && filteredbatch3.length === 3;
            return matches;
        });

        console.log("isTrainerInMergedBatch:", isTrainerInMergedBatch);

        setIsTrainerAvailable(!isTrainerInMergedBatch);

        if (isTrainerInMergedBatch) {
            toast.error("Trainer is not available", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }
    }
}, [trainer, filteredbatch3]);



    useEffect(() => {
        setNameExists(allbatchesnames.some(batch => batch.batchname === batchname));
    }, [batchname, allbatchesnames]);

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

        if (!department || !trainer || !batchname || !trainees ) {
            toast.error("All fields are required", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }

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
                setSelecttab(false);
                setViewtab(true);
                setToggleselectview(true);
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
                    const notificationFormData = new FormData();
                    notificationFormData.append('id',trainees);
                    notificationFormData.append('dept',department);
                    notificationFormData.append('trainerid',trainer);
                    notificationFormData.append('type', "newbatch");
                    notificationFormData.append('message', "New Batch Assigned");

        
                    axios.post('http://127.0.0.1:8000/myapp/notificationpost1/', notificationFormData)
                        .then(notificationResponse => {
                            console.log(notificationResponse.data);
                        })
                        .catch(error=>{
                            console.log("notification error")
                        })    

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
        setViewtab(true);
        setToggleselectview(true);
        setSelecttab(false);

        axios.get('http://127.0.0.1:8000/myapp/departments/')
            .then(response => {
                setViewdeptss(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log("error", error);
            });
    };

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
        if (viewdepartment && viewdepartment !== "select") {
            const type = { depts: viewdepartment };

            axios.get('http://127.0.0.1:8000/myapp/filteredBatches/', { params: type })
                .then(response => {
                    const mergedBatches = mergeBatches(response.data);
                    setFilteredbatch(mergedBatches);
                    console.log(mergedBatches);
                })
                .catch(error => {
                    console.log("error", error);
                });
        }
    }, [viewdepartment]);

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


    const deletebatch=(Name)=>{
        const type = { depts: Name };
        

        axios.delete("http://127.0.0.1:8000/myapp/batchdelete/",{ params: type })
          .then((response) => {
            setFilteredbatch(filteredbatch.filter((batch) => batch.batchname !== Name));
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
    const editbatch=(Name,Batchname)=>{
        setToggleeditbatch(true)

        const type1 = { batchname: Batchname };

            axios.get('http://127.0.0.1:8000/myapp/filteredBatches1/', { params: type1 })
                .then(response => {
                    setFilteredbatch2(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.log("error", error);
                });


        const type = { usertype: "Trainee", depts: Name };
        axios.get('http://127.0.0.1:8000/myapp/allUsersProfilefilter/', { params: type })
            .then(response => {
                setFilteredbatch1(response.data);
                console.log("dept",response.data);
            })
            .catch(error => {
                console.log("error", error);
            });
    }
    const handleTraineeseditChange = (selectedOptions) => {
        const duplicateTrainees = selectedOptions.filter(option =>
            filteredbatch2.some(batch => batch.traineeid.includes(option.value))
        );
        setTrainees1(selectedOptions.map(option => option.value));

        setIsTraineeAvailable(duplicateTrainees.length === 0);   


    
        if (duplicateTrainees.length > 0) {
            toast.warning("trainees already in batch", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            console.log("Error: Duplicate trainees found in batch");
           return;
        }
    
    };
    const submiteditedbatch = (e) => {
        e.preventDefault();
    
        const { dept, trainer, trainerid, batchname } = filteredbatch2[0];
    
        const formData = new FormData();
        formData.append('department', dept);
        formData.append('trainer', trainer);
        formData.append('trainerid', trainerid);
        formData.append('batchname', batchname);
        formData.append('traineeid', trainees1);
    
        console.log("FormData:", formData);
    
        axios.post('http://127.0.0.1:8000/myapp/addBatch/', formData)
            .then(response => {
                console.log(response.data);
    
                setFilteredbatch(filteredbatch.map(batch => {
                    if (batch.batchname === batchname) {
                        return {
                            ...batch,
                            traineeid: [...batch.traineeid, ...trainees1]
                        };
                    }
                    return batch;
                }));
    
                setToggleeditbatch(false);
                toast.success("Batch Edited", {
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
                toast.error("Error Editing Batch", {
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

    const formatTime = (timeString) => {
        if (timeString) {
            const [hours, minutes] = timeString.split(':');
            return `${hours}:${minutes}`;
        }
        return timeString;
    };
    
    
    

    
    return (
        <>
            <div className="md:h-full h-screen w-4/6 md:w-full bg-gradient-to-r from-blue-50 to-blue-100">
                <div className="md:flex-row flex flex-col w-full">
                    <div className="flex justify-start mt-2 ">
                        <p className="cursor-pointer md:ml-1 hover:text-blue-500" onClick={Addbatch}>Add / </p>
                        <p className="cursor-pointer md:ml-1 hover:text-blue-500" onClick={Viewbatch}>View</p>
                    </div>
                    {toggleselectview && (
                        <div className="mb-4 flex md:ml-4 ml-1 items-center mt-1.5">
                            <label htmlFor="title" className="text-lx font-serif">Department:</label>
                            <select onChange={(e) => { setViewdepartment(e.target.value) }}
                                className="ml-2 outline-none py-1 px-5 text-md border-2 rounded-md">
                                <option>select</option>
                                {viewdeptss.map((department, index) => (
                                    <option key={index}>{department.dept}</option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
                {selecttab && (
                    <form>
                        <div className="bg-indigo-50 min-h-screen md:px-20 pt-6">
                            <div className="bg-white rounded-md px-6 py-10 max-w-3xl mx-auto">
                                <h1 className="text-center text-2xl font-bold text-gray-500 mb-10">ADD Batch</h1>
                                <div className="space-y-4 flex-col justify-center items-center">
                                    <div className="md:flex-row flex flex-col justify-evenly">
                                        <div className="mb-4">
                                            <label htmlFor="title" className="text-lx font-serif">Dept:</label>
                                            <select onChange={(e) => { setDepartment(e.target.value) }}
                                               required className="ml-2 outline-none py-1 px-5 text-md border-2 rounded-md">
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
                                                required className="ml-2 outline-none py-1 px-2 md:px-4 text-md border-2 rounded-md"
                                            >
                                                <option>Select User</option>
                                                {filteredusers.map((user, index) => (
                                                    <option key={index} value={user.id}>{user.first_name + " " + user.last_name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="">
                                            <div className=" flex justify-center items-center ">
                                                <label htmlFor="email" className="text-lx font-serif">Name:</label>
                                                <input onChange={(e) => setBatchname(e.target.value)} type="text" required placeholder="name" id="email" className="ml-2 outline-none py-1 w-36 px-1 text-md border-2 rounded-md" />
                                                {nameExists ? (
                                                    <div className="w-4 m-0">
                                                        <ImCross className="text-red-600 " />
                                                    </div>
                                                ) : (
                                                    <div className="w-4 m-0">
                                                        <TiTick className="text-green-600 text-2xl" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-evenly">
                                        <div className="mb-3 flex items-center">
                                            <label htmlFor="title" className="text-lx font-serif">Trainee:</label>
                                            <Select
                                                required
                                                isMulti
                                                onChange={handleTraineesChange}
                                                options={filteredusers1.map(user => ({ value: user.id, label: user.first_name + " " + user.last_name }))}
                                                className="ml-2 outline-none py-1 px-2 md:px-4 text-md  rounded-md"
                                            />
                                        </div>
                                    </div>
                                    {isTrainerAvailable &&
                                        <button onClick={addbatchto} type="submit" className="px-6 py-2 mx-auto block rounded-md text-lg font-semibold text-indigo-100 bg-indigo-600">ADD</button>
                                    }
                                    {!isTrainerAvailable &&
                                        <button onClick={addbatchto} type="submit" disabled className="px-6 py-2 mx-auto block rounded-md text-lg font-semibold text-indigo-100  bg-gray-300">ADD</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </form>
                )}
                {viewtab && (
                    <div className="md:flex-row flex flex-col w-full md:justify-evenly mt-5 flex-wrap justify-center items-center">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            filteredbatch.map((batch, index) => (
                                <div key={index} className="md:w-1/4 ml-2 mr-2 w-full overflow-hidden rounded-lg bg-white shadow-md duration-300 hover:scale-105 hover:shadow-xl md:p-3 mb-9">
                                    <div className="mx-auto mt-1 h-8 w-8 text-green-400">
                                        <img className="w-full h-full rounded-full" src={`http://127.0.0.1:8000${getdeptlogo(batch.dept)}`} alt="department image" />
                                    </div>
                                    <h1 className="mt-2 text-center text-xl font-bold text-gray-500">{batch.batchname}</h1>
                                    <p className="my-2 text-center text-sm text-gray-500 ">Trainer: <span className="font-serif font-bold">{batch.trainer}</span></p>
                                    <div className="flex flex-wrap justify-center items-center">
                                        <p className="my-2 text-center text-sm text-gray-500"> Trainee:<span className="font-serif font-bold  flex flex-col">{getTraineeNames(batch.traineeid)}</span></p>
                                    </div>
                                    <div className="flex justify-evenly items-center">
                                        <p className="my-1 text-center text-sm text-gray-500">Date: {batch.date}</p>
                                        <p className="my-1 text-center text-sm text-gray-500">Time: {formatTime(batch.time)}</p>
                                    </div>
                                    <div className="space-x-4  py-4 text-center">
                                        <button onClick={()=>deletebatch(batch.batchname)} className="inline-block rounded-md bg-red-500 px-6 py-2 font-semibold text-red-100 shadow-md duration-75 hover:bg-red-400">Delete</button>
                                        <button onClick={()=>editbatch(batch.dept,batch.batchname)} className="inline-block rounded-md bg-green-500 px-8 py-2 font-semibold text-green-100 shadow-md duration-75 hover:bg-green-400">Add</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {toggleeditbatch && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50">
                        <div className="relative w-full max-w-lg p-5 mx-auto my-auto bg-white rounded-xl shadow-lg">
                            <form onSubmit={submiteditedbatch}>
                                <h1 className="text-center text-2xl font-bold text-gray-500 mb-10">Edit Batch</h1>
                                <div className="space-y-4 flex-col justify-center items-center">
                                    <div className="flex flex-col justify-evenly">
                                        <div className="mb-3 flex items-center">
                                            <label htmlFor="title" className="text-lx font-serif">Trainee:</label>
                                            <Select
                                            isMulti
                                            onChange={handleTraineeseditChange}
                                            options={filteredbatch1
                                                .map(user => ({ value: user.id, label: user.first_name + " " + user.last_name }))
                                            }
                                            className="ml-2 outline-none py-1 px-2 md:px-4 text-md  rounded-md"
                                        />
                                        </div>
                                    </div>
                                    <div className="p-3 mt-2 text-center space-x-4 md:block">
                                        <button className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100" onClick={() => setToggleeditbatch(false)}>
                                            Cancel
                                        </button>
                                        {isTraineeAvailable &&
                                        <button type="submit" className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600">
                                            Save
                                        </button>
                                        }
                                        {!isTraineeAvailable &&
                                        <button type="submit" disabled className="mb-2 md:mb-0  bg-gray-300  border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg">
                                            Save
                                        </button>
                                        }
                                    </div> 
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

export default Batch;
