import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

function TopBar() {
  return (
    <div className='w-full h-12 flex justify-end items-center pr-4 '>
      <div className='w-[22px] relative'>
        <FontAwesomeIcon icon={faBell} className='text-xl text-gray-700' />
        <div className='absolute -top-3 -right-2 bg-[#0D9488] rounded-full w-[18px] h-[18px] flex items-center justify-center text-white text-xs font-bold shadow'>
          2
        </div>
      </div>
    </div>
  )
}

export default TopBar

