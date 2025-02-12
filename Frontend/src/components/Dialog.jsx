import React from "react";

const Dialog = ({ selectedWork, modalRef }) => {
  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* Close button */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Work Details</h3>
        {selectedWork ? (
          <>
            <p className="py-2"><b>Work Name:</b> {selectedWork.workname}</p>
            <p className="py-2"><b>Date:</b> {selectedWork.date?.toString().split("T")[0]}</p>
            <p className="py-2"><b>Status:</b> {selectedWork.status}</p>
          </>
        ) : (
          <p>No work selected.</p>
        )}
        <div className="flex justify-between">
          <p className="bg-slate-500 p-2 rounded-lg  text-white">Complete</p>
        <p className="bg-slate-500 p-2 rounded-lg  text-white">Cnacel</p>
        </div>
      </div>
    </dialog>
  );
};

export default Dialog;
