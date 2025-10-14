import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  // Handlers para navegación
  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0); // Lleva al inicio de la nueva vista
  };

  return (
    <footer className="bg-zinc-900 text-gray-200 mt-auto">
      {/* Grid principal */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-8 py-10 text-center md:text-left">
        {/* Sección Nosotros */}
        <div>
          <h5 className="uppercase font-bold mb-4 text-lg">Nosotros</h5>
          <ul className="space-y-2">
            <li
              onClick={() => handleNavigation("/sobre-nosotros")}
              className="cursor-pointer hover:text-gray-400 transition-colors"
            >
              Quiénes somos
            </li>
            <li
              onClick={() => handleNavigation("/mision")}
              className="cursor-pointer hover:text-gray-400 transition-colors"
            >
              Misión y visión
            </li>
            <li
              onClick={() => handleNavigation("/equipo")}
              className="cursor-pointer hover:text-gray-400 transition-colors"
            >
              Equipo
            </li>
          </ul>
        </div>

        {/* Sección Servicios */}
        <div>
          <h5 className="uppercase font-bold mb-4 text-lg">Servicios</h5>
          <ul className="space-y-2">
            <li
              onClick={() => handleNavigation("/agendamiento")}
              className="cursor-pointer hover:text-gray-400 transition-colors"
            >
              Consultas
            </li>
            <li
              onClick={() => handleNavigation("/agendamiento")}
              className="cursor-pointer hover:text-gray-400 transition-colors"
            >
              Reservas
            </li>
          </ul>
        </div>

        {/* Sección Contacto */}
        <div>
          <h5 className="uppercase font-bold mb-4 text-lg">Contacto</h5>
          <ul className="space-y-2">
            <li
              onClick={() => alert("Email: contacto@draveterinaria.cl")}
              className="cursor-pointer hover:text-gray-400 transition-colors"
            >
              Email
            </li>
            <li
              onClick={() => alert("Teléfono: +56 9 1234 5678")}
              className="cursor-pointer hover:text-gray-400 transition-colors"
            >
              Teléfono
            </li>
            <li
            onClick={() => window.open("https://www.instagram.com/draveronica.veterinaria?igsh=N2x4MG90eTZnZTZ6", "_blank")}
            className="cursor-pointer hover:text-gray-400 transition-colors"
            >
            Redes Sociales
            </li>
          </ul>
        </div>
      </div>

      {/* Línea divisoria */}
      <hr className="border-zinc-700 mx-8" />

      {/* Copyright */}
      <div className="text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} DraVeterinaria — Todos los derechos reservados
      </div>
    </footer>
  );
};

export default Footer;
