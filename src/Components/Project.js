import React, { useState, useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Board from './Board'
import '../Project.css'

const projectReducer = (state, action) => {
  switch (action.type) {
    case "CREATE_BOARD": {
      return { ...state, boards: [...state.boards, { id: state.boards.length + 1, title: action.title, taskList: [] }] }
    }
    
    case "MOVE_TASK": {
      let { dragItemID, moveItemID, boardID } = action
      let newState = JSON.parse(JSON.stringify(state))
      boardID -= 1
      let dragItem = newState.boards[boardID].taskList.filter(task => task.id === dragItemID)
      let moveItem = newState.boards[boardID].taskList.filter(task => task.id === moveItemID)

      let dragItemIdx = newState.boards[boardID].taskList.findIndex(task => task.id === dragItemID)
      let moveItemIdx = newState.boards[boardID].taskList.findIndex(task => task.id === moveItemID)

      let updatedTaskList = [...newState.boards[boardID].taskList]

      updatedTaskList[dragItemIdx] = { ...moveItem[0] }
      updatedTaskList[moveItemIdx] = { ...dragItem[0] }

      newState.boards[boardID] = { ...newState.boards[boardID], taskList: [...updatedTaskList] }
      return {...newState}
    }
    
    case "ADD_TASK": {
      let {boardID, task} = action
      let boards = JSON.parse(JSON.stringify(state.boards))
      let updatedTaskList = [...boards[boardID-1].taskList, {
        id: uuidv4(),
        content: task
      }]

      boards[boardID-1].taskList = [...updatedTaskList]
      return {...state, boards:[...boards]}
    }
    
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

  const moveTask = (dragItemID, moveItemID, boardID) => {
    dispatch({type:'MOVE_TASK', dragItemID, moveItemID, boardID})
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
