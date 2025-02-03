import React from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
const Profile = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const role = params.get('role');
  const navigate = useNavigate();

  // Mock User Data
  const user = {
    name: "John Doe",
    phone: "9876543210",
    email: "john.doe@example.com",
    location: "Mumbai, India",
    works: [
      {
        id: 1,
        title: "Wedding Pooja",
        date: "2025-01-15",
        status: "Completed",
      },
      {
        id: 2,
        title: "Housewarming Ceremony",
        date: "2025-01-20",
        status: "Ongoing",
      },
    ],
  };

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };
// console.log(user.name[0])
  return (
    <>
      <Navbar />
    <div className="bg-gradient-to-br from-blue-100 via-white to-blue-50 min-h-screen">
      {/* Header */}
      <div className="text-center py-14">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800">Your Profile</h1>
        <p className="text-gray-600 mt-4 text-lg">Manage your information and track your work history.</p>
      </div>

      {/* Profile Card */}
      <div className="flex justify-center">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6 mx-4">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-blue-500 text-4xl font-bold">
              {user.name[0]}
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-gray-800">{user.name}</h2>
            <p className="text-gray-500">{user.location}</p>
          </div>
          <div className="mt-6 space-y-4">
            <div>
              <span className="font-semibold">Phone:</span> {user.phone}
            </div>
            <div>
              <span className="font-semibold">Email:</span> {user.email}
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
          {user.works.map((work) => (
            <div
              key={work.id}
              className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-lg">{work.title}</h3>
                <p className="text-gray-500">{work.date}</p>
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
