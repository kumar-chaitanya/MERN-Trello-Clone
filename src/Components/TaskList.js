import React, { useState } from 'react'
import Task from './Task'
import '../Board.css'

function TaskList({addNewTask, boardID, taskList, moveTask}) {

  const [dragged, setDragged] = useState(null)
  const [inputVal, setinputVal] = useState('')

  const handleDragStart = (e, id) => {
    setDragged(id)
    console.log(e.target, id)
  }

  const handleDragEnd = (e) => {
    setDragged(null)
    console.log(e.target)
  }

  const handleDragOver = (e, moveID) => {
    e.preventDefault()
    e.stopPropagation()
    if(moveID !== dragged) {
      console.log("Dragged item id", dragged, e.target)
      moveTask(dragged, moveID, boardID)
    }
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
                                {...task} 
                                isDragged={dragged === task.id ? true : false} /> )}
      </ul>
      <div>
        <input type="text" value={inputVal} onChange={handleInputChange} placeholder='Add a task' />
        <button onClick={addNewTaskHandler}>Add New Task</button>
      </div>
    </div>
  )
}

export default TaskList
