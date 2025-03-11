import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useSelectWork from "../zustand/useSelectWork.js";

const Card = ({ work }) => {
  const { setSelectedWork } = useSelectWork();
  const [loading, setLoading] = useState(false);

  const handleOnClick = async () => {
    setSelectedWork(work);
    const workid = { workid: work._id };

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/bramhin/acceptwork",
        workid,
        { withCredentials: true }
      );
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center my-4">
      <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg w-full max-w-[350px] mx-auto">
        <div className="flex flex-col space-y-3">
          <span className="text-xl text-center font-bold text-yellow-500">
            🚩 जय श्रीराम 🚩
          </span>

          <div className="flex flex-col space-y-2">
            <span className="block font-medium">🕉 कार्य: {work.workname}</span>
            <span className="block">📅 तारीख: {work.date.split("T")[0]}</span>
            <span className="block">
              ⏳ वेळ: <strong>सुरुवात:</strong> {work.stime} | <strong>समाप्त:</strong>{" "}
              {work.ftime}
            </span>
            <span className="block">🏛 ठिकाण: {work.place}</span>
            <span className="block">💵 दक्षिणा: ₹{work.money}</span>
            <span className="block">📱 मोबाईल No.: {work.phone}</span>
            <span className="block">
              🗺️ <a href={work.maplink} className="text-blue-400 hover:underline">Map Link</a>
            </span>
            <span className="block">👥 एकूण ब्राह्मण: {work.noOfBrahman}</span>
            <span className="block">🧑‍💼 अपेक्षित ब्राह्मण: {work.noOfBramhanrequired}</span>
            <span className="block">✔️ व्यवस्था झालेले ब्राह्मण: {work.noOfBramhanweave}</span>
            <span className="block">📝 Note: {work.note}</span>
          </div>

          <button
            className="bg-blue-500 p-2 rounded-md font-semibold text-white hover:bg-blue-600 transition duration-300 disabled:opacity-50"
            onClick={handleOnClick}
            disabled={loading}
          >
            {loading ? "Processing..." : "Apply"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
