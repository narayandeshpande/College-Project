import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Sidebar from './SideBar';
import Navbar from './Navbar';

const EditProfileUser = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/user/updateProfile", data, { withCredentials: true });
      toast.success(res.data.message);
      setTimeout(() => navigate("/login?role=user"), 2000);
    } catch (error) {
      toast.error(error.response?.data?.error || "An error occurred");
    }
  };

  const handleSendOTP = async () => {
    try {
      const res = await axios.post("http://localhost:3000/user/emailotp", { email: watch("email") }, { withCredentials: true });
      toast.success(res.data.message);
    } catch (error) {
      toast.error("Failed to send OTP");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar role="user" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center items-center p-6">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md border border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800 text-center">Edit Your Profile</h1>
          <p className="text-center text-gray-600 mb-4">Please fill in all details again.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Input Fields */}
            {[
              { label: "Full Name", id: "fullname", type: "text", placeholder: "Enter your full name" },
              { label: "Email", id: "email", type: "email", placeholder: "Enter your email" },
              { label: "Password", id: "password", type: "password", placeholder: "Enter a new password" },
              { label: "Phone Number", id: "no", type: "text", placeholder: "Enter your phone number" },
              { label: "Your Place", id: "place", type: "text", placeholder: "Enter your place" },
              { label: "OTP", id: "otp", type: "text", placeholder: "Enter OTP" },
            ].map(({ label, id, type, placeholder }) => (
              <div key={id}>
                <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
                <input
                  type={type}
                  id={id}
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  placeholder={placeholder}
                  {...register(id, { required: `${label} is required` })}
                />
                {errors[id] && <span className="text-sm text-red-500">{errors[id].message}</span>}
              </div>
            ))}

            {/* Buttons */}
            <div className="flex flex-col space-y-3 mt-4">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Update Profile
              </button>

              <button
                type="button"
                onClick={handleSendOTP}
                className="w-full bg-gray-500 text-white font-semibold py-2 rounded-lg hover:bg-gray-600 transition duration-300"
              >
                Send OTP
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Navbar at Bottom */}
      <div className="w-full fixed bottom-0">
        <Navbar />
      </div>
    </div>
  );
};

export default EditProfileUser;
