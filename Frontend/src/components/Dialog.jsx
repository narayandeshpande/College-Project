import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';
const Dialog = ({ selectedWork, modalRef }) => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
  const [isFutureDate, setIsFutureDate] = useState(true);

  useEffect(() => {
    if (selectedWork?.date) {
      const formattedDate = new Date(selectedWork.date).toISOString().split("T")[0];
      setIsFutureDate(formattedDate >= today && selectedWork.status !== "Completed" && selectedWork.status !== "Canceled");
    }
  }, [selectedWork?.date]); // Runs when `selectedWork.date` changes

  const handleComplete = async() => {
    // console.log("Complete");
    // console.log(selectedWork?._id);
    await axios.post("https://udyogvyavstha.onrender.com/work/completeWork",{workId:selectedWork?._id},{withCredentials:true})
    .then((res)=>{
      // console.log(res.data);
      toast.success(res.data.message);
      setTimeout(() => {
        navigate(0);
    },3000)
    })
    .catch((err)=>{
      console.log(err);
    })
  };

  const handleCancel = async() => {

    await axios.post("http://localhost:3000/work/cancelWork",{workId:selectedWork?._id},{withCredentials:true})
    .then((res)=>{
      if(res.status===201){
        toast.success(res.data.message);
        setTimeout(() => {
          navigate(0);
      },3000)
      }
    })
    .catch((err)=>{
      toast.error(err.response.data.message);
    })
    // console.log("Cancel");
    // console.log(selectedWork?.date);
  };

  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-lg">Work Details</h3>
        {selectedWork ? (
          <>
            <p className="py-2"><b>Work Name:</b> {selectedWork.workname}</p>
            <p className="py-2"><b>Date:</b> {selectedWork.date ? new Date(selectedWork.date).toISOString().split("T")[0] : "No Date"}</p>
            <p className="py-2"><b>Status:</b> {selectedWork.status}</p>
          </>
        ) : (
          <p>No work selected.</p>
        )}
        <div className="flex justify-between">
          {isFutureDate && (
            <p className="bg-slate-500 p-2 rounded-lg text-white cursor-pointer" onClick={handleComplete}>
              Complete
            </p>
          )}
          {isFutureDate && (
            <p className="bg-slate-500 p-2 rounded-lg text-white cursor-pointer" onClick={handleCancel}>
              Cancel
            </p>
          )}
        </div>
      </div>
    </dialog>
  );
};

export default Dialog;
