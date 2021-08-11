import React, { useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core'

import { ProjectContext } from '../Contexts/Project.context'
import Task from './Task'
import AddInput from './Form-Inputs/AddInput'

const useStyle = makeStyles({
  'TaskContainer': {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  'TaskList': {
    listStyle: 'none',
    margin: 0,
    padding: '4px',
    width: '100%'
  }
})

function TaskList({ boardID, taskList, draggedID }) {
  const classes = useStyle()
  const { addNewTask, isDragging, handleDragEnter } = useContext(ProjectContext)
  const [loading, setLoading] = useState(false)

  const handleNewTask = (inputVal) => {
    setLoading(true)
    addNewTask(boardID, inputVal)
      .then(res => {
        if(res) setLoading(false)
      })
  }

  return (
    <div className={classes['TaskContainer']} onDragEnter={taskList.length === 0 ? (e) => handleDragEnter(e, '', boardID, 0) : undefined}>
      <ul className={classes['TaskList']}>
        {taskList.map((task, idx) => <Task
          key={task.id}
          idx={idx}
          boardID={boardID}
          {...task}
          isDragged={isDragging && draggedID === task.id ? true : false} />)}
      </ul>
       <>
          {loading && <p>Adding New Task......</p>}
          <AddInput placeholder="Enter Your Task" btnText="Create" btnClick={handleNewTask} />
      </>
    </div>
  )
}

export default TaskList
