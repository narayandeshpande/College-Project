import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const Addwork = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const role = params.get('role');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const workInfo = {
      workname: data.work,
      date: data.date,
      stime: data.stime,
      ftime: data.ftime,
      place: data.place,
      money: data.money,
      phone: data.phone,
      maplink: data.maplink,
      noOfBrahman: data.count,
      note: data.note,
    };

    try {
      const res = await axios.post("https://udyogvyavstha.onrender.com/work/addwork", workInfo, {
        withCredentials: true,
      });

      if (res.status === 201) {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate(`/home?role=${role}`);
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg mb-10"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">कार्याची माहिती</h2>

        <div className="space-y-4">
          {/* Work Name */}
          <div>
            <label className="block text-gray-600 font-medium">कार्याचे नाव:</label>
            <input type="text" {...register("work", { required: true })} 
              className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400" />
            {errors.work && <span className="text-red-500 text-sm">This field is required</span>}
          </div>

          {/* Date */}
          <div>
            <label className="block text-gray-600 font-medium">तारीख:</label>
            <input type="date" {...register("date", { required: true })} 
              className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400" />
            {errors.date && <span className="text-red-500 text-sm">This field is required</span>}
          </div>

          {/* Time Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 font-medium">सुरुवात वेळ:</label>
              <input type="time" {...register("stime", { required: true })} 
                className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400" />
              {errors.stime && <span className="text-red-500 text-sm">This field is required</span>}
            </div>
            <div>
              <label className="block text-gray-600 font-medium">समाप्त वेळ:</label>
              <input type="time" {...register("ftime", { required: true })} 
                className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400" />
              {errors.ftime && <span className="text-red-500 text-sm">This field is required</span>}
            </div>
          </div>

          {/* Place */}
          <div>
            <label className="block text-gray-600 font-medium">ठिकाण:</label>
            <input type="text" {...register("place", { required: true })} 
              className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400" />
            {errors.place && <span className="text-red-500 text-sm">This field is required</span>}
          </div>

          {/* Money */}
          <div>
            <label className="block text-gray-600 font-medium">दक्षिणा:</label>
            <input type="number" {...register("money", { required: true })} 
              className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400" />
            {errors.money && <span className="text-red-500 text-sm">This field is required</span>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-600 font-medium">मोबाईल No.:</label>
            <input type="text" {...register("phone", { required: true })} 
              className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400" />
            {errors.phone && <span className="text-red-500 text-sm">This field is required</span>}
          </div>

          {/* Map Link */}
          <div>
            <label className="block text-gray-600 font-medium">Map Link:</label>
            <input type="text" {...register("maplink", { required: false })} 
              className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400" />
          </div>

          {/* No. of Brahmins */}
          <div>
            <label className="block text-gray-600 font-medium">किती ब्राह्मण हवे आहेत:</label>
            <input type="number" {...register("count", { required: true })} 
              className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400" />
            {errors.count && <span className="text-red-500 text-sm">This field is required</span>}
          </div>

          {/* Note */}
          <div>
            <label className="block text-gray-600 font-medium">टीप:</label>
            <textarea {...register("note")} 
              className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400"></textarea>
          </div>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600 transition">
          Submit
        </button>
      </form>

      {/* Navbar Fix */}
      <div className="mt-auto w-full relative">
        <Navbar />
      </div>
    </div>
  );
};

export default Addwork;
