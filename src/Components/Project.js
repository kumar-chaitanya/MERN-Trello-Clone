import React, { useState, useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Board from './Board'
import '../Project.css'

const projectReducer = (state, action) => {
  switch (action.type) {
    case "CREATE_BOARD": {
      return { ...state, boards: [...state.boards, { id: uuidv4(), title: action.title, taskList: [] }] }
    }
    
    case "MOVE_TASK": {
      let { dragItemID, moveItemID, dragBoardID, moveBoardID } = action
      
      let updatedBoards = JSON.parse(JSON.stringify(state.boards))

      let dragBoardIdx = updatedBoards.findIndex(board => board.id === dragBoardID)
      let moveBoardIdx = updatedBoards.findIndex(board => board.id === moveBoardID)

      let dragItemIdx = updatedBoards[dragBoardIdx].taskList.findIndex(task => task.id === dragItemID)
      let moveItemIdx = updatedBoards[moveBoardIdx].taskList.findIndex(task => task.id === moveItemID)

      let dragItem = updatedBoards[dragBoardIdx].taskList.slice(dragItemIdx, dragItemIdx + 1)

      updatedBoards[dragBoardIdx].taskList.splice(dragItemIdx, 1)
      updatedBoards[moveBoardIdx].taskList.splice(moveItemIdx, 0, dragItem)

      return {
        ...state,
        boards: [...updatedBoards]
      }
    }
    
    case "ADD_TASK": {
      let {boardID, task} = action
      let boards = JSON.parse(JSON.stringify(state.boards))
      let updatedBoardIdx = boards.findIndex(board => board.id === boardID)
      let updatedTaskList = [...boards[updatedBoardIdx].taskList, {
        id: uuidv4(),
        content: task
      }]

      boards[updatedBoardIdx].taskList = [...updatedTaskList]
      return {...state, boards:[...boards]}
    }
    
    default:
      return state
  }
}

const initialState = {
  projectName: "My Project",
  boards: []
}

function Project() {
  const [project, dispatch] = useReducer(projectReducer, initialState)
  const [board, setBoard] = useState("")

  const addNewTask = (boardID, task) => {
    dispatch({type:'ADD_TASK', boardID, task})
  }

  const handleInputChange = e => {
    setBoard(e.target.value)
  }

  const addNewBoard = () => {
    dispatch({ type: 'CREATE_BOARD', title: board })
    setBoard("")
  }

  const moveTask = (dragItemID, moveItemID, dragBoardID, moveBoardID) => {
    dispatch({type:'MOVE_TASK', dragItemID, moveItemID, dragBoardID, moveBoardID})
  }

  console.log("Rerendering Project Component")
  console.log('State is', project)

  return (
    <div className="Project">
      {project.boards.map(board => <Board key={board.id} {...board} moveTask={moveTask} addNewTask={addNewTask} />)}
      <div>
        <input type="text" value={board} onChange={handleInputChange} />
        <button onClick={addNewBoard}>Add Board</button>
      </div>
    </div>
  )
}

export default Project
