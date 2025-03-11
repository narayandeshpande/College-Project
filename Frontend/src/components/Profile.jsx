import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Sidebar from "./SideBar.jsx";
import Buttons from "./Buttons.jsx";
import Showwork from "./Showwork.jsx";
import Navbar from "./Navbar.jsx";

const Profile = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const role = params.get("role");
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [user, setUser] = useState({});

  const profile = async () => {
    try {
      console.log("Fetching profile data for role:", role);
      const res = await axios.post(
        "http://localhost:3000/comman/profile",
        { role },
        { withCredentials: true }
      );
      console.log("Profile data received:", res.data);
      setData(res.data.data);
      setUser(res.data.user);
    } catch (err) {
      console.error("Profile Fetch Error:", err);
    }
  };

  useEffect(() => {
    if (role) {
      profile();
    } else {
      console.warn("Role is missing. Skipping profile fetch.");
    }
  }, [role]);

  const handleEditProfile = () => {
    navigate(`/edit-profile?role=${role}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar role={role} />
      
      {/* Main Content */}
      <div className="flex-1 p-4 md:p-10 flex flex-col items-center">
        <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 w-full max-w-lg md:max-w-2xl">
          <div className="text-center">
            <div className="w-24 h-24 md:w-28 md:h-28 mx-auto rounded-full bg-blue-200 flex items-center justify-center text-blue-600 text-4xl md:text-5xl font-bold">
              {user?.fullname?.[0]?.toUpperCase() ?? "U"}
            </div>
            <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-gray-800">
              {user?.fullname ?? "User"}
            </h2>
            <p className="text-gray-500 text-sm md:text-lg">
              {user?.address ?? "Location not available"}
            </p>
          </div>
          <div className="mt-4 md:mt-6 space-y-2 md:space-y-4 border-t pt-4 text-sm md:text-lg">
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
            className="mt-4 md:mt-6 w-full bg-blue-500 text-white py-2 md:py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Edit Profile
          </button>
        </div>

        {/* Work History Section */}
        <div className="mt-6 md:mt-10 bg-white shadow-lg rounded-lg p-4 md:p-6 w-full max-w-lg md:max-w-2xl">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 border-b pb-2">Work History</h2>
          <div className="mt-2 md:mt-4 space-y-2 md:space-y-4 mb-10">
            {role === 'user' ? (
              Array.isArray(data) && data.length > 0 ? (
                data.map((work) => <Showwork work={work} key={work._id} />)
              ) : (
                <p className="text-gray-500 text-center">No work history available</p>
              )
            ) : (
              <Buttons />
            )}
          </div>
        </div>
      </div>

      {/* Navbar */}
      <Navbar />
    </div>
  );
};

export default Profile;
