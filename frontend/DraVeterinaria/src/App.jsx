import React from 'react'
import Header from './components/Header.jsx'
import Services from './components/Services.jsx'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Scheduling from './components/Scheduling.jsx'
import Footer from './components/Footer.jsx'
import ThreeCarrusel from './three/ThreeCarrusel.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Login from './components/Login.jsx'
import AdminDashboard from './components/AdminDashboard.jsx'

const App = () => {
  return (
    <div className='flex flex-col min-h-screen w-full overflow-hidden'>
      <Header />

      <main className="flex-grow">
        <Routes>

         
          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/login" element={<Login />} />

          {/* Pagina Tutor */}
          <Route
            path="/home"
            element={
              <ProtectedRoute role="TUTOR">
                <ThreeCarrusel />
              </ProtectedRoute>
            }
          />

          <Route
  path="/agendamiento"
  element={
    <ProtectedRoute>
      <Scheduling />
    </ProtectedRoute>
  }
/>


          {/* Pagina Admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="ADMIN">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
