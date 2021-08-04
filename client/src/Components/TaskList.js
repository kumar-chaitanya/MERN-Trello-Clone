import React, { useState, useContext } from 'react'

import { ProjectContext } from './Contexts/Project.context'
import Task from './Task'
import '../Board.css'

function TaskList({ boardID, taskList, draggedID }) {
  const { addNewTask, isDragging, handleDragEnter } = useContext(ProjectContext)
  const [inputVal, setinputVal] = useState('')
  const [loading, setLoading] = useState(false)

  const handleInputChange = e => {
    setinputVal(e.target.value)
  }

  const addNewTaskHandler = () => {
    setinputVal('')
    setLoading(true)
    addNewTask(boardID, inputVal)
      .then(res => {
        if(res) setLoading(false)
      })
  }

  return (
    <div className="TaskList" onDragEnter={taskList.length === 0 ? (e) => handleDragEnter(e, '', boardID, 0) : undefined}>
      <ul>
        {taskList.map((task, idx) => <Task
          key={task.id}
          idx={idx}
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
