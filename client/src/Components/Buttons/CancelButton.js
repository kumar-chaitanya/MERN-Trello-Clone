import React from 'react'
import { Cancel } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'

const useStyle = makeStyles({
  'cancelIcon': {
    color: 'red',
    width: '16px',
    height: '16px',
    cursor: 'pointer'
  }
})

export default function CancelButton(props) {
  const classes = useStyle()

  return (
    <span {...props}>
      <Cancel className={classes['cancelIcon']} />
    </span>
  )
}