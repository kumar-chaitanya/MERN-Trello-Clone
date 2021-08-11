import React from 'react'
import { Edit } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'

const useStyle = makeStyles({
  'editIcon': {
    color: 'green',
    width: '16px',
    height: '16px',
    cursor: 'pointer'
  }
})

export default function EditButton(props) {
  const classes = useStyle()

  return (
    <span {...props}>
      <Edit className={classes['editIcon']} />
    </span>
  )
}