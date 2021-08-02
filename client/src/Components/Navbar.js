import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

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

  return (
    <AppBar position="static" className={classes.navbar}>
      <Toolbar>
        <Typography variant="h5">Trello Clone</Typography>
      </Toolbar>
      <Toolbar className={classes.navList}>
        <Typography>
          <Link to="/projects">My Projects</Link>
        </Typography>
        <Typography>
          <Link to="/">Signout</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar