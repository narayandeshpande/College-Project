import React from 'react'
import axios from 'axios'
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom'
import Signup from './Signup'
import toast from 'react-hot-toast'
const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password
    }
    await axios.post("http://localhost:4000/user/login", userInfo, {
      withCredentials: true
    })
      .then((res) => {
        // alert(res.data.message)
        toast.success(res.data.message)
        if (res.status === 201) {
          setTimeout(() => {
            navigate("/home")
          }, 2000)
        }
      })
      .catch((errors) => {
        //  alert(errors.response.data.error)
        toast.error(errors.response.data.error)

      })
  }
  return (
    <>
      <div className="flex">
        <div className="flex flex-col h-screen justify-center items-center w-screen ">
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col md:h-[50%] md:w-[40%] w-[70%] justify-center items-center bg-slate-600 text-white gap-1 rounded-lg'>
            <h1 className='text-3xl font-semibold pb-5'>Login</h1>

            {errors.fullname && <span className='text-sm text-red-600'>This field is required</span>}
            <label htmlFor="email" className='font-semibold'>Enter your mail</label>
            <input type="email" name="email" id="email"
              className='md:w-[50%] w-[90%] p-1 rounded-md border border-white bg-white text-black'
              {...register("email", { required: true })}
            />
            {errors.email && <span className='text-sm text-red-600'>This field is required</span>}
            <label htmlFor="password" className='font-semibold'>Enter your password</label>
            <input type="password" name="password" id="password"
              className='md:w-[50%] w-[90%] p-1 rounded-md border border-white bg-white text-black'
              {...register("password", { required: true })}
            />
            {errors.password && <span className='text-sm text-red-600'>This field is required</span>}

            <div className="flex">
              <input type="submit" value="Login"
                className='bg-blue-500 p-2 rounded-md cursor-pointer font-semibold m-2 hover:bg-blue-600' />
            </div>
            <p>Create new Account  <Link to={'/signup'} href="" className="text-blue-600  underline mb-1">Signup</Link></p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
