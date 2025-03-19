import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const useGetAllwork = () => {
          const navigate = useNavigate();
const [allWork,setAllwork]=useState([])
useEffect(()=>{
        
                const getAllwork=async()=>{
                       
                               await axios.get("https://udyogvyavstha.onrender.com/work/home",{
                                        withCredentials:true
                                })
                                .then((res)=>{
                                        setAllwork(res.data);
                                })
                                .catch((error)=>{
                                        if(error.status===401)
                                        {
                                                navigate("/")
                                        }
                                })
                }
                getAllwork()
       
},[])
  return [allWork]
}

export default useGetAllwork
