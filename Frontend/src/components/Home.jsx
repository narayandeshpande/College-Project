import React, { useState } from 'react';
import { MdAddBox } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Card from './Card';
import useGetAllwork from '../Context/useGetAllwork';
import axios from "axios";
import toast from 'react-hot-toast';
import Sidebar from './SideBar';
import Navbar from './Navbar';

const Home = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const role = params.get('role');
  const [allWork] = useGetAllwork();
  const navigate = useNavigate();

  const handelOnclick = async () => {
    await axios.get("http://localhost:3000/user/logout", { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
        }
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.error);
      });
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50">
      {/* Sidebar (Hidden on Mobile) */}
      <div className="hidden md:block w-64 bg-white shadow-lg">
        <Sidebar role={role} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="text-center py-6 md:py-10">
          <h1 className="text-2xl md:text-5xl font-bold text-gray-800">Welcome to Work Portal</h1>
          <p className="text-gray-600 mt-2 md:mt-4 text-base md:text-lg">Explore available works or create a new one to connect with others.</p>
        </div>

        {/* Cards Section */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:p-6 overflow-y-auto mb-20">
          {allWork.map((work, index) => (
            <Card
              work={work}
              key={index}
              className="w-full bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            />
          ))}
        </div>

        {/* Add Button */}
        <div className="fixed bottom-6 right-4 sm:bottom-10 sm:right-8 md:bottom-12 md:right-12">
          <MdAddBox
            className="text-5xl sm:text-6xl text-blue-500 cursor-pointer hover:text-blue-700 transition-transform transform hover:scale-110"
            onClick={() => navigate(`/work?role=${role}`)}
          />
        </div>

        {/* Navbar as Footer */}
        <div className="mt-auto w-full">
          <Navbar />
        </div>
      </div>
    </div>
  );
};

export default Home;