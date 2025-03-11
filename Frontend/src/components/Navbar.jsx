import React from 'react';
import { LuLogOut } from "react-icons/lu";
import { MdAddBox } from "react-icons/md";
import { IoHomeSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { MdInfo } from "react-icons/md";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from "axios";

const Navbar = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const role = params.get('role');
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/logout", { withCredentials: true });
      if (res.status === 200) {
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || "Logout failed");
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-gray-800 p-4 text-white shadow-lg z-50 md:hidden">
      <div className="flex justify-around items-center">
        {/* Home */}
        <Link to={`/home?role=${role}`} className="flex flex-col items-center text-gray-300 hover:text-white transition">
          <IoHomeSharp className="text-2xl" />
          <span className="text-xs">Home</span>
        </Link>

        {/* About */}
        <Link to={`/about?role=${role}`} className="flex flex-col items-center text-gray-300 hover:text-white transition">
          <MdInfo className="text-2xl" />
          <span className="text-xs">About</span>
        </Link>

        <Link to={`/work?role=${role}`} className="flex flex-col items-center text-gray-300 hover:text-white transition">
             <MdAddBox
                    className="text-3xl"
                    onClick={() => navigate(`/work?role=${role}`)}
                  />
          <span className="text-xs">Add Work</span>
        </Link>

        {/* Profile */}
        <Link to={`/profile?role=${role}`} className="flex flex-col items-center text-gray-300 hover:text-white transition">
          <FaUserCircle className="text-2xl" />
          <span className="text-xs">Profile</span>
        </Link>

        {/* Logout */}
        <button onClick={handleLogout} className="flex flex-col items-center text-gray-300 hover:text-white transition">
          <LuLogOut className="text-2xl" />
          <span className="text-xs">Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
