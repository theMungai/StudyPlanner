import React from 'react'
import SidePanel from './SidePanel'
import Dashboard from './Dashboard'

function HomePage() {
  return (
    <div className='flex w-full gap-x-8 p-6'>
      <SidePanel/>
      <Dashboard/>
      
    </div>
  )
}

export default HomePage
