import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets.js'

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)

    useEffect(() => {
        if(showMobileMenu) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [showMobileMenu])
  return (
    <div className='absolute top-0 left-0 w-full z-10'>
        <div className='container mx-auto flex justify-between items-center px-6 py-4 md:px-20 lg:px-32 bg-transparent'>
            <img className='h-24 w-24 brightness-9' src={assets.logoPatita} alt="" />
            <ul className=''>
                <a href="#Header" className='cursor-pointer hover:text-gray-400'>Home</a>
                <a href="#Header" className='cursor-pointer hover:text-gray-400'>Sobre mí</a>
                <a href="#Header" className='cursor-pointer hover:text-gray-400'>Servicios</a>
                <a href="#Header" className='cursor-pointer hover:text-gray-400'>Contacto</a>
            </ul>
            <img className='md-hidden w-7 cursor-pointer' src={assets.logoMenu} alt="" />
            <img onClick={()=> setShowMobileMenu(true)} src={assets.menuLogo} alt="" className='md:hidden w-7 cursor-pointer'/>
        </div>

    </div>
  )
  

}

export default Navbar