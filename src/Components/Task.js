import React from 'react'

function Task({ content, handleDragStart, handleDragOver, handleDragEnd, handleDragEnter, id, isDragged, boardID }) {
  return (
    <li
      key={id}
      draggable='true'
      onDragStart={(e) => handleDragStart(e, {taskID: id, boardID})}
      //onDragEnd={() => handleDragEnd(id, boardID)}
      onDragOver={handleDragOver}
      onDragEnter={(e) => handleDragEnter(e, id, boardID)}
      className={isDragged ? 'highlight' : null}>{content}</li>
  )
}

export default Task
