import React from 'react'

function CourseProgress({ progress, label}) {
  return (
    <div className="mb-6 w-full">
      <div className="flex justify-between mb-1 text-sm font-medium text-gray-700">
        <span>{label}</span>
        <span>{progress}%</span>
      </div>
      <div className="w-full rounded-full bg-[#ecd67c]" >
        <div
          className="h-2 bg-black rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  )
}

export default CourseProgress