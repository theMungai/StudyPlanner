import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck, faClock } from '@fortawesome/free-regular-svg-icons';
import UpcomingAssignment from './UpcomingAssignment';
import CourseProgress from './CourseProgress';

// Dashboard statistics
function DashboardStats({title, count, children}) {
  return (
    <div>
      <p className='text-[14px] text-[#71717A]'>{title}</p>
      <p className='flex items-center gap-x-1.5'>
        {children}
        <span className='text-[#121212FF] text-2xl font-bold'>{count}</span>
      </p>
    </div>
  )
}

function Dashboard() {
  const progressData = [
    { label: 'Introduction to Psychology', value: 67 },  
    { label: 'Business Ethics', value: 50 },            
    { label: 'Calculus II', value: 50},                 
    { label: 'Computer Science Fundamentals', value: 2 }, 
    { label: 'World Literature', value: 13},            
  ];

  return (
    <div className='basis-[84%]'>
      <h1 className='text-[#121212FF] text-3xl font-bold'>Dashboard</h1>
      <p className='text-[14px] text-[#71717A]'>Welcome back, John Doe</p>

      <div className='flex justify-between w-4/5 mt-13 mb-24'>
        <DashboardStats title={"Total courses"} count={5}>
          <FontAwesomeIcon icon={faBookOpen} className='text-[16px] text-[#0F766EFF]' />
        </DashboardStats>

        <DashboardStats title={"Completion Rate"} count={"40%"}>
          <FontAwesomeIcon icon={faCircleCheck} className='text-[16px] text-[#0F766EFF]' />
        </DashboardStats>

        <DashboardStats title={"Upcoming Assignments"} count={6}>
          <FontAwesomeIcon icon={faClock} className='text-[16px] text-[#F59E0B]' />
        </DashboardStats>

        <DashboardStats title={"Overdue"} count={6}>
          <FontAwesomeIcon icon={faCircleExclamation} className='text-[16px] text-[#EF4444]' />
        </DashboardStats>
      </div>

      <div className='flex p-6 gap-x-10'>
        <UpcomingAssignment />

        <div className="p-6 basis-[50%]">
          <h1 className="text-xl mb-4">Course Progress</h1>
          {progressData.map((item, index) => (
            <CourseProgress
              key={index}
              label={item.label}
              progress={item.value}
              trackColor={item.trackColor} 
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
