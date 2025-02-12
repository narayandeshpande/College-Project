import React from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const SignupBramhin = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/bramhin/signup", data, {
        withCredentials: true
      });
      if (res.status === 201) {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/login?role=bramhin");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.error || "An error occurred");
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
      const res = await axios.post("http://localhost:3000/bramhin/sendotp", currentUserInfo, {
        withCredentials: true
      });
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Signup Form Bramhan</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className={`w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.fullname ? 'border-red-500' : 'border-gray-300'}`}
              {...register("fullname", { required: "Full name is required" })}
            />
            {errors.fullname && (
              <span className="text-sm text-red-500">{errors.fullname.message}</span>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <span className="text-sm text-red-500">{errors.email.message}</span>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className={`w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <span className="text-sm text-red-500">{errors.password.message}</span>
            )}
          </div>

          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
              OTP
            </label>
            <input
              type="text"
              id="otp"
              className={`w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.otp ? 'border-red-500' : 'border-gray-300'}`}
              {...register("otp", { required: "OTP is required" })}
            />
            {errors.otp && (
              <span className="text-sm text-red-500">{errors.otp.message}</span>
            )}
          </div>

          <div>
            <label htmlFor="no" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              id="no"
              className={`w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.no ? 'border-red-500' : 'border-gray-300'}`}
              {...register("no", { required: "Phone Number is required" })}
            />
            {errors.no && (
              <span className="text-sm text-red-500">{errors.no.message}</span>
            )}
          </div>

          <div className="flex justify-between items-center space-x-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Signup
            </button>
            <button
              type="button"
              onClick={handelclick}
              className="w-full bg-gray-500 text-white font-semibold py-2 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Send OTP
            </button>
          </div>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link
               to={`/login?role=${'Bramhin'}`}
              className="text-blue-500 hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupBramhin;
