import React, { useState } from 'react'
import Task from './Task'
import '../Board.css'

function TaskList({ addNewTask, boardID, taskList, handleDragStart, handleDragEnter, handleDragOver, handleDragEnd, isDragging, draggedID }) {
  const [inputVal, setinputVal] = useState('')

  const handleInputChange = e => {
    setinputVal(e.target.value)
  }

  const addNewTaskHandler = () => {
    addNewTask(boardID, inputVal)
    setinputVal('')
  }

  return (
    <div className="TaskList" onDragEnter={taskList.length === 0 ? (e) => handleDragEnter(e, '', boardID) : undefined}>
      <ul>
        {taskList.map(task => <Task
          key={task.id}
          handleDragStart={handleDragStart}
          handleDragEnd={handleDragEnd}
          handleDragOver={handleDragOver}
          handleDragEnter={handleDragEnter}
          boardID={boardID}
          {...task}
          isDragged={isDragging && draggedID === task.id ? true : false} />)}
      </ul>
      <div>
        <input type="text" value={inputVal} onChange={handleInputChange} placeholder='Add a task' />
        <button onClick={addNewTaskHandler}>Add New Task</button>
      </div>
    </div>
  )
}

export default TaskList
