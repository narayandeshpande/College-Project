import React from 'react';
import { MdAddBox } from "react-icons/md";
import Navbar from './Navbar';
import Card from './Card';
import { useLocation } from 'react-router-dom';
import useGetAllwork from '../Context/useGetAllwork';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const role = params.get('role');
  // console.log(role);
  const [allWork] = useGetAllwork();
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(`/work?role=${role}`);
  };

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-br from-blue-100 via-white to-blue-50 min-h-screen pt-20">
        {/* Header Section */}
        <div className="text-center py-10">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800">Welcome to Work Portal</h1>
          <p className="text-gray-600 mt-4 text-lg">
            Explore available works or create a new one to connect with others.
          </p>
        </div>

        {/* Cards Section */}
        <div className="flex flex-wrap justify-center gap-6 px-4">
          {allWork.map((work, index) => (
            <Card
              work={work}
              key={index}
              className="w-full sm:w-[48%] lg:w-[30%] bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            />
          ))}
        </div>

        {/* Add Button */}
        <div className="fixed bottom-10 right-5 sm:bottom-12 sm:right-12">
          <MdAddBox
            className="text-6xl text-blue-500 cursor-pointer hover:text-blue-700 transition-transform transform hover:scale-110"
            onClick={handleOnClick}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
