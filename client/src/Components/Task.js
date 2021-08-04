import React, { useContext } from 'react'

import { ProjectContext } from './Contexts/Project.context'

function Task({ content, id, isDragged, boardID, idx }) {
  const { handleDragStart, handleDragEnter, handleDragOver } = useContext(ProjectContext)

  return (
    <li
      key={id}
      draggable='true'
      onDragStart={(e) => handleDragStart(e, {taskID: id, boardID})}
      onDragOver={handleDragOver}
      onDragEnter={(e) => handleDragEnter(e, id, boardID, idx)}
      className={isDragged ? 'highlight' : null}>{content}</li>
  )
}

export default Task
