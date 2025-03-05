import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
// import useSelectWork from "../zustand/useSelectWork.js";
import Buttons from "./Buttons.jsx";
import Showwork from "./Showwork.jsx";

const Profile = () => {
  // const { selectedWork, setSelectedWork } = useSelectWork();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const role = params.get("role");
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [user, setUser] = useState({});

  const profile = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/comman/profile",
        { role },
        { withCredentials: true }
      );
      setData(res.data.data);
      setUser(res.data.user);
    } catch (err) {
      console.error("Profile Fetch Error:", err);
    }
  };

  useEffect(() => {
    if (role) profile();
  }, [role]);

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };



  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-br from-blue-100 via-white to-blue-50 min-h-screen">
        <div className="text-center py-14">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800">Your Profile</h1>
          <p className="text-gray-600 mt-4 text-lg">
            Manage your information and track your work history.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6 mx-4">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-blue-500 text-4xl font-bold">
                {user?.fullname?.[0]?.toUpperCase() ?? "U"}

              </div>
              <h2 className="mt-4 text-2xl font-semibold text-gray-800">{user?.name ?? "User"}</h2>
              <p className="text-gray-500">{user?.location ?? "Location not available"}</p>
            </div>
            <div className="mt-6 space-y-4">
              <div>
                <span className="font-semibold">Full Name: </span>
                {user?.fullname ?? "N/A"}
              </div>
              <div>
                <span className="font-semibold">Email:</span> {user?.email ?? "N/A"}
              </div>
            </div>
            <button
              onClick={handleEditProfile}
              className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              Edit Profile
            </button>
          </div>
        </div>

        <div className="mt-10 px-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Work History</h2>
          {
            role === 'user' ?
              <div className="space-y-4">
                {data?.map((work) => (
                  <Showwork work={work} key={work._id}/>
                ))}
              </div> :
            <Buttons/>
          }
        </div>
      </div>
    </>
  );
};

export default Profile;
