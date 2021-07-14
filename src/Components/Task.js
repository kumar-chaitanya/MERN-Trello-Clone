import React from 'react'

function Task({ content, handleDragStart, handleDragEnd, handleDragOver, id, isDragged }) {
  return (
    <li
      draggable='true'
      onDragStart={(e) => handleDragStart(e, id)}
      onDragEnd={handleDragEnd}
      onDragEnter={(e) => handleDragOver(e, id)}
      className={isDragged ? 'highlight' : null}>{content}</li>
  )
}

export default Task
