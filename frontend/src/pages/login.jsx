import React from "react";

function Login(){

    return(

        <>
        <div className="flex p-2 h-screen w-full flex-col  items-center  bg-gradient-to-b from-sky-400 to-sky-200">
            <h1 className="text-center text-3xl font-bold  ">TRAINING DEPARTMENT</h1>
            <div className=" w-11/12 md:w-11/12 lg:w-3/4 xl:w-2/3 mx-auto p-8 mt-16  flex flex-col justify-center ">
                <div className="text-center mb-3">
                    <h2 className="text-2xl font-bold  text-red-500">LOGIN</h2>
                </div>
                <div className="flex flex-col justify-center w-full items-center">
                    <div className="mt-7 w-full flex justify-center">
                        <input type="email" name="email" placeholder="Email" required className="w-2/4 mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400" />
                    </div>
                    <div className="mt-7 w-full flex justify-center">
                        <input type="tel" name="phonenumber" placeholder="Password" required className="w-2/4 mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-400 focus:border-yellow-400" />
                    </div>
                    <div className="mt-7 w-full flex justify-center">
                        <button type="submit" className="w-6/12 bg-blue-400 text-white py-2 px-4 rounded-md hover:bg-yellow-500 focus:outline-none focus:bg-yellow-500">Register</button>
                    </div>
                </div>    
            </div>        

        </div>

        </>
    )
}
export default Login