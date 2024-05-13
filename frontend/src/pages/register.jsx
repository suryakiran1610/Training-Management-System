import React, { useState } from "react";

function Register() {
    const [profile, setProfile] = useState(false);
    const [degree, setDegree] = useState(false);
    const [usertype, setUsertype] = useState("");

    const handleUserTypeChange = (e) => {
        const userType = e.target.value;
        setUsertype(userType);

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

    return (
        <div class="flex  p-2 h-screen flex-col bg-gradient-to-t from-cyan-400 to-slate-50">
            <h1 class="text-center text-3xl font-bold">TRAINING DEPARTMENT</h1>
            <div className="bg-white w-full md:w-11/12 lg:w-3/4 xl:w-2/3 mx-auto p-8 mt-16 rounded-lg border-2 shadow-md">
                <div className="text-center mb-3">
                    <h2 className="text-xl font-bold">Register</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input type="email" name="email" placeholder="Email" required className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Phone</label>
                        <input type="tel" name="phonenumber" placeholder="Phone Number" required className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">First Name</label>
                        <input type="text" name="firstname" placeholder="First Name" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Last Name</label>
                        <input type="text" name="lastname" placeholder="Last Name" required className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Select User</label>
                        <select onChange={handleUserTypeChange} className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400">
                            <option>Select User</option>
                            <option>Trainer</option>
                            <option>Trainee</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Select Department</label>
                        <select className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400">
                            <option>Select Department</option>
                            <option>React</option>
                            <option>Python</option>
                        </select>
                    </div>

                    {(profile || degree) && (
                        <div className="mb-4 flex flex-col md:flex-row md:space-x-4">
                            {profile && (
                                <div className="mb-2 md:w-1/2">
                                    <label className="block text-sm font-medium">Profile Image</label>
                                    <input type="file" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400" />
                                </div>
                            )}

                            {degree && (
                                <div className="mb-2 md:w-1/2">
                                    <label className="block text-sm font-medium">Degree Certificate</label>
                                    <input type="file" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400" />
                                </div>
                            )}
                        </div>
                    )}

                    <div className="mb-4 col-span-2">
                        <label className="block text-sm font-medium">Gender</label>
                        <div className="flex items-center">
                            <input type="radio" name="gender" id="male" className="mr-2" />
                            <label htmlFor="male" className="mr-4">Male</label>
                            <input type="radio" name="gender" id="female" className="mr-2" />
                            <label htmlFor="female">Female</label>
                        </div>
                    </div>
                    <div className="mb-4 col-span-2">
                        <button type="submit" className="w-full bg-blue-400 text-white py-2 px-4 rounded-md hover:bg-yellow-500 focus:outline-none focus:bg-yellow-500">Register</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
