import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets.js'
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [showMobileMenu])

  return (
    <div className='fixed top-0 left-0 w-full z-50'>
      {/* Fondo con blur */}
      <div className='backdrop-blur-md bg-white/70 dark:bg-gray-900/70 shadow-md'>
        <div className='container mx-auto flex justify-between items-center px-6 py-4 md:px-20 lg:px-32'>

          {/* LOGO */}
          <img
            className='h-16 w-16 transition-transform transform hover:scale-110 cursor-pointer'
            src={assets.logoPatita}
            alt="logo"
            onClick={() => navigate("/")}
          />

          {/* LINKS - ESCRITORIO */}
          <ul className='hidden md:flex gap-8 text-gray-700 dark:text-gray-200 font-medium items-center'>
            <li><a href="#Header" className='hover:text-blue-500 transition-colors'>Home</a></li>
            <li><a href="#about" className='hover:text-blue-500 transition-colors'>Sobre mí</a></li>
            <li><a href="#services" className='hover:text-blue-500 transition-colors'>Servicios</a></li>
            <li><a href="#contact" className='hover:text-blue-500 transition-colors'>Contacto</a></li>
            <button
              onClick={() => navigate("/agendamiento")}
              className="px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all"
            >
              Agenda cita
            </button>
          </ul>

          {/* BOTÓN MENÚ MÓVIL */}
          <img
            onClick={() => setShowMobileMenu(true)}
            src={assets.logoMenu}
            alt="menu"
            className='md:hidden w-7 cursor-pointer'
          />
        </div>
      </div>

      {/* MENÚ MÓVIL */}
      {showMobileMenu && (
        <div className='fixed inset-0 bg-white dark:bg-gray-900 flex flex-col items-center justify-center gap-8 text-lg font-semibold transition-all duration-300'>
          
          {/* BOTÓN CERRAR */}
          <button
            onClick={() => setShowMobileMenu(false)}
            className="absolute top-6 right-6 text-3xl font-bold text-gray-600 dark:text-gray-300"
          >
            ✕
          </button>

          <a href="#Header" onClick={() => setShowMobileMenu(false)} className="hover:text-blue-500">Home</a>
          <a href="#about" onClick={() => setShowMobileMenu(false)} className="hover:text-blue-500">Sobre mí</a>
          <a href="#services" onClick={() => setShowMobileMenu(false)} className="hover:text-blue-500">Servicios</a>
          <a href="#contact" onClick={() => setShowMobileMenu(false)} className="hover:text-blue-500">Contacto</a>
          <button
            onClick={() => {
              setShowMobileMenu(false);
              navigate("/agendamiento")
            }}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all"
          >
            Agenda cita
          </button>
        </div>
      )}
    </div>
  )
}

export default Navbar
