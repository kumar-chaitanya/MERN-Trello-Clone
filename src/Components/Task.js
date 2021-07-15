import React from 'react'

function Task({ content, handleDragStart, handleDragOver, handleDragEnd, handleDragEnter, id, isDragged, boardID }) {
  return (
    <li
      draggable='true'
      onDragStart={(e) => handleDragStart(e, {taskID: id, boardID})}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragEnter={(e) => handleDragEnter(e, id)}
      className={isDragged ? 'highlight' : null}>{content}</li>
  )
}

export default Task
