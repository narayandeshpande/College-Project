import React from 'react'

const Card = () => {
  return (
    <div className='flex justify-center items-center m-10'>
        <div className="flex flex-col justify-center border border-white md:w-[30%] h-[30%] p-2 rounded-lg">
                <span className='text-center'>🚩जय श्रीराम🚩</span>
<span>🕉 कार्य :- संकष्टी व्रत उद्यापन </span>
<span>🧾 तारीख:-26 / 12 / 24</span>
<span>⏳वेळ:-सुरुवात:-10.00 : समाप्त:-1.00</span>
<span>🏛 ठिकाण :- कोथरूड </span>
<span>💵 दक्षिणा :- ₹1000</span>
<span>📱मोबाईल No. :-87473488</span>
<span>🗺️<a href="#">Map Link</a></span>
<span> एकूण ब्राह्मण:- 22</span>
<span>अपेक्षित ब्राह्मण:- 20</span>
<span>व्यवस्था झालेले ब्राह्मण:- 2</span>
<button className='bg-blue-500 p-2 rounded-md cursor-pointer font-semibold m-2 hover:bg-blue-600 text-white'>Apply</button>

        </div>
    </div>
  )
}

export default Card
