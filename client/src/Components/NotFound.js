import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  Container: {
    width: '50%',
    margin: '24px auto',
    padding: '8px',
    textAlign: 'center',
    background: '#ffffffd4',
    color: 'red'
  },
  Link: {
    textDecoration: 'none',
    color: 'blue',
    fontSize: '12px',
    fontWeight: 500,
    fontStyle: 'italic',
  }
})

const NotFound = () => {
  const classes = useStyles()
  return (
    <div className={classes['Container']}>
      <h1>404 - Not Found!</h1>
      <Link className={classes['Link']} to="/">
        Go Home ➡
      </Link>
    </div>
  )
}

export default NotFound