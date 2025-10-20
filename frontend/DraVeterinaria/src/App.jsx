import React from 'react'
import Header from './components/Header.jsx'
import Services from './components/Services.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Scheduling from './components/Scheduling.jsx'
import Footer from './components/Footer.jsx'
import ThreeCarrusel from './three/ThreeCarrusel.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

const App = () => {
  return (
      <div className='w-full overflow-hidden'>
        <Routes>
          <Route path="/" element={<><Header/><ThreeCarrusel/><Footer/></>}/>
          <Route path="/agendamiento" element={<><Header/><Scheduling/><Footer/></>}/>
        </Routes>
      </div>
      
    
  )
}

export default App
