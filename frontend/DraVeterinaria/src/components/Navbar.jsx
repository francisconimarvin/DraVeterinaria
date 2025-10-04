import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets.js'
import { useNavigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import Login from './Login.jsx';
import Logout from './Logout.jsx';

const Navbar = () => {
    const navigate = useNavigate();
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const { isAuthenticated } = useAuth0();
  

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
        <div className='container mx-auto flex justify-between items-center px-6 py-4 md:px-20 lg:px-32 bg-transparent gap-4'>
            <img className='h-24 w-24 brightness-9 transition-transform transform hover:scale-105 cursor-pointer' src={assets.logoPatita} alt="" />
            <ul className='hidden md:flex gap-7'>
                <a onClick={() => navigate("/")} href="#Header" className='py-3 cursor-pointer hover:text-gray-400'>Home</a>
                <a href="#Header" className='py-3 cursor-pointer hover:text-gray-400'>Sobre mí</a>
                <a href="#Header" className='py-3 cursor-pointer hover:text-gray-400'>Servicios</a>
                <a href="#Header" className='py-3 cursor-pointer hover:text-gray-400'>Contacto</a>
                {isAuthenticated && <Logout />}
                {!isAuthenticated && <Login />}
                <button className="px-5 py-3 bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white border border-blue-500 hover:border-transparent rounded" onClick={() => navigate("/agendamiento")}>Agenda cita</button>
            </ul>
            <img onClick={()=> setShowMobileMenu(true)} src={assets.logoMenu} alt="" className='md:hidden w-7 cursor-pointer'/>
        </div>

    </div>
  )
  

}

export default Navbar