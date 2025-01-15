import React from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
const Signup = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const res = await axios.post("http://localhost:4000/user/signup", data,{
                withCredentials: true
              });
            if (res.status === 201) {
                // alert(res.data.message);
                toast.success(res.data.message)
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            }
        } catch (error) {
            // alert(error.response.data.error || "An error occurred");
            toast.error(error.response.data.error || "An error occurred")
            console.log(error);
        }
    };

    const handelclick = async () => {
        const currentUserInfo = {
            fullname: watch("fullname"),
            email: watch("email"),
            password: watch("password"),
            otp: watch("otp"),
        };

        console.log("otp button clicked");
        try {
            const res = await axios.post("http://localhost:4000/user/emailotp", currentUserInfo,{
                withCredentials: true
              });
              toast.success(res.data.message)
            // alert(res.data.message)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex">
            <div className="flex flex-col h-screen justify-center items-center w-screen ">
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col md:h-[60%] md:w-[40%] w-[70%] justify-center items-center bg-slate-600 text-white gap-1 rounded-lg'>
                    <h1 className='text-3xl font-semibold pb-5'>Signup</h1>
                    <label htmlFor="name" className='font-semibold'>Enter your Fullname</label>
                    <input type="text" name="name" id="name"
                        className='md:w-[50%] w-[90%] p-1 rounded-md border border-white bg-white text-black'
                        {...register("fullname", { required: true })}
                    />
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

                    <label htmlFor="otp">Enter your OTP</label>
                    <input type="text" name="otp" id="otp"
                        className='md:w-[50%] w-[90%] p-1 rounded-md border border-white bg-white text-black'
                        {...register("otp", { required: true })}
                    />
                    {errors.otp && <span className='text-sm text-red-600'>OTP is required</span>}

                    <div className="flex">
                        <input type="submit" value="Signup"
                            className='bg-blue-500 p-2 rounded-md cursor-pointer font-semibold m-2 hover:bg-blue-600' />
                        <p className='bg-blue-500 p-2 rounded-md cursor-pointer font-semibold m-2 hover:bg-blue-600'
                            onClick={handelclick}>
                            send OTP
                        </p>
                    </div>
                    <p>I have an account  <Link to={'/'} href="" className="text-blue-600 underline mb-1">Login</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
