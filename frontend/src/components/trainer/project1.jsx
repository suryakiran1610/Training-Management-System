import { useEffect, useState } from "react";
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaDownload } from "react-icons/fa";
import { IoCloudDownload } from "react-icons/io5";
import { Image } from 'antd';
import { saveAs } from 'file-saver';


function Project1(){
    const [toggleaddproject,setToggleaddproject]=useState(false)
    const [toggleviewproject,setToggleviewproject]=useState(false)
    const [batchh, setBatchh] = useState("");
    const [projectname,setProjectname]=useState("")
    const [start,setStart]=useState("")
    const [end,setEnd]=useState("")
    const [batch,setBatch]=useState([])
    const [traineeprofile, setTraineeprofile] = useState([]);
    const [filteredTrainees, setFilteredTrainees] = useState([]);
    const [togglebatchselect,setTogglebatchselect]=useState(false)
    const [projects,setProjects]=useState([])
    const [filteredProjects, setFilteredProjects] = useState([]);




    const submitporoject=(e)=>{
        e.preventDefault()
        const token=Cookies.get('token')
        const decoded=jwtDecode(token)

        const formData = new FormData();
        formData.append('projectname',projectname);
        formData.append('batchname', batchh);
        formData.append('trainerid', decoded.user_id);
        formData.append('trainername', decoded.userfullname);
        formData.append('department', decoded.department);
        formData.append('start', start);
        formData.append('end', end);
        formData.append('status', "Assigned");

        filteredTrainees.forEach(trainee => {
            formData.append('traineeid', trainee.id);
            formData.append('traineename', trainee.first_name + " " + trainee.last_name);
        });


        axios.post('http://127.0.0.1:8000/myapp/addproject/', formData)
            .then(response => {
                console.log(response.data);
                toast.success("Project Added", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setToggleaddproject(false)
                fetchProjects();

                const notificationFormData = new FormData();
                    notificationFormData.append('dept',decoded.department);
                    notificationFormData.append('type', "newproject");
                    notificationFormData.append('message', "New Project Assigned");

                    const traineeIds = filteredTrainees.map(trainee => trainee.id);
                    traineeIds.forEach(id => {
                    notificationFormData.append('traineeid',id);
                    }) 

        
                    axios.post('http://127.0.0.1:8000/myapp/notificationpost2/', notificationFormData)
                        .then(notificationResponse => {
                            console.log(notificationResponse.data);
                        })
                        .catch(error=>{
                            console.log("notification error")
                        })    

            })    
            .catch(error=>{
                console.log(error)
            })    
    }

    const Addproject=()=>{
        setToggleaddproject(true)
        setToggleviewproject(false)
        setTogglebatchselect(false)

    }
    const Viewproject=()=>{
        setToggleaddproject(false)
        setToggleviewproject(true)
        setTogglebatchselect(true)

    }

    useEffect(() => {
        const token=Cookies.get('token')
        const decoded=jwtDecode(token)

        axios.get('http://127.0.0.1:8000/myapp/trainerBatchfilter/'+decoded.user_id)
            .then(response => {
                const mergedBatches = mergeBatches(response.data);
                setBatch(mergedBatches);
                console.log("newmerged",mergedBatches);
            })
            .catch(error => {
                console.log("error", error);
            });      
    },[])


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

    useEffect(() => {
        const token=Cookies.get('token')
        const decoded=jwtDecode(token)
        const type = { trainerid: decoded.user_id };

        axios.get('http://127.0.0.1:8000/myapp/filteredproject/',{ params: type })
            .then(response => {
                setProjects(response.data);
                console.log("two",response.data)
            })
            .catch(error => {
                console.log("error", error);
            });      
    },[])

    
    
    const fetchProjects = () => {
        const token = Cookies.get('token');
        const decoded = jwtDecode(token);

        axios.get('http://127.0.0.1:8000/myapp/filteredproject/', { params: { trainerid: decoded.user_id } })
            .then(response => {
                setProjects(response.data);
                setFilteredProjects(response.data);  
                console.log("projects data", response.data);
            })
            .catch(error => {
                console.log("error", error);
            });
    };

    useEffect(() => {
        if (batchh) {
            const filtered = batchh === "All" ? projects : projects.filter(p => p.batchname === batchh);
            setFilteredProjects(filtered);
        }
    }, [batchh])


    useEffect(()=>{
        const token = Cookies.get('token');
        const decoded = jwtDecode(token);
        axios.get('http://127.0.0.1:8000/myapp/filteredproject/', { params: { trainerid: decoded.user_id } })
            .then(response => {
                setProjects(response.data);
                setFilteredProjects(response.data);  
                console.log("projects data", response.data);
            })
            .catch(error => {
                console.log("error", error);
            });
    },[])

    const traineeProfileMap = traineeprofile.reduce((map, profile) => {
        map[profile.id] = profile.user_image;
        return map;
    }, {});



    useEffect(()=>{
        const type = { usertype: "Trainee" };

        axios.get('http://127.0.0.1:8000/myapp/allusersprofile/', { params: type })
            .then(response => {
                setTraineeprofile(response.data);
                console.log("trainees",response.data);
            })
            .catch(error => {
                console.log("error", error);
            });

    },[])

    const deleteproject=(Id)=>{
        const type = { projectid: Id };
        console.log(Id);

        axios.delete('http://127.0.0.1:8000/myapp/projectdelete/',{ params: type })
            .then(response => {
                console.log(response.data);
                setFilteredProjects(filteredProjects.filter((project) => project.id !== Id));

            })
            .catch(error=>{
                console.log(error)
            }) 

    }
    const download=(image)=>{
        const img= `http://127.0.0.1:8000${image}`;
        saveAs(img,image)
    }
    

    
    return(
        <>
            <div className="md:h-full h-screen w-4/6 md:w-full bg-gradient-to-r from-blue-50 to-blue-100">
                    <div className="flex items-center justify-start mt-2 ">
                        <p className="cursor-pointer md:ml-1 hover:text-blue-500" onClick={Addproject}>Add / </p>
                        <p className="cursor-pointer md:ml-1 hover:text-blue-500" onClick={Viewproject}>View</p>
                        {togglebatchselect &&(
                            <div className="flex  items-center mt-1 ml-3">
                                <label htmlFor="title" className="text-lx font-serif mr-2">Batch:</label>
                                <select onChange={(e) => { setBatchh(e.target.value) }}
                                    className="rounded-r border-t sm:rounded-r-none sm:border-r border-b border-l border-r block bg-white border-gray-400 text-gray-700  leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                                    <option>All</option>
                                    {batch.map((bat, index) => (
                                        <option key={index}>{bat.batchname}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                    {toggleaddproject &&(
                        <form onSubmit={submitporoject}>
                        <div className=" min-h-screen md:px-20 pt-6">
                            <div className="bg-white rounded-md px-6 py-10 md:w-11/12 w-11/12 mx-auto shadow-lg">
                                <h1 className="text-center text-2xl font-bold text-gray-500 mb-10">ADD Project</h1>
                                <div className="space-y-4 flex-col justify-center items-center">
                                    <div className="md:flex-row flex flex-col items-center justify-center">
                                        <div className="md:mr-3">
                                            <label htmlFor="title" className="text-lx font-serif mr-2">Name:</label>
                                            <input onChange={(e)=>{setProjectname(e.target.value)}} className="border border-gray-300 rounded-md p-1" type="text"></input>
                                        </div>
                                        <div className="flex  items-center md:mt-0 md:ml-3 mt-5">
                                            <label htmlFor="title" className="text-lx font-serif mr-2">Batch:</label>
                                            <select onChange={(e) => { setBatchh(e.target.value) }}
                                                className="md:w-full w-2/4 rounded-r border-t sm:rounded-r-none sm:border-r border-b border-l border-r block bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                                                <option>All</option>
                                                {batch.map((bat, index) => (
                                                    <option key={index}>{bat.batchname}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="md:flex-row flex flex-col items-center justify-evenly w-full overflow-hidden">
                                        <div className="w-full max-w-xs">
                                            <label htmlFor="start-date" className="text-lx font-serif">Start Date:</label>
                                            <input onChange={(e)=>{setStart(e.target.value)}} type="date" className="w-full max-w-xs border border-gray-300 rounded-md p-2"></input>
                                        </div>
                                        <div className="w-full max-w-xs mt-4 md:mt-0">
                                            <label htmlFor="end-date" className="text-lx font-serif">End Date:</label>
                                            <input onChange={(e)=>{setEnd(e.target.value)}} type="date" className="w-full max-w-xs border border-gray-300 rounded-md p-2"></input>
                                        </div>
                                    </div>

                                        <button type="submit" className="px-6 py-2 mx-auto block rounded-md text-lg font-semibold text-indigo-100 bg-indigo-600">ADD</button>
                                </div>
                            </div>
                        </div>
                    </form>

                    )}
                    <div className="flex flex-col md:flex-row md:justify-center h-full w-full">
                        {toggleviewproject && (
                            <section className="container mx-auto p-6 font-mono">
                                <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                                    <div className="w-full overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                                                    <th className="px-4 py-3">Name</th>
                                                    <th className="px-4 py-3">Project</th>
                                                    <th className="px-4 py-3">Start</th>
                                                    <th className="px-4 py-3">End</th>
                                                    <th className="px-4 py-3">Status</th>
                                                    <th className="px-4 py-3">Progress</th>
                                                    <th className="px-4 py-3">Action</th>

                                                </tr>
                                            </thead>
                                            <tbody className="bg-white">
                                                {filteredProjects.map((profile, index) => (
                                                    <tr className="text-gray-700" key={index}>
                                                        <td className="px-4 py-3 border">
                                                            <div className="flex items-center text-sm">
                                                                <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                                                                    <img className="object-cover w-full h-full rounded-full" src={`http://127.0.0.1:8000${traineeProfileMap[profile.traineeid]}`} alt="User Profile" />
                                                                <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                                                                </div>
                                                                <div>
                                                                    <p className="font-semibold text-black">{profile.traineename}</p>
                                                                    <p className="text-xs text-gray-600">{profile.usertype}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3 text-ms font-semibold border">{profile.projectname}</td>
                                                        <td className="px-4 py-3 text-sm border font-semibold">{profile.start}</td>
                                                        <td className="px-4 py-3 text-sm border font-semibold">{profile.end}</td>
                                                        
                                                        {profile.status=='Assigned' ?(
                                                        <td className="px-4 py-3 text-sm border font-semibold">
                                                            <p className="bg-blue-500 p-1 text-center text-white rounded-md">Assigned</p>
                                                        </td>
                                                        ):profile.status=='Submitted' ?(
                                                        <td className="px-4 py-3 text-sm border font-semibold">
                                                            <p className="bg-green-500 p-1 text-center text-white rounded-md">Submitted</p>
                                                        </td>
                                                        ):null}
                                                        <td className="px-4 py-3 text-sm border font-semibold">
                                                            <div className="flex justify-evenly items-center">
                                                                <div className="relative w-8 h-8 mr-3 md:block cursor-pointer">
                                                                    <Image className="object-cover w-full h-full" src={`http://127.0.0.1:8000${profile.image}`} alt="User Profile" />
                                                                </div>
                                                                <div className="mb-3">
                                                                    <IoCloudDownload onClick={()=>{download(profile.image)}} className="cursor-pointer text-gray-500 text-lg" />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3 text-xs border">
                                                            <div className="p-3 px-5 flex justify-start">
                                                                <button type="button" onClick={() => deleteproject(profile.id)} className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button>
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

export default Project1