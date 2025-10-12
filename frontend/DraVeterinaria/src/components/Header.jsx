import React from 'react'
import Navbar from './Navbar'

const Header = () => {
  return (
    <div className='text-amber-100 mb-4 bg-zinc-800 sticky top-0 z-50 flex items-center w-full overflow-hidden py-2' 
      id='Header'>

      <Navbar/>
    </div>
  )
}

export default Header