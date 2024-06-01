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

function Project2(){
    const [toggletodo,setToggletodo]=useState(false)
    const [togglesubmitted,setTogglesubmitted]=useState(false)
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [toggleaddimage,setToggleaddimage]=useState(false)
    const [image,setImage]=useState(null)
    const [filteredProjects1, setFilteredProjects1] = useState([]);


    const fetchProjects = () => {
        const token = Cookies.get('token');
        const decoded = jwtDecode(token);

        axios.get('http://127.0.0.1:8000/myapp/filteredprojecttrainee/', { params: { traineeid: decoded.user_id } })
            .then(response => {
                setFilteredProjects(response.data);
                console.log("projects data", response.data);
            })
            .catch(error => {
                console.log("error", error);
            });
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    

    const AddTodo=()=>{
        setToggletodo(true)
        setTogglesubmitted(false)

    }

    const Viewsubmitted=()=>{
        setTogglesubmitted(true)
        setToggletodo(false)

        const token = Cookies.get('token');
        const decoded = jwtDecode(token);
        axios.get('http://127.0.0.1:8000/myapp/filteredprojecttrainee1/', { params: { traineeid: decoded.user_id } })
        .then(response => {
                    setFilteredProjects1(response.data);
                    console.log("data1", response.data);

                })
                .catch(error => {
                    console.log("error", error);
                });
    }

    const Submit=(Id)=>{
        axios.get('http://127.0.0.1:8000/myapp/filteredproject1/', { params: { projectid:Id} })
                .then(response => {
                    const projectData = response.data[0];
                    setSelectedProject(projectData);
                    console.log("data1", projectData);
                    setToggleaddimage(true);

                })
                .catch(error => {
                    console.log("error", error);
                });
                
    }
    const handleadddproject=(e)=>{
        e.preventDefault()
            const formData = new FormData();
                formData.append('image',image);
                formData.append('projectid',selectedProject.id);
    
                axios.put('http://127.0.0.1:8000/myapp/addprojectimage/', formData)
                    .then(response => {
                        console.log(response.data);
                        setToggleaddimage(false)

                        const notificationFormData = new FormData();
                        notificationFormData.append('dept',selectedProject.department);
                        notificationFormData.append('trainerid',selectedProject.trainerid);
                        notificationFormData.append('type', "projectsubmitted");
                        notificationFormData.append('message', "Project Submitted");

        
                    axios.post('http://127.0.0.1:8000/myapp/notificationpost4/', notificationFormData)
                        .then(notificationResponse => {
                            console.log(notificationResponse.data);
                            fetchProjects();
                        })
                        .catch(error=>{
                            console.log("notification error")
                        })    

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
            <div className="md:h-full h-screen w-3/4 md:w-full bg-gradient-to-r from-blue-50 to-blue-100">
                    <div className="flex justify-start mt-2 ">
                        <p className="cursor-pointer md:ml-1 hover:text-blue-500" onClick={AddTodo}>ToDo / </p>
                        <p className="cursor-pointer md:ml-1 hover:text-blue-500" onClick={Viewsubmitted}>Submitted</p>
                    </div>   
                    {toggletodo &&(
                        <section className="container mx-auto p-6 font-mono">
                                    <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                                        <div className="w-full overflow-x-auto">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                                                        <th className="px-4 py-3">Project Name</th>
                                                        <th className="px-4 py-3">Start</th>
                                                        <th className="px-4 py-3">End</th>
                                                        <th className="px-4 py-3">Status</th>
                                                        <th className="px-4 py-3">Action</th>

                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white">
                                                    {filteredProjects.map((profile, index) => (
                                                        <tr className="text-gray-700" key={index}>
                                                            <td className="px-4 py-3 text-ms font-semibold border">{profile.projectname}</td>
                                                            <td className="px-4 py-3 text-sm border font-semibold">{profile.start}</td>
                                                            <td className="px-4 py-3 text-sm border font-semibold">{profile.end}</td>
                                                            
                                                            {profile.status=='Assigned' ?(
                                                            <td className="px-4 py-3 text-sm border font-semibold">
                                                                <p className="bg-orange-500 p-1 text-center text-white rounded-md">Not Submitted</p>
                                                            </td>
                                                            ):null}
                                                            
                                                            <td className="px-4 py-3 text-xs border">
                                                                <div className="p-3 px-5 flex justify-start">
                                                                    <button type="button" onClick={() => Submit(profile.id)} className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Submit</button>
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
                    {toggleaddimage && (

                        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50">
                        <div className="relative w-full max-w-lg p-5 mx-auto my-auto bg-white rounded-xl shadow-lg">
                        <form onSubmit={handleadddproject} encType="multipart/form-data">
                            <div className="text-center  flex-auto justify-start">

                                <svg className="w-16 h-16 flex items-center text-red-500 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                                </svg>
                                <h2 className="text-xl font-bold py-4">SUBMIT PROJECT</h2>
                                    <p type="text"  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">Project:<span className="font-bold font-serif text-lg ml-2">{selectedProject.projectname}</span></p>
                                    <p type="text"  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">Start Date:<span className="font-semibold  text-base ml-2">{selectedProject.start}</span></p>
                                    <p type="text"  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">End Date:<span className=" font-semibold text-base ml-2">{selectedProject.end}</span></p>
                                    <input type="file" onChange={(e)=>setImage(e.target.files[0])} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></input>
                            </div>
                            <div className="p-3 mt-2 text-center space-x-4 md:block">
                                <button className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100" onClick={()=>{setToggleaddimage(false)}}>
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
                    {togglesubmitted && (
                        <section className="container mx-auto p-6 font-mono">
                            <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                                <div className="w-full overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                                                <th className="px-4 py-3">Project Name</th>
                                                <th className="px-4 py-3">Start</th>
                                                <th className="px-4 py-3">End</th>
                                                <th className="px-4 py-3">Status</th>
                                                <th className="px-4 py-3">Progress</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white">
                                            {filteredProjects1.map((profile, index) => (
                                                <tr className="text-gray-700" key={index}>
                                                    
                                                    <td className="px-4 py-3 text-ms font-semibold border">{profile.projectname}</td>
                                                    <td className="px-4 py-3 text-sm border font-semibold">{profile.start}</td>
                                                    <td className="px-4 py-3 text-sm border font-semibold">{profile.end}</td>
                                                    
                                                    {profile.status=='Submitted' ?(
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
                                                    
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>

                    )}    
            </div>
        </>
    )
}

export default Project2