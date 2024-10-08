"use client"
import axios from 'axios';
import Link from 'next/link';
import React from 'react';
import { useState } from 'react'
import { toast, ToastContainer, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false);
  const toastOptions: ToastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error("All fields are required", toastOptions)
      return;
    }
    // Prepare data to send
    const data = {
      email,
      password
    }
    setLoading(true); // Disable button and show loader

    try {
      const response = await axios.post('/api/log-in', data)
      if (response.status === 200) {
        toast.success("Login successful", toastOptions)
      }
      router.push('/')
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('Login failed. Please try again.', toastOptions);

    } finally {
      setLoading(false); // Re-enable button and hide loader
    }
  }
  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-dark-blue-black px-4'>
      <h2 className='text-4xl font-bold bg-gradient-to-r from-red-900 to-white bg-clip-text text-transparent mb-8'>
        Login
      </h2>

      <form onSubmit={handleSubmit} className=' p-8 rounded-lg shadow-lg w-full max-w-md'>
        <div className="mb-4">
          <label htmlFor="Email" className='block text-lg bg-gradient-to-r from-white to-black bg-clip-text text-transparent mb-2'>
            E-mail
          </label>
          <input
            id='Email'
            className='w-full bg-transparent p-3 border-2 text-white outline-none rounded-md border-lavender-violet focus:border-purple-500 transition-all duration-300 ease-in-out'
            type="email"
            placeholder='Enter your E-mail'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>



        <div className="mb-6">
          <label htmlFor="password" className='block text-lg bg-gradient-to-r from-white to-black bg-clip-text text-transparent mb-2'>
            Password
          </label>
          <input
            id='password'
            className='w-full bg-transparent p-3 border-2 text-white outline-none rounded-md border-lavender-violet focus:border-purple-500 transition-all duration-300 ease-in-out'
            type="password"
            placeholder='Enter your Password'
            onChange={(e) => setPassword(e.target.value)}

          />
        </div>

        <button
          disabled={loading}
          className=' capitalize w-full p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md hover:from-purple-700 hover:to-pink-700 transition-all duration-300 ease-in-out'>
          {loading ? 'Logging in...' : 'Log in'}


        </button>
      </form>
      {/* <Link className='mt-2 bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent' href="/log-in"> Already have a account ?</Lin> */}
      <Link className=' mb-4 bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent' href="/sign-up"> New User? </Link>
      <ToastContainer/>
    </div>
  );
};

export default Login;
