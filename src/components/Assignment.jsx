import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCirclePlus, faFilter, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import tasks from './Tasks'; // Assumes tasks.js exports an array
import SidePanel from './SidePanel';

function getStatusClass(status) {
  switch (status) {
    case "Completed":
      return "text-[#166534] bg-[#BBF7D0] font-semibold rounded-full";
    case "Pending":
      return "text-[#92400E] bg-[#FDE68A] rounded-full font-semibold";
    case "In Progress":
      return "text-[#1E40AF] font-semibold rounded-full";
    default:
      return "";
  }
}

function Assignment() {
  return (
    <>
        <div className="AssignmentPage flex py-8 px-7">
        <SidePanel/>
        <div className=' basis-[80%]'>
        
        <div className="assignments-header flex items-center justify-between mb-14">
            <div>
                <h1 className='text-[#121212FF] text-2xl font-bold'>Assignments</h1>
                <p className='text-[14px] text-[#71717A]'>Manage your assignments</p>
            </div>
            <button className='cursor-pointer flex items-center gap-x-4 bg-[#0F766EFF] text-white py-2.5 px-4 rounded-[6px]'>
                <FontAwesomeIcon icon={faCirclePlus} />
                Add New Assignment
            </button>
        </div>

        <div className="assignment-body p-6">
            <div className='w-full flex justify-between items-center p-4 mb-6'>
            <h1 className='font-medium'>All Assignments</h1>
            <div className='flex items-center gap-x-8'>
                <div className='flex gap-x-4 items-center'>
                <FontAwesomeIcon icon={faFilter} className='text-[#71717A]' />
                <select>
                    <option value="All Courses">All Courses</option>
                    <option value="Introduction to Psychology">Introduction to Psychology</option>
                    <option value="Business Ethics">Business Ethics</option>
                    <option value="Calculus II">Calculus II</option>
                    <option value="Computer Science Fundamentals">Computer Science Fundamentals</option>
                    <option value="World Literature">World Literature</option>
                </select>
                </div>

                <select>
                <option value="All Statuses">All Statuses</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                </select>

                <FontAwesomeIcon icon={faBars} className='bg-[#0F766EFF] text-white p-2.5 text-2xl rounded-[6px]' />
            </div>
            </div>

            <table className='w-full'>
            <thead>
                <tr className='text-[#71717A] text-[14px] text-left font-light'>
                <th className='pb-6'>Title</th>
                <th className='pb-6'>Course</th>
                <th className='pb-6'>Due Date</th>
                <th className='pb-6'>Status</th>
                <th className='pb-6'>Actions</th>
                </tr>
            </thead>

            <tbody>
                {tasks.map((task, index) => (
                <tr key={index} className=''>
                    <td className='py-6'>{task.title}</td>
                    <td className='py-6'>{task.course}</td>
                    <td className='py-6'>{task.dueDate}</td>
                    <td> <span className={`cursor-pointer text-center py-2.5 px-10 w-4/5 ${getStatusClass(task.status)}`}>{task.status}</span></td>
                    <td className='py-6'>
                    <FontAwesomeIcon icon={faPenToSquare} className='cursor-pointer' />
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
        </div>
        <footer className='w-full bg-[#121212FF] h-8'></footer>
    </>
    
    
  );
}

export default Assignment;
