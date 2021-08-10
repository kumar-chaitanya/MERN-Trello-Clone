import React from 'react'
import { CheckCircle } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'

const useStyle = makeStyles({
  'checkIcon': {
    color: 'green',
    width: '16px',
    height: '16px',
    cursor: 'pointer'
  }
})

export default function CheckButton(props) {
  const classes = useStyle()

  return (
    <span {...props}>
      <CheckCircle className={classes['checkIcon']} />
    </span>
  )
}