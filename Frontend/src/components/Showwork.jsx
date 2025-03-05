import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useSelectWork from "../zustand/useSelectWork.js";
import Dialog from "./Dialog.jsx";
const Showwork = ({work}) => {
    const { selectedWork, setSelectedWork } = useSelectWork();
        const location = useLocation();
        const params = new URLSearchParams(location.search);
        const role = params.get("role");
        const more= params.get("more");
        const modalRef = useRef(null);
        const handleMoreButton = (work) => {
          setSelectedWork(work); // Store the selected work
          if (modalRef.current) {
            modalRef.current.showModal(); // Open the modal
          }
        };
  return (
    <div>
              <div className="space-y-4">
                
                  <div key={work._id} className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-lg">{work.workname}</h3>
                      <p className="text-gray-500">{work.date.toString().split("T")[0]}</p>
                    </div>
                    <span
                      className={`py-1 px-3 rounded-md text-sm ${work.status === "Completed"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-red-600"
                        }
                        `}
                    >
                      {work.status}
                    </span>

                    {(role === "user" || more==='true')&&(
                      <button
                        className="mt-2 w-[30%] bg-blue-500 text-white py-1 rounded-md hover:bg-blue-600 transition md:w-[10%]"
                        onClick={() => handleMoreButton(work)}
                      >
                        More
                      </button>
                    )}
                  </div>
                
              </div>
              <Dialog selectedWork={selectedWork} modalRef={modalRef} />
    </div>
  )
}

export default Showwork
