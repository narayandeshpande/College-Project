import { useNavigate, useLocation } from "react-router-dom";
import { React, useState, useEffect } from "react";
import useGetAllCreatedWork from "../Context/useGetAllCreatedWork";
import Showwork from "./Showwork";
import useGetAllAcceptedWork from "../Context/useGetAllAcceptedWork";

const Buttons = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Get current URL
    const [allCreateWork] = useGetAllCreatedWork();
    const [allacceptedwork] = useGetAllAcceptedWork();

    const [allCreatedworkisnull, setAllCreatedworkisnull] = useState(false);
    const [allAcceptedworkisnull, setAllAcceptedworkisnull] = useState(false);

    const [showcreated, setShowcreated] = useState(false);
    const [showaccepted, setShowaccepted] = useState(false);

    // Effect to update state when work data changes
    useEffect(() => {
        setAllCreatedworkisnull(allCreateWork.length > 0);
        setAllAcceptedworkisnull(allacceptedwork.length > 0);
    }, [allCreateWork, allacceptedwork]);

    const handleAllCreatedWork = () => {
        setShowcreated(true);
        setShowaccepted(false);

        // Update URL with query parameter
        navigate(`${location.pathname}?role=Bramhin&more=true`);
    };

    const handleAllAcceptedWork = () => {
        setShowaccepted(true);
        setShowcreated(false);

        // Remove "more=true" when clicking "Accepted Work"
        navigate(`${location.pathname}?role=Bramhin`);
    };

    return (
        <div className="flex flex-col justify-center">
            <button
                className="mt-2 bg-blue-500 text-white py-1 rounded-md hover:bg-blue-600 transition md:w-[20%] mr-2"
                onClick={handleAllAcceptedWork}
            >
                Accepted work
            </button>

            <button
                className="mt-2 bg-blue-500 text-white py-1 rounded-md hover:bg-blue-600 transition md:w-[20%] mr-2 p-1"
                onClick={handleAllCreatedWork}
            >
                Created Work
            </button>

            {/* Render Created Work */}
            {showcreated &&
                (allCreatedworkisnull ? (
                    allCreateWork.map((work, index) => (
                        <div className="m-3" key={index}>
                            <Showwork work={work} />
                        </div>
                    ))
                ) : (
                    <p>No created work available</p>
                ))
            }

            {/* Render Accepted Work */}
            {showaccepted &&
                (allAcceptedworkisnull ? (
                    allacceptedwork.map((work, index) => (
                        <div className="m-3" key={index}>
                            <Showwork work={work} />
                        </div>
                    ))
                ) : (
                    <p>No accepted work available</p>
                ))
            }
        </div>
    );
};

export default Buttons;
