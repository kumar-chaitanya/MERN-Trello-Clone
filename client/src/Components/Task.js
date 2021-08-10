import React, { useState, useContext } from 'react'
import { makeStyles } from '@material-ui/styles'

import { ProjectContext } from '../Contexts/Project.context'
import UpdateArea from './UpdateArea'
import DeleteButton from './DeleteButton'
import EditButton from './EditButton'

const useStyle = makeStyles({
  'TaskItem': {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '12px 0',
    width: '100%',
    background: 'white',
    padding: '8px',
    fontSize: '14px',
    cursor: 'move',
    position: 'relative',
    lineHeight: '1.4em'
  },
  'highlight': {
    color: 'white',
    background: 'goldenrod'
  },
  'TaskActions': {
    display: 'flex',
    width: '40px',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: '10px',
    right: '10px'
  }
})

function Task({ content, id, isDragged, boardID, idx }) {
  const [editMode, setEditMode] = useState(false)
  const { handleDragStart, handleDragEnter, handleDragOver, deleteTask, updateTask } = useContext(ProjectContext)
  const classes = useStyle()

  let cssClasses = [classes['TaskItem']]

  if(isDragged) cssClasses.push(classes['highlight'])

  const handleDeleteTask = () => {
    deleteTask(boardID, id)
  }

  const handleEditTask = () => {
    setEditMode(true)
  }

  const handleCancel = () => {
    setEditMode(false)
  }

  const handleCheck = async (content) => {
    const res = await updateTask(boardID, id, content)
    if(res) setEditMode(false)
  }

  const task =   <li
                  draggable='true'
                  onDragStart={(e) => handleDragStart(e, {taskID: id, boardID})}
                  onDragOver={handleDragOver}
                  onDragEnter={(e) => handleDragEnter(e, id, boardID, idx)}
                  className={cssClasses.join(' ')}>
                  {content}
                  <span className={classes['TaskActions']}>
                    <EditButton onClick={handleEditTask} />
                    <DeleteButton onClick={handleDeleteTask} />
                  </span>
                </li>

  return (
    <>
      {!editMode ? task : <UpdateArea value={content} handleCancel={handleCancel} handleCheck={handleCheck} />}
    </>
  )
}

export default Task
