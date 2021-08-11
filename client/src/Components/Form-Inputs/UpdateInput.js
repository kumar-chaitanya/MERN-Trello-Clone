import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'

import CancelButton from '../Buttons/CancelButton'
import CheckButton from '../Buttons/CheckButton'

const useStyle = makeStyles({
  'UpdateContainer': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: '4px',
    '& > span': {
      width: '50px',
      display: 'flex',
      justifyContent: 'space-between',
    },
    '& > input': {
      width: '100%',
      height: '25px',
      padding: '4px',
      lineHeight: '1.4em',
      border: 'none',
      outline: 'none',
      background: 'transparent',
      borderBottom: 'green solid 1px'
    }
  }
})

export default function UpdateInput(props) {
  const [input, setInput] = useState(props.value)
  const classes = useStyle()

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const handleCheck = () => {
    props.handleCheck(input)
  }

  return (
    <div className={classes['UpdateContainer']}>
      <input type="text" onChange={handleInputChange} value={input} autoFocus />
      <span>
        <CheckButton onClick={handleCheck} />
        <CancelButton onClick={props.handleCancel} />
      </span>
    </div>
  )
}