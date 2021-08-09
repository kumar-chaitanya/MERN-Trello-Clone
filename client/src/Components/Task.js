import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/styles'

import { ProjectContext } from '../Contexts/Project.context'
import DeleteButton from './DeleteButton'

const useStyle = makeStyles({
  'TaskItem': {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '12px 0',
    width: '100%',
    background: 'white',
    padding: '8px',
    fontSize: '14px',
    cursor: 'move'
  },
  'highlight': {
    color: 'white',
    background: 'goldenrod'
  }
})

function Task({ content, id, isDragged, boardID, idx }) {
  const { handleDragStart, handleDragEnter, handleDragOver, deleteTask } = useContext(ProjectContext)
  const classes = useStyle()

  let cssClasses = [classes['TaskItem']]

  if(isDragged) cssClasses.push(classes['highlight'])

  const handleDeleteTask = () => {
    deleteTask(boardID, id)
  }

  return (
    <li
      key={id}
      draggable='true'
      onDragStart={(e) => handleDragStart(e, {taskID: id, boardID})}
      onDragOver={handleDragOver}
      onDragEnter={(e) => handleDragEnter(e, id, boardID, idx)}
      className={cssClasses.join(' ')}>
        {content}
        <DeleteButton onClick={handleDeleteTask} />
      </li>
  )
}

export default Task
