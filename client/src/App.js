import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import "./App.css"
import Dashboard from './Components/Dashboard'
import Navbar from './Components/Navbar'


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Dashboard />
      </div>
    </Router>
  )
}

export default App
