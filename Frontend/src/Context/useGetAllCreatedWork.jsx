import axios from 'axios'
import React, { useEffect,useState } from 'react'

const useGetAllCreatedWork = () => {
        const [allCreateWork, setallCreateWork] = useState([])
        useEffect(() => {
                const getAllCreatedWork = async () => {
                        await axios.get("https://udyogvyavstha.onrender.com/bramhin/allcreatework", { withCredentials: true })
                                .then((res) => {
                                        setallCreateWork(res.data);
                                })
                                .catch((err) => {
                                        console.error(err)
                                })
                }
                getAllCreatedWork()
        }, [])
        return [allCreateWork]
}

export default useGetAllCreatedWork
