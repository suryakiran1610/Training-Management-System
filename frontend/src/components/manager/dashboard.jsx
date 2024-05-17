import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
import axios from 'axios';
import { AiOutlineStock } from "react-icons/ai";
import { TbTransactionBitcoin } from "react-icons/tb";
import { MdCallToAction } from "react-icons/md";


function Dashboard(){

    const[userprofile,setUserprofile]=useState([])

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

    return(
        <>
            <div className="flex flex-col h-full w-full bg-gradient-to-r from-blue-50 to-blue-100 md:justify-center md:items-center ">   
                <div class="mb-1 w-11/12 h-1/4 flex flex-col md:flex-row md:justify-evenly mt-10  ">
                    <div class=" flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md  ml-8 mb-9">
                        <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-6 h-6 text-white">
                            <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
                            <path fill-rule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z" clip-rule="evenodd"></path>
                            <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"></path>
                            </svg>
                        </div>
                        <div class="p-4 text-right">
                            <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Today's Money</p>
                            <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">$53k</h4>
                        </div>
                        <div class="border-t border-blue-gray-50 p-4">
                            <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                            <strong class="text-green-500">+55%</strong>&nbsp;than last week
                            </p>
                        </div>
                    </div>
                    <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md ml-8 mb-9">
                        <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-6 h-6 text-white">
                            <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd"></path>
                            </svg>
                        </div>
                        <div class="p-4 text-right">
                            <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Today's Users</p>
                            <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">2,300</h4>
                        </div>
                        <div class="border-t border-blue-gray-50 p-4">
                            <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                            <strong class="text-green-500">+3%</strong>&nbsp;than last month
                            </p>
                        </div>
                    </div>
                    <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md ml-8 mb-9 ">
                        <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-6 h-6 text-white">
                            <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
                            </svg>
                        </div>
                        <div class="p-4 text-right">
                            <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">New Clients</p>
                            <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">3,462</h4>
                        </div>
                        <div class="border-t border-blue-gray-50 p-4">
                            <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                            <strong class="text-red-500">-2%</strong>&nbsp;than yesterday
                            </p>
                        </div>
                    </div>
                    <div class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md ml-8 mb-9">
                        <div class="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-orange-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-6 h-6 text-white">
                            <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z"></path>
                            </svg>
                        </div>
                        <div class="p-4 text-right">
                            <p class="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Sales</p>
                            <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">$103,430</h4>
                        </div>
                        <div class="border-t border-blue-gray-50 p-4">
                            <p class="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                            <strong class="text-green-500">+5%</strong>&nbsp;than yesterday
                            </p>
                        </div>
                    </div>
                </div> 
                <div class="mb-1 w-11/12 h-1/4 flex flex-col md:flex-row md:justify-evenly mt-1 md:mt-8 md:mb-8">
                    <div class="w-full lg:w-6/12 xl:w-3/12 px-4 ml-3">
                      <div class="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                         <div class="flex-auto p-4">
                            <div class="flex flex-wrap">
                               <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                                  <h5 class="text-blueGray-400 uppercase font-bold text-xs">Traffic</h5>
                                  <span class="font-bold text-xl">350,897</span>
                               </div>
                               <div class="relative w-auto pl-4 flex-initial">
                                  <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500"><i className="text-2xl"><AiOutlineStock /></i></div>
                               </div>
                            </div>
                            <p class="text-sm text-blueGray-500 mt-4"><span class="text-emerald-500 mr-2"><i class="fas fa-arrow-up"></i> 3.48%</span><span class="whitespace-nowrap">Since last month</span></p>
                         </div>
                      </div>
                    </div>
                    <div class="w-full lg:w-6/12 xl:w-3/12 px-4 ml-3">
                        <div class="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                            <div class="flex-auto p-4">
                                <div class="flex flex-wrap">
                                <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                                    <h5 class="text-blueGray-400 uppercase font-bold text-xs">NEW USERS</h5>
                                    <span class="font-bold text-xl">2,356</span>
                                </div>
                                <div class="relative w-auto pl-4 flex-initial">
                                    <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-orange-500"><i className="text-2xl"><MdCallToAction /></i></div>
                                </div>
                                </div>
                                <p class="text-sm text-blueGray-500 mt-4"><span class="text-red-500 mr-2"><i class="fas fa-arrow-down"></i> 3.48%</span><span class="whitespace-nowrap">Since last week</span></p>
                            </div>
                        </div>
                    </div>
                    <div class="w-full lg:w-6/12 xl:w-3/12 px-4 ml-3">
                        <div class="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
                            <div class="flex-auto p-4">
                                <div class="flex flex-wrap">
                                <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                                    <h5 class="text-blueGray-400 uppercase font-bold text-xs">SALES</h5>
                                    <span class="font-bold text-xl">924</span>
                                </div>
                                <div class="relative w-auto pl-4 flex-initial">
                                    <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-pink-500"><i className="text-2xl" ><TbTransactionBitcoin /></i></div>
                                </div>
                                </div>
                                <p class="text-sm text-blueGray-500 mt-4"><span class="text-orange-500 mr-2"><i class="fas fa-arrow-down"></i> 1.10%</span><span class="whitespace-nowrap">Since yesterday</span></p>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
                 
        </>
    )
} 
export default Dashboard      