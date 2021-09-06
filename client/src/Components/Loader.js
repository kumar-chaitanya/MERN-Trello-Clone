import React from 'react'
import { CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'


const useStyles = makeStyles({
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%'
  }
})

const Loader = () => {
  const classes = useStyles()
  return (
    <CircularProgress className={classes['loader']} size={75} color="secondary" />
  )
}

export default Loader