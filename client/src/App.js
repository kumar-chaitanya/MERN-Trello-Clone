import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { BrowserRouter as Router } from 'react-router-dom'

import Dashboard from './Components/Dashboard'
import Navbar from './Components/Navbar'
import { AuthProvider } from './Contexts/Auth.context'

const useStyles = makeStyles({
  App: {
    height: '100vh',
    width: '100vw',
    backgroundColor: 'steelblue',
    background: 'no-repeat center center',
    backgroundImage: 'url(https://i.redd.it/v2cmfx8rbdv11.jpg)'
  }
})

function App() {
  const classes = useStyles()
  return (
    <Router>
      <AuthProvider>
        <div className={classes['App']}>
          <Navbar />
          <Dashboard />
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
