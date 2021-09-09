import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  Container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '250px',
    height: '100px',
    margin: '0 16px',
    padding: '8px',
    background: 'white',
    borderRadius: '4px'
  },
  Input: {
    width: '100%',
    fontSize: '16px',
    padding: '4px 12px',
    outline: 'none',
    border: 'none',
    '&:focus': {
      borderBottom: '2px solid rgb(33,0,61)'
    }
  },
  Button: {
    outline: 'none',
    border: 'none',
    color: 'white',
    background: 'linear-gradient(90deg, rgba(46,0,86,0.919502835313813) 0%, rgba(116,9,121,0.9363095580028886) 50%, rgba(137,0,200,0.919502835313813) 100%)',
    cursor: 'pointer',
    borderRadius: '4px',
    width: '90%',
    padding: '2px 4px',
    margin: '0 auto',
    fontSize: '16px'
  }
})

export default function AddInput(props) {
  const classes = useStyles()
  const [input, setInput] = useState('')

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const handleButtonClick = () => {
    props.btnClick(input)
    setInput('')
  }

  return (
    <div className={classes['Container']}>
      <input className={classes['Input']} type="text" value={input} onChange={handleInputChange} placeholder={props.placeholder} />
      <button className={classes['Button']} onClick={handleButtonClick}>{props.btnText}</button>
    </div>
  )
}