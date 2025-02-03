import React from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom'
const Addwork = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    const workInfo = {
      workname: data.work,
      date: data.date,
      stime: data.stime,
      ftime: data.ftime,
      place: data.place,
      money: data.money,
      phone: data.phone,
      maplink: data.maplink,
      noOfBraman: data.count,
      note: data.note
    }
    await axios.post("http://localhost:4000/work/addwork", workInfo, {
      withCredentials: true
    })
      .then((res) => {
        if (res.status === 201) {
          toast.success(res.data.message)
          setTimeout(() => {
            navigate("/home")
          }, 2000)
        }
      })
      .catch((error) => {
        toast.error(errors.response.data.error)
        console.log(error);

      })
  }


  return (
    <div className='flex justify-center items-center h-screen w-screen'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center border border-white md:w-[40%] md:h-[90%] rounded-lg items-center w-[90%] h-[73%]'>
        <label htmlFor="work">कार्याचे नाव:</label>
        <input type="text" name="work" id="work"
          className='md:w-[50%] w-[90%] p-1 rounded-md border border-white bg-white text-black'
          {...register("work", { required: true })}
        />
        {errors.work && <span className='text-sm text-rose-800'>This field is required</span>}
        <label htmlFor="date">तारीख:</label>
        <input type="date" name="date" id="date"
          className='md:w-[50%] w-[90%] p-1 rounded-md border border-white bg-white text-black'
          {...register("date", { required: true })}
        />
        {errors.date && <span className='text-sm text-rose-800'>This field is required</span>}
        <label htmlFor="stime">सुरुवात वेळ</label>
        <input type="time" name="stime" id="stime"
          className='md:w-[50%] w-[90%] p-1 rounded-md border border-white bg-white text-black'
          {...register("stime", { required: true })}
        />
        {errors.stime && <span className='text-sm text-rose-800'>This field is required</span>}
        <label htmlFor="ftime">समाप्त वेळ</label>
        <input type="time" name="ftime" id="ftime"
          className='md:w-[50%] w-[90%] p-1 rounded-md border border-white bg-white text-black'
          {...register("ftime", { required: true })}
        />
        {errors.ftime && <span className='text-sm text-rose-800'>This field is required</span>}
        <label htmlFor="place">ठिकाण:</label>
        <input type="text" name="place" id="place"
          className='md:w-[50%] w-[90%] p-1 rounded-md border border-white bg-white text-black'
          {...register("place", { required: true })}
        />
        {errors.place && <span className='text-sm text-rose-800'>This field is required</span>}
        <label htmlFor="money">दक्षिणा:</label>
        <input type="text" name="monet" id="money"
          className='md:w-[50%] w-[90%] p-1 rounded-md border border-white bg-white text-black'
          {...register("money", { required: true })}
        />
        {errors.money && <span className='text-sm text-rose-800'>This field is required</span>}
        <label htmlFor="phone">मोबाईल No.</label>
        <input type="text" name="phone" id="phone"
          className='md:w-[50%] w-[90%] p-1 rounded-md border border-white bg-white text-black'
          {...register("phone", { required: true })}
        />
        {errors.phone && <span className='text-sm text-rose-800'>This field is required</span>}
        <label htmlFor="maplink">Map Link:</label>
        <input type="text" name="maplink" id="maplink"
          className='md:w-[50%] w-[90%] p-1 rounded-md border border-white bg-white text-black'
          {...register("maplink", { required: true })}
        />
        {errors.maplink && <span className='text-sm text-rose-800'>This field is required</span>}
        <label htmlFor="count">किती ब्राह्मण हवे आहेत:</label>
        <input type="text" name="count" id="count"
          className='md:w-[50%] w-[90%] p-1 rounded-md border border-white bg-white text-black'
          {...register("count", { required: true })}
        />
        {errors.count && <span className='text-sm text-rose-800'>This field is required</span>}
        <label htmlFor="note">टीप:</label>
        <input type="text" name="note" id="note"
          className='md:w-[50%] w-[90%] p-1 rounded-md border border-white bg-white text-black'
          {...register("note", { required: false })}
        />
        {errors.note && <span className='text-sm text-rose-800'>This field is required</span>}
        <input type="submit" value="Submit"
          className='bg-blue-500 p-2 rounded-md cursor-pointer font-semibold m-2 hover:bg-blue-600 text-white'
        />
      </form>
    </div>
  )
}

export default Addwork