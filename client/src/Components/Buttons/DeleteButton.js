import React from 'react'
import { DeleteOutlined } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'

const useStyle = makeStyles({
  'deleteIcon': {
    color: 'red',
    width: '16px',
    height: '16px',
    cursor: 'pointer'
  }
})

export default function DeleteButton(props) {
  const classes = useStyle()

  return (
    <span {...props}>
      <DeleteOutlined className={classes['deleteIcon']} />
    </span>
  )
}