import React, { useState, useContext } from 'react'


import { ProjectContext } from './Contexts/Project.context'
import Board from './Board'
import '../Project.css'


function Project() {
  const { project, dragged, isDragging, addNewBoard } = useContext(ProjectContext)
  const [board, setBoard] = useState('')

  const handleInputChange = (e) => {
    setBoard(e.target.value)
  }

  const handleAddNewBoard = () => {
    addNewBoard(board)
    setBoard('')
  }

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
      <div>
        <input type="text" value={board} onChange={handleInputChange} />
        <button onClick={handleAddNewBoard}>Add Board</button>
      </div>
    </div>
  }
  return (
    data
  )
}

export default Project
