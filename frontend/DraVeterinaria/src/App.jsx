import React from 'react'
import Header from './components/Header.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Services from './components/Services.jsx'


const App = () => {
  return (
    <div className='w-full overflow-hidden'>
      <Header/>
      <Services/>
      <Router>
        <Routes>
          <Route>
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App