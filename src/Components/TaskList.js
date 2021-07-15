import React, { useState, useRef } from 'react'
import Task from './Task'
import '../Board.css'

function TaskList({ addNewTask, boardID, taskList, moveTask }) {

  const dragged = useRef()
  const [inputVal, setinputVal] = useState('')

  const handleDragStart = (e, params) => {
    e.dataTransfer.effectAllowed = 'move'
    console.log(params);
    setTimeout(() => {
      dragged.current = params
    }, 0)
  }

  const handleDragEnd = (e) => {
    dragged.current = null
    console.log(e.target)
  }

  const handleDragEnter = (e, moveID) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    if (moveID !== dragged.current.taskID) {
      console.log("Dragged item id", dragged, e.target)
      moveTask(dragged, moveID, boardID)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleInputChange = e => {
    setinputVal(e.target.value)
  }

  const addNewTaskHandler = () => {
    addNewTask(boardID, inputVal)
    setinputVal('')
  }

  return (
    <div className="TaskList">
      <ul>
        {taskList.map(task => <Task
          key={task.id}
          handleDragStart={handleDragStart}
          handleDragEnd={handleDragEnd}
          handleDragOver={handleDragOver}
          handleDragEnter={handleDragEnter}
          boardID={boardID}
          {...task}
          isDragged={dragged.current && dragged.current.taskID === task.id ? true : false} />)}
      </ul>
      <div>
        <input type="text" value={inputVal} onChange={handleInputChange} placeholder='Add a task' />
        <button onClick={addNewTaskHandler}>Add New Task</button>
      </div>
    </div>
  )
}

export default TaskList
