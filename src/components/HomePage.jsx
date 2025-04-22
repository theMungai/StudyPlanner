import React from 'react'
import SidePanel from './SidePanel'
import Dashboard from './Dashboard'

function HomePage() {
  return (
    <>
        <div className='flex w-full gap-x-8 p-6'>
            <SidePanel/>
            <Dashboard/>
        </div>
        <footer className='w-full bg-[#121212FF] h-8'></footer>
    </>

    
  )
}

export default HomePage
