import React from 'react';
import Navbar from './Navbar';
import Sidebar from './SideBar';
import { useNavigate, useLocation } from "react-router-dom";
const AboutBramhin = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const role = params.get("role");
  const navigate = useNavigate();
 
  return (
    <>
      <div className="flex h-screen bg-slate-200">
        {/* Sidebar - Hidden on small screens, visible on desktop */}
        <div className="hidden md:block w-64 bg-gray-900 text-white">
          <Sidebar role={role}/>
        </div>

        {/* Main Content - Now scrolls properly */}
        <div className="flex-1 p-6 overflow-y-auto h-screen text-black">
          <h1 className="text-3xl font-bold mb-4">आमच्याबद्दल</h1>
          <p>
            उद्योग व्यवस्था मध्ये तुमचे स्वागत आहे! हे एक विशेष व्यासपीठ आहे जिथे ब्राह्मणांना सहजपणे धार्मिक आणि पारंपरिक कार्य शोधता आणि स्वीकारता येईल. तसेच, हे व्यासपीठ तुम्हाला तुमच्या सेवांचे पोस्टिंग करण्याची आणि इतर ब्राह्मणांना उपलब्ध संधीबद्दल माहिती मिळवण्याची सुविधा देते.
          </p>

          <h2 className="text-2xl font-semibold mt-6">प्रोजेक्टच्या मुख्य वैशिष्ट्ये:</h2>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li><strong>कोणतेही उपलब्ध काम स्वीकारा:</strong> तुम्ही इतरांनी पोस्ट केलेले कोणतेही काम सहजपणे स्वीकारू शकता.</li>
            <li><strong>तुमचे स्वतःचे काम पोस्ट करा:</strong> जर तुम्ही ब्राह्मण असाल आणि सेवा प्रदान करू इच्छित असाल, तर तुम्ही स्वतःची सेवा पोस्ट करू शकता.</li>
            <li><strong>नोंदणी आणि लॉगिन आवश्यक आहे:</strong> प्लॅटफॉर्मचा वापर करण्यासाठी तुम्हाला साइनअप आणि लॉगिन करावे लागेल.</li>
            <li><strong>काम रद्द करण्याची सुविधा:</strong> जर तुम्ही पोस्ट केलेले काम रद्द केले, तर त्या कामाविषयी माहिती सर्व ब्राह्मणांना ईमेलद्वारे पाठवली जाईल.</li>
            <li><strong>काम पूर्ण केल्याची नोंद करा:</strong> काम पूर्ण झाल्यानंतर "पूर्ण झाले" हा बटण दाबा, जेणेकरून आम्हाला त्याची नोंद घेता येईल.</li>
            <li><strong>तुमच्या सर्व कार्यांचे ट्रॅकिंग:</strong> तुम्ही तयार केलेले आणि स्वीकारलेले सर्व काम एका ठिकाणी सहज ट्रॅक करू शकता.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6">हे व्यासपीठ का वापरावे?</h2>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>✔ सोयीस्कर आणि कार्यक्षम प्रक्रिया</li>
            <li>✔ ब्राह्मणांसाठी रोजगार संधी</li>
            <li>✔ पारंपरिक सेवांचे सहज आयोजन</li>
            <li>✔ नोंदणीकृत वापरकर्त्यांसाठी सुरक्षित आणि पारदर्शक प्रणाली</li>
            <li>✔ जलद संप्रेषण आणि अधिसूचना प्रणाली</li>
            <li>✔ सहज ट्रॅकिंग प्रणाली - तुमच्या कार्याचा पूर्ण आढावा मिळवा</li>
          </ul>

          <p className="mt-6">
            उद्योग व्यवस्था ब्राह्मणांसाठी एक सुलभ आणि पारदर्शक व्यासपीठ प्रदान करते, जिथे तुम्ही तुमच्या सेवा सहजपणे शोधू आणि देऊ शकता. तुम्हाला जर अधिक माहिती हवी असेल तर आमच्याशी संपर्क साधा.
          </p>
          <p className="mt-2 font-semibold">
            *कुठल्याही शंका किंवा मदतीसाठी आमच्याशी संपर्क साधा - [तुमची संपर्क माहिती].*
          </p>

          {/* Extra space for scrolling on mobile */}
          <div className="h-32"></div>
        </div>
      </div>

      {/* Navbar always at bottom for mobile */}
      <div className="md:hidden fixed bottom-0 left-0 w-full">
        <Navbar />
      </div>
    </>
  );
};

export default AboutBramhin;
