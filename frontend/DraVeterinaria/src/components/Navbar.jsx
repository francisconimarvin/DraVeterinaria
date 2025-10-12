import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets.js'; // Asegúrate de que 'assets' contiene 'logoPatita' y 'logoMenu'
import { useNavigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import Login from './Login.jsx';
import Logout from './Logout.jsx';

const Navbar = () => {
    const navigate = useNavigate();
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const { isAuthenticated } = useAuth0();
    
    // Efecto para deshabilitar/habilitar el scroll del cuerpo al abrir/cerrar el menú móvil
    useEffect(() => {
        if (showMobileMenu) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [showMobileMenu]);

    // Función para manejar el clic en un enlace (cierra el menú y navega)
    const handleLinkClick = (path = "/") => {
        setShowMobileMenu(false);
        navigate(path);
    };

    return (
        // Contenedor principal de la navegación (ya no es 'absolute')
        <div className='container mx-auto flex justify-between items-center px-6 md:px-20 lg:px-32 bg-transparent gap-4 w-full'>

            {/* Logo (Ajustado a h-12 w-12 para menor altura) */}
            <img 
                className='h-12 w-12 brightness-9 transition-transform transform hover:scale-105 cursor-pointer z-50' 
                src={assets.logoPatita} 
                alt="Logo" 
                onClick={() => navigate("/")} 
            />

            {/* Menú Principal (Escritorio: Visible; Móvil: Oculto) */}
            <ul className='hidden md:flex gap-7 items-center'> 
                <a onClick={() => navigate("/")} href="#Header" className='py-3 cursor-pointer hover:text-gray-400'>Home</a>
                <a href="#Header" className='py-3 cursor-pointer hover:text-gray-400'>Sobre mí</a>
                <a href="#Header" className='py-3 cursor-pointer hover:text-gray-400'>Servicios</a>
                <a href="#Header" className='py-3 cursor-pointer hover:text-gray-400'>Contacto</a>
                {isAuthenticated && <Logout />}
                {!isAuthenticated && <Login />}
                <button 
                    className="px-5 py-3 bg-transparent hover:bg-blue-500 text-blue-300 hover:text-white border border-blue-300 hover:border-transparent rounded" 
                    onClick={() => navigate("/agendamiento")}
                >
                    Agenda cita
                </button>
            </ul>
            
            {/* Lógica del Ícono de Menú (Hamburguesa ) */}
            <div className='md:hidden w-7 h-7 cursor-pointer z-[60]'> 
                {/* Ícono de HAMBURGUESA (Muestra cuando el menú está CERRADO) */}
                {!showMobileMenu && (
                    <img 
                        onClick={() => setShowMobileMenu(true)} 
                        src={assets.logoMenu} 
                        alt="Menú" 
                        className='w-full h-full'
                    />
                )}

                {/* Ícono de CERRAR 'X' (Muestra cuando el menú está ABIERTO) */}
                {showMobileMenu && (
                    <div 
                        onClick={() => setShowMobileMenu(false)} 
                        // Aseguramos que la 'X' es del color de texto del header (text-amber-100)
                        className='flex items-center justify-center w-full h-full text-3xl font-bold text-amber-100'
                    >
                        {/* &times es una x en html, esto hará que se muestre una x para cerrar*/} 
                        &times; 
                    </div>
                )}
            </div>

            {/* Menú Móvil / Off-Canvas */}
            <div 
                // Mantenemos el menú ligeramente por debajo del ícono de la X
                className={`fixed top-0 right-0 h-full w-64 bg-zinc-700 p-6 shadow-xl transition-transform transform ${
                    showMobileMenu ? 'translate-x-0' : 'translate-x-full'
                } md:hidden z-50`} // <-- Mantenemos z-50
            >
                
                {/* Lista de Enlaces Móviles */}
                <ul className='flex flex-col gap-6 mt-16 text-xl'>
                    {/* Al hacer clic, se usa handleLinkClick para cerrar el menú y navegar */}
                    <a onClick={() => handleLinkClick("/")} href="#Header" className='cursor-pointer hover:text-gray-400'>Home</a>
                    <a onClick={() => handleLinkClick()} href="#Header" className='cursor-pointer hover:text-gray-400'>Sobre mí</a>
                    <a onClick={() => handleLinkClick()} href="#Header" className='cursor-pointer hover:text-gray-400'>Servicios</a>
                    <a onClick={() => handleLinkClick()} href="#Header" className='cursor-pointer hover:text-gray-400'>Contacto</a>
                    <hr className="border-zinc-500 my-2" />
                    {isAuthenticated && <Logout />}
                    {!isAuthenticated && <Login />}
                    <button 
                        className="mt-4 px-5 py-3 bg-blue-500 text-white rounded" 
                        onClick={() => handleLinkClick("/agendamiento")}
                    >
                        Agenda cita
                    </button>
                </ul>
            </div>
            
            {/* Overlay Oscuro (Se muestra cuando el menú está abierto) */}
            {showMobileMenu && (
                <div 
                    className="fixed inset-0 bg-black opacity-50 z-40 md:hidden" // z-40 para estar debajo del menú (z-50)
                    onClick={() => setShowMobileMenu(false)}
                ></div>
            )}
        </div>
    );
};

export default Navbar;