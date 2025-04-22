import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGrip,faBookOpen,faCalculator,faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
function SidePanel() {
  return (
    <div className='border basis-[20%]'>
      <h1 className='font-bold text-2xl text-[#0F766EFF]'>StudyPlanner</h1>
      <nav>
        <ul>
            <li className='text-sm text-[#71717A] hover:text-[#0F766EFF] cursor-pointer my-1.5 p-2.5'>
                <FontAwesomeIcon icon={faGrip} className='mx-3'/>
                Dashboard
            </li>

            <li className='text-sm text-[#71717A] hover:text-[#0F766EFF] cursor-pointer my-1.5 p-2.5'>
                <FontAwesomeIcon icon={faBookOpen} className='mx-3' />
                Assignments
            </li>

            <li className='text-sm text-[#71717A] hover:text-[#0F766EFF] cursor-pointer my-1.5 p-2.5'>
                <FontAwesomeIcon icon={faCalculator} className='mx-3' />
                Calculator
            </li>

            <li className='text-sm text-[#71717A] hover:text-[#0F766EFF] cursor-pointer my-1.5 p-2.5'>
                <FontAwesomeIcon icon={faGear} className='mx-3'/>
                Settings
            </li>

        </ul>
      </nav>
      <button className='text-sm text-[#71717A] cursor-pointer'>
        <FontAwesomeIcon icon={faRightFromBracket} className='mx-3'/>
        Logout
      </button>
    </div>
  )
}

export default SidePanel
