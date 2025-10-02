import React, { useState } from 'react'
import Header from './components/Header.jsx'
import Services from './components/Services.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Scheduling from './components/Scheduling.jsx'
import ProgressBar from './components/ProgressBar.jsx'

const App = () => {
  const [step, setStep] = useState(1) // 👈 aquí controlamos el paso

  return (
    <Router>
      <div className='w-full overflow-hidden'>
        <Routes>
          {/* Home */}
          <Route path="/" element={<><Header/><Services/></>} />

          {/* Agendamiento */}
          <Route 
            path="/agendamiento" 
            element={
              <>
                <Header/>
                <div className="max-w-xl mx-auto mt-10">
                  {/* Barra de progreso controlada desde App */}
                  <ProgressBar step={step} totalSteps={3} />
                  
                  {/* Pasamos setStep a Scheduling */}
                  <Scheduling step={step} setStep={setStep} />
                </div>
              </>
            } 
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
