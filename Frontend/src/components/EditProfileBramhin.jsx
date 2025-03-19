import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Navbar from './Navbar';
import Sidebar from './SideBar';

const EditProfileBramhin = () => {

  const { register, handleSubmit, watch, formState: { errors } } = useForm(); 
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await axios.post("https://udyogvyavstha.onrender.com/bramhin/updateProfile", data, {withCredentials: true})
    .then((res)=>{
      toast.success(res.data.message);
      setTimeout(() => {
        navigate("/login?role=Bramhin");
      }, 2000);
    })
    .catch((error)=>{
      console.log(error)
      toast.error(error.response.data.error || "An error occurred");
    })
  };
  
  const handelclick = async () => {
    const newEmail = {
      email: watch("email")
    };
    try {
      const res = await axios.post("http://localhost:3000/bramhin/sendotp", newEmail, {
        withCredentials: true
      });
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      <Sidebar role="bramhin" />
      <div className="pt-16 bg-gradient-to-br from-blue-100 via-white to-blue-50 min-h-screen flex justify-center items-center flex-col">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Edit Your Profile</h1>
        <p>Note:You need to enter whole data again</p>
        <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
                {...register("fullname", { required: "Full name" })}
              />
              {errors.fullname && <span className="text-sm text-red-500">{errors.fullname.message}</span>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter a new password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="no" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                id="no"
                className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your phone number"
                {...register("no", { required: "Phone Number is required" })}
              />
              {errors.no && <span className="text-sm text-red-500">{errors.no.message}</span>}
            </div>

            <div>
              <label htmlFor="place" className="block text-sm font-medium text-gray-700 mb-1">
                Your Place
              </label>
              <input
                type="text"
                id="place"
                className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your phone number"
                {...register("place", { required: "Place is required" })}
              />
              {errors.no && <span className="text-sm text-red-500">{errors.place.message}</span>}
            </div>
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                OTP
              </label>
              <input
                type="text"
                id="otp"
                placeholder="Enter OTP"
                className={`w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500'}`}
                {...register("otp", { required: "OTP is required" })}
              />
              {errors.otp && (
                <span className="text-sm text-red-500">{errors.otp.message}</span>
              )}
            </div>


            {/* Buttons */}
            <div className="flex justify-between items-center space-x-4">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Update Profile
              </button>

              <button
                type="button"
                onClick={handelclick}
                className="w-full bg-gray-500 text-white font-semibold py-2 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Send OTP
              </button>

            </div>
          </form>
        </div>
        <div className="mt-auto w-full">
          <Navbar />
        </div>
      </div>
    </>
  );
};

export default EditProfileBramhin;
