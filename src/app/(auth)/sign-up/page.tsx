"use client"
import React,{useState} from 'react'
import axios from 'axios';
import { toast, ToastContainer,ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Signup = () => {
  const router=useRouter();
  const [email,setEmail]=useState('')
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const  toastOptions: ToastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    //validation
    if(!email || !username || !password){
      toast.error("All fields are required",toastOptions)
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Email is not valid!',toastOptions);
      return;
    }
    if (username.length < 2 || username.length > 20) {
      toast.error('Username must be between 2 and 20 characters!',toastOptions);
      return;
    }
    if (password.length < 7 || password.length > 20) {
      toast.error('Password must be between 7 and 20 characters!',toastOptions);
      return;
    }
    setLoading(true); 
    //call your API here
    try {
      const res = await axios.post('/api/sign-up',{
        email,
        username,
        password
      })
      toast.success("User created successfully!", toastOptions);
      router.push('/log-in')
      console.log(res.data)
    } catch (error) {
      console.error('Error during signup:', error);
      toast.error('Signup failed. Please try again.', toastOptions);
    }finally {
      setLoading(false); // Reset loading state
    }
  }
  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-black '>
        <h2 className='mr-4 text-center text-xl  bg-gradient-to-r from-red-900 to-white bg-clip-text  text-transparent  '>Sign Up</h2>
         <form className='semi-black ' onSubmit={handleSubmit} action="">
         <label htmlFor="Email" className=' mt-2 block ml-16 bg-gradient-to-r from-white to-black bg-clip-text text-transparent  '>E-mail</label>
            <input onChange={(e)=> setEmail(e.target.value)} id='Email' className=' mt-2  bg-transparent p-1 border-2 text-white outline-none rounded-md border-solid border-lavender-violet focus:border-purple-500' type="text" placeholder=' Enter  E-mail'   />
            <label htmlFor="Username" className=' mt-2 block ml-16 bg-gradient-to-r from-white to-black bg-clip-text text-transparent  '>Username</label>
            <input onChange={(e)=>setUsername(e.target.value)} id='Username' className=' block mt-2 bg-transparent p-1 border-2 text-white outline-none rounded-md border-solid border-lavender-violet focus:border-purple-500' type="text" placeholder='Enter  Username'   />
            <label htmlFor="password" className=' mt-2 block ml-16 bg-gradient-to-r from-white to-black bg-clip-text text-transparent  '>Password</label>

            <input onChange={(e) => setPassword(e.target.value)}  id='password' className=' mt-2  bg-transparent p-1 border-2 text-white outline-none rounded-md border-solid border-lavender-violet focus:border-purple-500' type="password" placeholder='Enter Password'   />
          <button  type='submit' className='block ml-16 mt-2 p-2 bg-gradient-to-r from-purple-700 to-pink-700 rounded-md hover:from-purple-900'>  {loading ? 'Signing Up...' : 'Signup'}</button>
         </form>
          <Link className='mt-2 bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent' href="/log-in"> Already have a account ?</Link>
         <ToastContainer /> 
    </div>
  )
}

export default Signup