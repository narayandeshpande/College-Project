import axios from 'axios'
import React, { useEffect, useState } from 'react'

const useGetAllAcceptedWork = () => {
        const [allAcceptlWork,setallAcceptlWork]=useState([])
        useEffect(()=>{
                const getAllAcceptedWork=async()=>{
                        await axios.get("http://localhost:3000/bramhin/allacceptedwork",{withCredentials:true})
                        .then((res)=>{
                                setallAcceptlWork(res.data);
                        })
                        .catch((error)=>{
                                console.error(error)
                        })
                }
                getAllAcceptedWork()
        },[])
        return[allAcceptlWork]
}

export default useGetAllAcceptedWork
