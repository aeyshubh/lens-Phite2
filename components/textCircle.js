import React from 'react'

function TextCircle() {
  return (
    // <div className="flex absolute border rounded-full w-24 h-24 items-center justify-center text-blue-300 bg-slate-500 top-16 -left-10">
    //   <img src='/images/avatar-head.jpeg' alt='avtar head' className='rounded-full'/>
    // </div>
    // also remember to give relative to the parent div if above is code is used again
    <div className="flex absolute border rounded-full w-24 h-24 items-center justify-center text-blue-300 bg-slate-500">
      <img src='/images/avatar-head.jpeg' alt='avtar head' className='rounded-full'/>
    </div>
  )
}

export default TextCircle