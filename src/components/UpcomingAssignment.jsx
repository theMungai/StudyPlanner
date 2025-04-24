import React from 'react'

function AssigmentsCard({title, subject, date, time, color}){
    return (
        <div className='flex justify-between mb-10'>
            <div className='flex gap-x-4'>
                <div className='w-2 h-ful rounded-2xl' style={{backgroundColor: color}}></div>
                <div>
                    <p className='text-[16px] pb-1 font-semibold text-[#121212FF]'>{title}</p>
                    <p className='text-[13px] text-[#71717A]'>{subject}</p>
                </div>
            </div>
            

            <div>
                <p className='text-[14px] text-[#121212FF]'>{date}</p>
                <p className='text-[13px] text-[#71717A]'>{time}</p>
            </div>
        </div>
    )
}

function UpcomingAssignment() {
  return (
    <div className='basis-[48%]'>
      <h1 className='text-[#121212FF] text-2xl font-bold'>Upcoming Assignments</h1>
      <p className='text-[14px] text-[#71717A] mb-10'>Assigments due in the next 3 days</p>

      <div>
        <AssigmentsCard color={"#3B82F6"} title={"Midterm Exam"} subject={"Introduction to Psychology"} date={"May 20"} time={"02:30 PM"}/>
        
        <AssigmentsCard color={"#A855F7"} title={"Group Project"} subject={"Business Ethics"} date={"May 25"} time={"11:59 PM"}/>

        <AssigmentsCard color={"#10B981"} title={"Programming Assignment"} subject={"Computer Science Fundamentals"} date={"May 18"} time={"11:59 PM"}/>

        <AssigmentsCard color={"#6366F1"} title={"Final Project"} subject={"World Literature"} date={"Jun 5"} time={"11:59 PM"}/>

        <AssigmentsCard color={"#F59E0B"} title={"Problem Set 4"} subject={"Calculus II"} date={"May 22"} time={"11:59 PM"}/>
      </div>

    </div>
  )
}

export default UpcomingAssignment
