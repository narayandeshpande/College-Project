import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const HRY = () => {

  
    const navigate = useNavigate();
    const handelClick1 = () => {
      toast.success("You are Yajman");
      setTimeout(() => {
        navigate(`/login?role=${'user'}`); // Navigate with the role parameter
      }, 2000);
    };
    
    const handelClick2 = () => {
      toast.success("You are Bramhin");
      setTimeout(() => {
        navigate(`/login?role=${'Bramhin'}`); // Navigate with the role parameter
      }, 2000);
    };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <h1 className="text-3xl font-bold text-white mb-8">Choose Your Role</h1>
      <div className="space-y-4">
        <button className="px-6 m-3 py-3 bg-green-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition duration-300" onClick={handelClick1}>
          I am Yajman
        </button>
        <button className="px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition duration-300" onClick={handelClick2}>
          I am Brahmin
        </button>
      </div>
    </div>
  );
};

export default HRY;
