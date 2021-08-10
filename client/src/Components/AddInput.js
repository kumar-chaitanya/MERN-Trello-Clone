import React, { useState } from 'react'

export default function AddInput(props) {
  const [input, setInput] = useState('')

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const handleButtonClick = () => {
    props.btnClick(input)
    setInput('')
  }

  return (
    <div>
      <input type="text" value={input} onChange={handleInputChange} placeholder={props.placeholder} />
      <button onClick={handleButtonClick}>{props.btnText}</button>
    </div>
  )
}