import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const Profile = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const role = params.get("role");
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [user, setUser] = useState({});

  const profile = async () => {
    if (role === "user") {
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
    }
    else if(role === "Bramhin") {
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
    }
  };

  useEffect(() => {
    if (role) profile();
  }, [role]); // Runs when `role` changes

  // useEffect(() => {
  //   console.log("Updated Data:", data);
  //   console.log("Updated User:", user);
  // }, [data, user]); // Logs when data updates

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  const firstLetter = user?.fullname?.[0] ?? "U"; // Prevent undefined error

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-br from-blue-100 via-white to-blue-50 min-h-screen">
        {/* Header */}
        <div className="text-center py-14">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
            Your Profile
          </h1>
          <p className="text-gray-600 mt-4 text-lg">
            Manage your information and track your work history.
          </p>
        </div>

        {/* Profile Card */}
        <div className="flex justify-center">
          <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6 mx-4">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-blue-500 text-4xl font-bold">
                {firstLetter}
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-gray-800">
                {user?.name ?? "User"}
              </h2>
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

        {/* Work History Section */}
        <div className="mt-10 px-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Work History</h2>
          <div className="space-y-4">
            {data?.map((work) => (
              <div
                key={work._id}
                className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold text-lg">{work.workname}</h3>
                  <p className="text-gray-500">{work.date.toString().split('T')[0]}</p>
                </div>
                <span
                  className={`py-1 px-3 rounded-md text-sm ${
                    work.status === "Completed"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {work.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
