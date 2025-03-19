import React from 'react';
import Navbar from './Navbar';
import Sidebar from './SideBar';
import { useNavigate, useLocation } from "react-router-dom";
const AboutUser = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const role = params.get("role");
  const navigate = useNavigate();
  return (
    <>
      <div className="flex h-screen bg-slate-200">
        {/* Sidebar - Only visible on Desktop */}
        <div className="hidden md:block w-64 bg-gray-900 text-white">
          <Sidebar role={role} />
        </div>

        {/* Main Content - Now fully scrollable on both desktop and mobile */}
        <div className="flex-1 p-6 overflow-y-auto h-full text-black">
          <h1 className="text-3xl font-bold mb-4">वापरकर्त्याबद्दल</h1>
          <p>
            या प्लॅटफॉर्मवर, वापरकर्ते त्यांच्या धार्मिक आणि पारंपरिक सेवांचे कार्य पोस्ट करू शकतात, तसेच त्यांनी पोस्ट केलेले कार्य रद्द किंवा पूर्ण देखील करू शकतात.
          </p>

          <h2 className="text-2xl font-semibold mt-6">वापरकर्त्याचे मुख्य कार्य:</h2>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li><strong>काम पोस्ट करा:</strong> तुम्ही तुमच्या सेवांचे काम पोस्ट करू शकता, जेणेकरून इतर ब्राह्मण ते स्वीकारू शकतील.</li>
            <li><strong>काम रद्द करा:</strong> जर तुम्हाला पोस्ट केलेले काम रद्द करायचे असेल, तर तुम्ही ते सहजपणे रद्द करू शकता. तसेच, संबंधित ब्राह्मणांना ईमेलद्वारे माहिती दिली जाईल.</li>
            <li><strong>काम पूर्ण करा:</strong> जेव्हा काम पूर्ण होईल, तेव्हा "पूर्ण झाले" बटणावर क्लिक करा, जेणेकरून त्याची नोंद घेतली जाईल.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6">हे व्यासपीठ का वापरावे?</h2>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>✔ सोपे आणि वेगवान काम व्यवस्थापन</li>
            <li>✔ नोंदणीकृत ब्राह्मणांसाठी पारदर्शक सेवा</li>
            <li>✔ जलद संप्रेषण आणि ईमेल सूचना</li>
            <li>✔ कार्यस्थिती सहज ट्रॅक करा</li>
          </ul>

          <p className="mt-6">
          उद्योग व्यवस्था तुम्हाला तुमच्या पारंपरिक आणि धार्मिक कार्यांसाठी योग्य ब्राह्मण शोधण्याची सुविधा देते. अधिक माहितीसाठी आमच्याशी संपर्क साधा.
          </p>
          <p className="mt-2 font-semibold">
            *कुठल्याही शंका किंवा मदतीसाठी आमच्याशी संपर्क साधा - [तुमची संपर्क माहिती].*
          </p>

          {/* Extra spacing so scrolling is visible */}
          <div className="h-32"></div>
        </div>
      </div>

      {/* Navbar at bottom for mobile */}
      <div className="md:hidden fixed bottom-0 left-0 w-full">
        <Navbar />
      </div>
    </>
  );
};

export default AboutUser;
