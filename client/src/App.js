import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import "./App.css"
import Dashboard from './Components/Dashboard'
import Navbar from './Components/Navbar'
import { AuthProvider } from './Contexts/Auth.context'


function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Navbar />
          <Dashboard />
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
