import React, { useState } from "react";

function Users() {
    const [trainers, setTrainers] = useState(false);
    const [trainees, setTrainees] = useState(false);

    const trainer = () => {
        setTrainers(true);
        setTrainees(false);
    };
    const trainee = () => {
        setTrainees(true);
        setTrainers(false);
    };

    return (
        <>      
            <div className=" md:h-full h-screen w-4/6 md:w-full bg-gradient-to-r from-blue-50 to-blue-100"> 
                <div className="flex w-full mt-2">
                    <p className="cursor-pointer md:ml-1 ml-10 hover:text-blue-500" onClick={trainer}>Trainer / </p>
                    <p className="cursor-pointer md:ml-1 hover:text-blue-500" onClick={trainee}>&nbsp;Trainee</p>
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
                                            <tr className="text-gray-700">
                                                <td className="px-4 py-3 border">
                                                    <div className="flex items-center text-sm">
                                                        <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                                                            <img className="object-cover w-full h-full rounded-full" src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" loading="lazy" />
                                                            <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-black">Suryakiran</p>
                                                            <p className="text-xs text-gray-600">Trainer</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-ms font-semibold border">React</td>
                                                <td className="px-4 py-3 text-sm border">skannan300@gmail.com</td>
                                                <td className="px-4 py-3 text-sm border">Male</td>

                                                <td className="px-4 py-3 text-xs border">
                                                    <td class="p-3 px-5 flex justify-start">
                                                        <button type="button" class="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Save</button>
                                                        <button type="button" class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button>
                                                    </td>
                                                </td>
                                            </tr>

                                            <tr className="text-gray-700">
                                                <td className="px-4 py-3 border">
                                                    <div className="flex items-center text-sm">
                                                        <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                                                            <img className="object-cover w-full h-full rounded-full" src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" loading="lazy" />
                                                            <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-black">Suryakiran</p>
                                                            <p className="text-xs text-gray-600">Trainer</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-ms font-semibold border">React</td>
                                                <td className="px-4 py-3 text-ms font-semibold border">skannan300@gmail.com</td>
                                                <td className="px-4 py-3 text-ms font-semibold border">Male</td>

                                                <td className="px-4 py-3 text-xs border">
                                                    <td class="p-3 px-5 flex justify-start">
                                                        <button type="button" class="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Save</button>
                                                        <button type="button" class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button>
                                                    </td>
                                                </td>
                                            </tr>
                                           
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
                                       <tr className="text-gray-700">
                                           <td className="px-4 py-3 border">
                                               <div className="flex items-center text-sm">
                                                   <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                                                       <img className="object-cover w-full h-full rounded-full" src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" loading="lazy" />
                                                       <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                                                   </div>
                                                   <div>
                                                       <p className="font-semibold text-black">Suryakiran</p>
                                                       <p className="text-xs text-gray-600">Trainer</p>
                                                   </div>
                                               </div>
                                           </td>
                                           <td className="px-4 py-3 text-ms font-semibold border">React</td>
                                           <td className="px-4 py-3 text-sm border">skannan300@gmail.com</td>
                                           <td className="px-4 py-3 text-sm border">Male</td>

                                           <td className="px-4 py-3 text-xs border">
                                               <td class="p-3 px-5 flex justify-start">
                                                   <button type="button" class="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Save</button>
                                                   <button type="button" class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button>
                                               </td>
                                           </td>
                                       </tr>                      
                                   </tbody>
                               </table>
                           </div>
                       </div>
                   </section>
                    )}
                </div>
            </div>
        </>
    );
}

export default Users;
