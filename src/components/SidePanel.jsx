import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGrip, faBookOpen, faCalculator, faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';

function SidePanel() {
  const location = useLocation();

  const navItems = [
    { to: '/dashboard', icon: faGrip, label: 'Dashboard' },
    { to: '/assignments', icon: faBookOpen, label: 'Assignments' },
    { to: '/grade-calculator', icon: faCalculator, label: 'Grade Calculator' },
    { to: '/settings', icon: faGear, label: 'Settings' },
  ];

  return (
    <div className='basis-[16%] relative px-4 py-6'>
      <h1 className='font-bold text-2xl text-[#0F766EFF] mb-6'>StudyPlanner</h1>
      <nav>
        <ul>
          {navItems.map(({ to, icon, label }) => {
            const isActive = location.pathname === to;
            return (
              <li
                key={to}
                className={`text-sm ${isActive ? 'text-[#0F766EFF]' : 'text-[#71717A]'} hover:text-[#0F766EFF] focus:text-[#0F766EFF] cursor-pointer my-1.5 p-2.5`}
              >
                <Link to={to} className='flex items-center'>
                  <FontAwesomeIcon icon={icon} className='mx-3' />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <button className='text-sm text-[#71717A] cursor-pointer absolute bottom-5'>
        <Link to="/" className='flex items-center'>
          <FontAwesomeIcon icon={faRightFromBracket} className='mx-3' />
          Logout
        </Link>
      </button>
    </div>
  );
}

export default SidePanel;
