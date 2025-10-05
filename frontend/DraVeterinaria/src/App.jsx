import React from 'react' 
import Header from './components/Header.jsx'
import Services from './components/Services.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Scheduling from './components/Scheduling.jsx'


const App = () => {
  
 
  return (
  
      <div className='w-full overflow-hidden'>
        <Routes> 
          <Route path="/" element={<><Header/><Services/></>} />
          <Route path="/agendamiento" element={<><Header/><Scheduling /></>} /> 
        </Routes>
      </div>
    
  )
}

export default App
