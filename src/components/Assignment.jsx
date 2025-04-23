import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCirclePlus, faFilter, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import tasks from './Tasks'; // Assumes tasks.js exports an array
import Layout from './Layout';

function getStatusClass(status) {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-700";
    case "Pending":
      return "bg-red-100 text-red-700";
    case "In Progress":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

function Assignment() {
  
      return (<Layout>
    <>
        
        <div className=' space-y-6'>
        
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

            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {tasks.map((task, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {task.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {task.course}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {task.dueDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`inline-block text-center px-4 py-1 rounded-full ${getStatusClass(task.status)}`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <FontAwesomeIcon icon={faPenToSquare} className="text-gray-600 hover:text-teal-600 cursor-pointer" />
                    </td>
                  </tr>
                ))}
              </tbody>
          </table>

        </div>
        </div>
        
    </>
    
  </Layout>  
  )
  
  
}

export default Assignment;
