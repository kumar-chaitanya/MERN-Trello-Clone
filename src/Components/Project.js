import React, { useState, useReducer } from 'react'
import Board from './Board'
import '../Project.css'

const projectReducer = (state, action) => {
  switch (action.type) {
    case "CREATE_BOARD":
      return { ...state, boards: [...state.boards, { id: state.boards.length + 1, title: action.title, taskList: [] }] }
    default:
      return state
  }
}

const initialState = {
  projectName: "My Project",
  boards: [{
    id: 1,
    title: "First Board",
    taskList: [{
      id: 1,
      content: "First Task"
    }, {
      id: 2,
      content: "Second Task"
    }, {
      id: 3,
      content: "Third Task"
    }]
  }, {
    id: 2,
    title: "Second Board",
    taskList: [{
      id: 1,
      content: "First Task"
    }, {
      id: 2,
      content: "Second Task"
    }, {
      id: 4,
      content: "I am the fourth task in the group"
    }, {
      id: 5,
      content: "Please push the CSS to GIT today🙏"
    }]
  }]
}

function Project() {
  const [project, dispatch] = useReducer(projectReducer, initialState)
  const [board, setBoard] = useState("")

  const handleInputChange = e => {
    setBoard(e.target.value)
  }

  const addNewBoard = () => {
    dispatch({type: 'CREATE_BOARD', title: board})
    setBoard("")
  }

  return (
    <div className="Project">
      {project.boards.map(board => <Board key={board.id} {...board} />)}
      <div>
        <input type="text" value={board} onChange={handleInputChange} />
        <button onClick={addNewBoard}>Add Board</button>
      </div>
    </div>
  )
}

export default Project
