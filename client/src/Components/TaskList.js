import React, { useState } from 'react'
import Task from './Task'
import '../Board.css'

function TaskList({ addNewTask, boardID, taskList, handleDragStart, handleDragEnter, handleDragOver, handleDragEnd, isDragging, draggedID }) {
  const [inputVal, setinputVal] = useState('')
  const [loading, setLoading] = useState(false)

  const handleInputChange = e => {
    setinputVal(e.target.value)
  }

  const addNewTaskHandler = () => {
    setinputVal('')
    setLoading(true)
    setTimeout(() => {
      addNewTask(boardID, inputVal)
      setLoading(false)
    }, 2000)
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
          {loading && <p>Adding New Task......</p>}
          <input type="text" value={inputVal} onChange={handleInputChange} placeholder='Add a task' />
          <button onClick={addNewTaskHandler}>Add New Task</button>
      </div>
    </div>
  )
}

export default TaskList
