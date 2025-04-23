import React from 'react'

function CourseProgress({ progress, color = "blue" }) {

  return (
    <div className='basis-[48%]'>
      <h1 className='text-[#121212FF] text-2xl font-bold'>Course Progress</h1>
      <p className='text-[14px] text-[#71717A] mb-10'>Completion rate by course</p>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
      <div
        className={`h-full rounded-full transition-all duration-300 ${color === 'blue' ? 'bg-blue-500' : 'bg-green-500'}`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
    </div>
  )
}

export default CourseProgress