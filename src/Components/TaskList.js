import React from 'react'
import Task from './Task'
import '../Board.css'

function TaskList({taskList}) {
  return (
    <div className="TaskList">
      <ul>
        {taskList.map(task => <Task content={task.content} key={task.id} /> )}
      </ul>
    </div>
  )
}

export default TaskList
