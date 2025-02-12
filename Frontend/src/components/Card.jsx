import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import  useSelectWork  from '../zustand/useSelectWork.js';
const Card = ({ work }) => {
  const {selectedWork,setSelectedWork}=useSelectWork();
  const handelOnclick = async() => {
      setSelectedWork(work)
      const workid = {
        workid: work._id,
      };
      console.log( useSelectWork.getState().selectedWork._id);
      await axios
      .post('http://localhost:3000/bramhin/acceptwork', workid, {
        withCredentials: true,
      })

    .then((res)=>{
      // console.log(res.data);
      toast.success(res.data.message);
    })
    .catch((err)=>{
      toast.error(err.response.data.error);
      // console.log(err);
    })
  };
  return (
    <div className="flex justify-center items-center my-6">
      <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-col space-y-3">
          <span className="text-xl text-center font-bold text-yellow-500">🚩 जय श्रीराम 🚩</span>

          <div className="flex flex-col space-y-2">
            <span className="font-normal">🕉 कार्य: <span className="font-normal">{work.workname}</span></span>
            {/* <span className="font-normal">🕉 कार्य: <span className="font-normal">{work._id}</span></span> */}
            <span>🧾 तारीख: <span className="font-normal">{work.date.toString().split('T')[0]}</span></span>
            <span>⏳ वेळ: सुरुवात: <span className="font-normal">{work.stime}</span> | समाप्त: <span className="font-normal">{work.ftime}</span></span>
            <span>🏛 ठिकाण: <span className="font-normal">{work.place}</span></span>
            <span>💵 दक्षिणा: ₹<span className="font-normal">{work.money}</span></span>
            <span>📱 मोबाईल No.: <span className="font-normal">{work.phone}</span></span>
            <span>
              🗺️ <a href={work.maplink} className="text-blue-400 hover:underline">Map Link</a>
            </span>
            <span>एकूण ब्राह्मण: <span className="font-normal">{work.noOfBrahman}</span></span>
            <span>अपेक्षित ब्राह्मण: <span className="font-normal">{work.noOfBramhanrequired}</span></span>
            <span>व्यवस्था झालेले ब्राह्मण: <span className="font-normal">{work.noOfBramhanweave}</span></span>
            <span>Note: <span className="font-normal">{work. note}</span></span>
          </div>

          <button className="bg-blue-500 p-2 rounded-md font-semibold text-white hover:bg-blue-600 transition duration-300"
          onClick={handelOnclick}
          >
            Apply
            </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
