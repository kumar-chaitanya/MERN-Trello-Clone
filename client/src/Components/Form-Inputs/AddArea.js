import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  Container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: '4px'
  },
  Textarea: {
    width: '100%',
    height: '60px',
    resize: 'none',
    padding: '8px',
    outline: 'none',
    border: '2px solid rgba(0,0,0,0)',
    '&:focus': {
      border: '2px solid rgb(33,0,61)'
    },
    '&::-webkit-scrollbar-thumb': {
			backgroundColor: '#7775',
			'&:hover': {
				backgroundColor: '#7773'
			}
		},
		'&::-webkit-scrollbar': {
			width: '4px',
		}
  },
  Button: {
    outline: 'none',
    border: 'none',
    color: 'white',
    background: 'linear-gradient(90deg, rgba(46,0,86,0.919502835313813) 0%, rgba(116,9,121,0.9363095580028886) 50%, rgba(137,0,200,0.919502835313813) 100%)',
    cursor: 'pointer',
    width: '100%',
    padding: '2px 4px',
    margin: '0 auto',
    fontSize: '16px'
  }
})

const AddArea = (props) => {
  const classes = useStyles()
  const [task, setTask] = useState('')

  const handleAreaChange = (e) => {
    setTask(e.target.value)
  }

  const handleButtonClick = () => {
    props.btnClick(task)
    setTask('')
  }

  return (
    <div className={classes['Container']}>
      <textarea className={classes['Textarea']} placeholder='Create New Task' value={task} onChange={handleAreaChange}></textarea>
      <button className={classes['Button']} onClick={handleButtonClick}>Add Task</button>
    </div>
  )
}

export default AddArea