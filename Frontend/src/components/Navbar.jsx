import React, { useState } from 'react'
import { LuLogOut } from "react-icons/lu";
import { FiAlignJustify } from "react-icons/fi";
import { useLocation } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { RxCross1 } from "react-icons/rx";
import toast from 'react-hot-toast'
import axios from "axios"
const Navbar = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const role = params.get('role');
  
  const navigate = useNavigate();
  const [show, setShow] = useState(false)
  const handelShow = () => {
    setShow(!show)
  }
  const handelOnclick = async () => {
    await axios.get("http://localhost:4000/user/logout",{
      withCredentials:true
    })
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message)
        }
        setTimeout(() => {
          navigate("/")
        }, 2000);
      })
      .catch((error) => {
        console.log(error)
        toast.error(error.response.data.error)
      })
  }
  return (
    <>
      <div className="hidden md:block m-0">
        <nav className="fixed top-0 left-0 w-full flex justify-between bg-blue-500 p-3 text-white z-50">
          <div className="">
            <h1 className='font-semibold text-2xl'>उद्योग व्यवस्था</h1>
          </div>
          <div className="">
            <ul className='flex gap-3 mr-4 justify-center items-center'>
            <Link className='cursor-pointer hover:text-blue-200 font-bold' to={`/home?role=${role}`}>Home</Link>
                <Link className='cursor-pointer hover:text-blue-200 font-bold' to={`/about?role=${role}`}>About</Link>
                <Link className='cursor-pointer hover:text-blue-200 font-bold' to={`/profile?role=${role}`}>Profile</Link>
              <li className='cursor-pointer hover:text-blue-200  text-2xl'><LuLogOut onClick={handelOnclick} className='text-3xl' /></li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="block md:hidden">
        <nav className='fixed top-0 left-0 w-full flex justify-between bg-blue-500 p-3 text-white items-center z-50'>
          <div className="">
            {show ? <RxCross1 onClick={handelShow} /> : <FiAlignJustify onClick={handelShow} />}
          </div>
          <div className="">
            <h1 className='font-semibold text-2xl'>उद्योग व्यवस्था</h1>
          </div>
        </nav>
        {
          show && (
            <div className="flex">
              <ul className=" fixed flex flex-col h-screen justify-center items-center w-screen bg-gray-600  text-white">
                <Link className='cursor-pointer text-lg font-bold' to={`/home?role=${role}`}>Home</Link>
                <Link className='cursor-pointer text-lg  font-bold' to={`/about?role=${role}`}>About</Link>
                <Link className='cursor-pointer text-lg font-bold' to={`/profile?role=${role}`}>Profile</Link>
                <li className='cursor-pointer text-2xl'><LuLogOut onClick={handelOnclick} className='text-3xl font-bold'/></li>
              </ul>
            </div>
          )

        }
      </div>
    </>
  )
}

export default Navbar
