import React from 'react'
import SidePanel from './SidePanel'
import TopBar from './TopBar'

function Layout({ children }) {
  return (
    <>
      <div className='flex w-full gap-x-8 p-6'>
        <SidePanel />
        
        <div className='basis-[84%]'>
        <TopBar/>
          {children}
        </div>
      </div>
      <footer className='w-full bg-[#121212FF] h-8 fixed bottom-0'></footer>
    </>
  )
}

export default Layout 