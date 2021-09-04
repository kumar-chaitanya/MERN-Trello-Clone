import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  'error': {
    width: '600px',
    margin: '12px auto',
    background: 'red',
    color: 'white',
    padding: '12px',
    fontSize: '14px',
    textAlign: 'center',
    wordSpacing: '2px'
  }
})

const Error = ({ message }) => {
  const classes = useStyles()
  return (
    <p className={classes['error']}>{message}</p>
  )
}

export default Error