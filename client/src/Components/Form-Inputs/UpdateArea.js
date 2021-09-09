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
      height: '80px',
      padding: '8px',
      lineHeight: '1.4em',
      border: 'none',
      resize: 'none',
      outline: 'none'
    },
    '& > textarea:focus': {
      outline: 'solid green 1px'
    },
    '& > textarea::-webkit-scrollbar-thumb': {
      backgroundColor: '#7775',
      '&:hover': {
        backgroundColor: '#7773'
      }
    },
    '& > textarea::-webkit-scrollbar': {
      width: '4px',
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
    props.handleCheck(input)
  }

  return (
    <div className={classes['UpdateContainer']}>
      <textarea onChange={handleInputChange} defaultValue={input} autoFocus>
      </textarea>
      <span>
        <CheckButton onClick={handleCheck} />
        <CancelButton onClick={props.handleCancel} />
      </span>
    </div>
  )
}