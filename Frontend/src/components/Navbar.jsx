import React, { useState } from 'react'
import { IoMdLogOut } from "react-icons/io";
import { FiAlignJustify } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import toast from 'react-hot-toast'
import axios from "axios"
const Navbar = () => {
  const [show,setShow]=useState(false)
  const handelShow=()=>{
    setShow(!show)
  }
  const handelOnclick=async()=>{
    await axios.get("http://localhost:4000/user/logout")
    .then((res)=>{
      if(res.status===200)
      {
        toast.success(res.data.message)
      }
    })
    .catch((error)=>{
      console.log(error)
      toast.error(error.response.data.error)
    })
  }
  return (
    <>
<div className="hidden md:block m-0">
<nav className="fixed top-0 left-0 w-full flex justify-between bg-slate-600 p-3 text-white z-50">
        <div className="">
          <h1 className='font-semibold text-xl'>उद्योग व्यवस्था</h1>
        </div>
        <div className="">
          <ul className='flex gap-3 mr-4 justify-center items-center'>
            <li className='cursor-pointer hover:text-blue-200 '>Home</li>
            <li className='cursor-pointer hover:text-blue-200 '>About</li>
            <li className='cursor-pointer hover:text-blue-200 '>Profile</li>
            <li className='cursor-pointer hover:text-blue-200  text-2xl'><IoMdLogOut onClick={handelOnclick}/></li>
          </ul>
        </div>
      </nav>
</div>
<div className="block md:hidden">
  <nav className='fixed top-0 left-0 w-full flex justify-between bg-slate-600 p-3 text-white items-center z-50'>
    <div className="">
   {show?<RxCross1 onClick={handelShow}/>:<FiAlignJustify onClick={handelShow}/>}
    </div>
    <div className="">
    <h1 className='font-semibold text-xl'>उद्योग व्यवस्था</h1>
    </div>
  </nav>
  {
    show&&(
      <div className="flex">
        <ul className=" fixed flex flex-col h-screen justify-center items-center w-screen bg-white  text-black gap-1">
          <li className='cursor-pointer '>Home</li>
          <li className='cursor-pointer '>About</li>
          <li className='cursor-pointer '>Profile</li>
          <li className='cursor-pointer text-2xl'><IoMdLogOut onClick={handelOnclick}/></li>
        </ul>
      </div>
    )

  }
</div>
    </>
  )
}

export default Navbar
