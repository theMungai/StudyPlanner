import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGrip,faBookOpen,faCalculator,faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function SidePanel() {
  return (
    <div className=' basis-[16%] relative'>
      <h1 className='font-bold text-2xl text-[#0F766EFF]'>StudyPlanner</h1>
      <nav>
        <ul>
            <li className='text-sm text-[#71717A] hover:text-[#0F766EFF] cursor-pointer my-1.5 p-2.5'>
                <Link to="/dashboard" className='flex items-center'>
                    <FontAwesomeIcon icon={faGrip} className='mx-3'/>
                    Dashboard
                </Link>
            </li>

            <li className='text-sm text-[#71717A] hover:text-[#0F766EFF] cursor-pointer my-1.5 p-2.5'>
                <Link to="/assignments" className='flex items-center'>
                    <FontAwesomeIcon icon={faBookOpen} className='mx-3' />
                    Assignments
                </Link>
            </li>

            <li className='text-sm text-[#71717A] hover:text-[#0F766EFF] cursor-pointer my-1.5 p-2.5'>
                <Link to="/grade-calculator" className='flex items-center'>
                    <FontAwesomeIcon icon={faCalculator} className='mx-3' />
                    Grade Calculator
                </Link>
            </li>

            <li className='text-sm text-[#71717A] hover:text-[#0F766EFF] cursor-pointer my-1.5 p-2.5'>
              <Link to="/settings" className='flex items-center'>
                  <FontAwesomeIcon icon={faGear} className='mx-3'/>
                  Settings
              </Link>
            </li>
        </ul>
      </nav>
      <button className='text-sm text-[#71717A] cursor-pointer absolute bottom-5'>
        <Link to="/">
          <FontAwesomeIcon icon={faRightFromBracket} className='mx-3'/>
          Logout
        </Link>
        
      </button>
    </div>
  )
}

export default SidePanel
