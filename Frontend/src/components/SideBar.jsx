import React from 'react';
import { LuLogOut } from "react-icons/lu";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import  toast  from 'react-hot-toast';
const Sidebar = ({ role }) => {
          const navigate = useNavigate();
        const handelOnclick = async () => {
                await axios.get("https://udyogvyavstha.onrender.com/user/logout", { withCredentials: true })
                  .then((res) => {
                        // console.log(res)
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
    <div className="w-64 bg-gray-600 shadow-lg min-h-screen fixed top-0 left-0 p-4 hidden md:block m-0">
      <h1 className='font-semibold text-2xl mb-6 text-gray-300'>उद्योग व्यवस्था</h1>
      <ul className='flex flex-col gap-4'>
        <Link className='cursor-pointer hover:text-blue-500 font-semibold text-white text-base' to={`/home?role=${role}`}>Home</Link>
        <Link className='cursor-pointer hover:text-blue-500 font-semibold text-white text-base' to={`/about?role=${role}`}>About</Link>
        <Link className='cursor-pointer hover:text-blue-500 font-semibold text-white text-base' to={`/profile?role=${role}`}>Profile</Link>
        <li className='cursor-pointer hover:text-blue-500 text-2xl'>
          <LuLogOut onClick={handelOnclick} className='text-3xl text-white' />
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
