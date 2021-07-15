import React from 'react'

function Task({ content, handleDragStart, handleDragOver, handleDragEnd, handleDragEnter, id, isDragged, boardID }) {
  return (
    <li
      draggable='true'
      onDragStart={(e) => handleDragStart(e, {taskID: id, boardID})}
      onDrop={() => handleDragEnd(id, boardID)}
      onDragOver={handleDragOver}
      onDragEnter={(e) => handleDragEnter(e, id, boardID)}
      className={isDragged ? 'highlight' : null}>{content}</li>
  )
}

export default Task
