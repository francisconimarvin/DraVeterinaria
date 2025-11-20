import React from 'react'
import Header from './components/Header.jsx'
import Services from './components/Services.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Scheduling from './components/Scheduling.jsx'
import Footer from './components/Footer.jsx'
import ThreeCarrusel from './three/ThreeCarrusel.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Login from './components/Login.jsx'


const App = () => {
  return (
      <div className='flex flex-col min-h-screen w-full overflow-hidden'>
      {/* Header visible siempre */}
      <Header />
       <main className="flex-grow">
      {/* Contenido de la página */}
      <Routes>
          {/* Cada ruta abre un componente distinto */}
          <Route path="/" element={<ThreeCarrusel />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/agendamiento"
            element={
              <ProtectedRoute>
                <Scheduling />
              </ProtectedRoute>
            }
          />
        </Routes>
        </main>

      {/* Footer visible siempre */}
      <Footer />
      </div>
      
    
  )
}

export default App
