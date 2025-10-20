
import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets.js'; 
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Login from './Login.jsx';
import Logout from './Logout.jsx';

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isAuthenticated } = useAuth0();

  // Deshabilitar scroll al abrir menú móvil
  useEffect(() => {
    document.body.style.overflow = showMobileMenu ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; }
  }, [showMobileMenu]);

  return (
    <div className='container mx-auto flex justify-between items-center px-6 md:px-20 lg:px-32 bg-transparent gap-4 w-full'>
      
      {/* Logo */}
      <Link to="/">
        <img 
          className='h-12 w-12 brightness-9 transition-transform transform hover:scale-105 cursor-pointer z-50' 
          src={assets.logoPatita} 
          alt="Logo" 
        />
      </Link>

      {/* Menú escritorio */}
      <ul className='hidden md:flex gap-7 items-center'> 
        <Link to="/" className='py-3 cursor-pointer hover:text-gray-400'>Home</Link>
        <Link to="/" className='py-3 cursor-pointer hover:text-gray-400'>Sobre mí</Link>
        <Link to="/" className='py-3 cursor-pointer hover:text-gray-400'>Servicios</Link>
        <Link to="/" className='py-3 cursor-pointer hover:text-gray-400'>Contacto</Link>
        {isAuthenticated ? <Logout /> : <Login />}
        <Link to="/agendamiento">
          <button className="px-5 py-3 bg-transparent hover:bg-blue-500 text-blue-300 hover:text-white border border-blue-300 hover:border-transparent rounded">
            Agenda cita
          </button>
        </Link>
      </ul>

      {/* Menú móvil */}
      <div className='md:hidden w-7 h-7 cursor-pointer z-[60]'>
        {!showMobileMenu && (
          <img onClick={() => setShowMobileMenu(true)} src={assets.logoMenu} alt="Menú" className='w-full h-full'/>
        )}
        {showMobileMenu && (
          <div onClick={() => setShowMobileMenu(false)} className='flex items-center justify-center w-full h-full text-3xl font-bold text-amber-100'>
            &times;
          </div>
        )}
      </div>

      <div className={`fixed top-0 right-0 h-full w-64 bg-zinc-700 p-6 shadow-xl transition-transform transform ${showMobileMenu ? 'translate-x-0' : 'translate-x-full'} md:hidden z-50`}>
        <ul className='flex flex-col gap-6 mt-16 text-xl'>
          <Link to="/" onClick={() => setShowMobileMenu(false)} className='cursor-pointer hover:text-gray-400'>Home</Link>
          <Link to="/" onClick={() => setShowMobileMenu(false)} className='cursor-pointer hover:text-gray-400'>Sobre mí</Link>
          <Link to="/" onClick={() => setShowMobileMenu(false)} className='cursor-pointer hover:text-gray-400'>Servicios</Link>
          <Link to="/" onClick={() => setShowMobileMenu(false)} className='cursor-pointer hover:text-gray-400'>Contacto</Link>
          <hr className="border-zinc-500 my-2" />
          {isAuthenticated ? <Logout /> : <Login />}
          <Link to="/agendamiento" onClick={() => setShowMobileMenu(false)}>
            <button className="mt-4 px-5 py-3 bg-blue-500 text-white rounded">Agenda cita</button>
          </Link>
        </ul>
      </div>

      {showMobileMenu && (
        <div className="fixed inset-0 bg-black opacity-50 z-40 md:hidden" onClick={() => setShowMobileMenu(false)}></div>
      )}
    </div>
  );
};

export default Navbar;
