import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'

import CancelButton from '../Buttons/CancelButton'
import CheckButton from '../Buttons/CheckButton'

const useStyle = makeStyles({
  'UpdateContainer': {
    position: 'relative',
    width: '100%',
    '& > span': {
      position: 'absolute',
      width: '40px',
      display: 'flex',
      justifyContent: 'space-between',
      bottom: '10px',
      right: '10px'
    },
    '& > textarea': {
      width: '100%',
      padding: '8px',
      lineHeight: '1.4em',
      border: 'none',
      resize: 'none',
      outline: 'none'
    },
    '& > textarea:focus': {
      outline: 'solid green 1px'
    }
  }
})

export default function UpdateArea(props) {
  const [input, setInput] = useState(props.value)
  const classes = useStyle()

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const handleCheck = () => {
    console.log('Click');
    props.handleCheck(input)
  }

  return (
    <div className={classes['UpdateContainer']}>
      <textarea onChange={handleInputChange} rows={8} defaultValue={input} autoFocus>
      </textarea>
      <span>
        <CheckButton onClick={handleCheck} />
        <CancelButton onClick={props.handleCancel} />
      </span>
    </div>
  )
}