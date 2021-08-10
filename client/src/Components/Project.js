import React, { useContext } from 'react'


import { ProjectContext } from '../Contexts/Project.context'
import Board from './Board'
import AddInput from './AddInput'
import '../Project.css'


function Project() {
  const { project, dragged, isDragging, addNewBoard } = useContext(ProjectContext)

  let data
  if (project.loading) {
    data = <div>Loading Project.......</div>
  } else {
    data = <div className="Project">
      {project.boards.map(board => <Board
        key={board.id}
        {...board}
        draggedID={isDragging && dragged.current.taskID}
        isDragging={isDragging} /> )
      }
      <AddInput placeholder="Enter Board Title" btnText="Create" btnClick={addNewBoard} />
    </div>
  }
  return (
    data
  )
}

export default Project
