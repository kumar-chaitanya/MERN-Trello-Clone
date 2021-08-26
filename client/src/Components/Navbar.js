import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

import { AuthContext } from '../Contexts/Auth.context'

const useStyles = makeStyles({
  navbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navList: {
    '& *': {
      margin: '0 12px',
      cursor: 'pointer',
      textDecoration: 'none',
      color: 'white'
    },
  }
})

function Navbar() {
  const classes = useStyles()
  const { authLoading, isAuthenticated, user, logout } = useContext(AuthContext)

  let navList = null

  if (authLoading) {
    navList = <Typography>Loading...</Typography>
  } else if (!authLoading && isAuthenticated) {
    navList = <>
      <Typography>{user.username}</Typography>
      <Typography>
        <Link to="/projects">My Projects</Link>
      </Typography>
      <Typography onClick={logout}>Signout</Typography>
    </>
  } else {
    navList = <>
      <Typography>
        <Link to="/register">Register</Link>
      </Typography>
      <Typography>
        <Link to="/login">Login</Link>
      </Typography>
    </>
  }

  return (
    <AppBar position="static" className={classes.navbar}>
      <Toolbar>
        <Typography variant="h5">Trello Clone</Typography>
      </Toolbar>
      <Toolbar className={classes.navList}>
        {navList}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar