import React from 'react';
import { MdAddBox } from "react-icons/md";
import Navbar from './Navbar';
import Card from './Card';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const handelOnlick=()=>{
    navigate("/work")
  }
  return (
    <>
      <Navbar />
      <div className="pt-5">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        {/* Position the icon on the right side, 100px above the bottom */}
         <div className="fixed bottom-[100px] right-5">
          <MdAddBox className="text-5xl text-blue-500 cursor-pointer" 
            onClick={handelOnlick}
          />
        </div>
      </div> 
    </>
  );
};

export default Home;
