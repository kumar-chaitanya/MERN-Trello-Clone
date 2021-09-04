import React, { useContext } from 'react'


import { ProjectContext } from '../Contexts/Project.context'
import Board from './Board'
import Error from './Error'
import AddInput from './Form-Inputs/AddInput'
import '../Project.css'


function Project() {
  const { project, dragged, isDragging, addNewBoard } = useContext(ProjectContext)

  let data = null
  if (project.loading) {
    data = <div>Loading Project.......</div>
  } else if(project.projectId) {
    data = <div className="Project">
      {project.boards.map(board => <Board
        key={board.id}
        {...board}
        draggedID={isDragging && dragged.current.taskID}
        isDragging={isDragging} />)
      }
      <AddInput placeholder="Enter Board Title" btnText="Create" btnClick={addNewBoard} />
    </div>
  }
  return (
    <>
      {project.error && <Error message={project.error} />}
      {data}
    </>
  )
}

export default Project
