import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets.js'; 
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  // Leer el rol del usuario al montar el componente
  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
  }, []);

  // Deshabilitar scroll al abrir menú móvil
  useEffect(() => {
    document.body.style.overflow = showMobileMenu ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; }
  }, [showMobileMenu]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

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
        <Link to={role === "TUTOR" ? "/home" : "/admin"} className='py-3 cursor-pointer hover:text-gray-400'>Home</Link>
        <Link to="/" className='py-3 cursor-pointer hover:text-gray-400'>Sobre mí</Link>
        <Link to="/" className='py-3 cursor-pointer hover:text-gray-400'>Servicios</Link>
        <Link to="/" className='py-3 cursor-pointer hover:text-gray-400'>Contacto</Link>

        {/* Botón Agenda cita */}
        <Link 
          to="/agendamiento"
          className="px-5 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Agenda cita
        </Link>

        {/* Botón logout solo para TUTOR */}
        {role === "TUTOR" && (
          <button
            onClick={handleLogout}
            className="px-5 py-3 bg-red-500 hover:bg-red-600 text-white rounded"
          >
            Cerrar sesión
          </button>
        )}
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
          <Link to={role === "TUTOR" ? "/home" : "/admin"} onClick={() => setShowMobileMenu(false)} className='cursor-pointer hover:text-gray-400'>Home</Link>
          <Link to="/" onClick={() => setShowMobileMenu(false)} className='cursor-pointer hover:text-gray-400'>Sobre mí</Link>
          <Link to="/" onClick={() => setShowMobileMenu(false)} className='cursor-pointer hover:text-gray-400'>Servicios</Link>
          <Link to="/" onClick={() => setShowMobileMenu(false)} className='cursor-pointer hover:text-gray-400'>Contacto</Link>
          <hr className="border-zinc-500 my-2" />

          {/* Botón Agenda cita */}
          <Link 
            to="/agendamiento" 
            onClick={() => setShowMobileMenu(false)}
            className="mt-4 px-5 py-3 bg-blue-500 text-white rounded text-center block"
          >
            Agenda cita
          </Link>

          {/* Botón logout solo para TUTOR en móvil */}
          {role === "TUTOR" && (
            <button
              onClick={handleLogout}
              className="px-5 py-3 bg-red-500 hover:bg-red-600 text-white rounded mt-4"
            >
              Cerrar sesión
            </button>
          )}
        </ul>
      </div>

      {showMobileMenu && (
        <div className="fixed inset-0 bg-black opacity-50 z-40 md:hidden" onClick={() => setShowMobileMenu(false)}></div>
      )}
    </div>
  );
};

export default Navbar;
