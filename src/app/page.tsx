"use client"
import { NextResponse } from "next/server";
import { toast, ToastContainer, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import React from 'react'
import axios from "axios";
const Mainpage = () => {
  const router = useRouter()
  const Logout=async()=>{
   
    const toastOptions: ToastOptions = {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark"
    };
   try {
      await axios.post("/api/log-out")
      toast.success("Logout successful", toastOptions)
      router.push("/log-in")
    } catch (error) {
    console.log("Logout error:",error);
        return NextResponse.json({
            error: "An error occurred",
            statusCode: 500,
        })
   }
  }
  return (
    <div>
      <button onClick={Logout} className='m-8 bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent '>Logout</button>
      <ToastContainer/>     
    </div>
  )
}

export default Mainpage