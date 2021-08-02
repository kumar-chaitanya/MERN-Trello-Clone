import React, { useState, useReducer, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import Board from './Board'
import '../Project.css'

const projectReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_PROJECT": {
      return { ...action.payload, loading: false }
    }

    case "CREATE_BOARD": {
      return { ...state, boards: [...state.boards, { id: uuidv4(), title: action.title, taskList: [] }] }
    }
    
    case "MOVE_TASK": {
      let { dragItemID, moveItemID, dragBoardID, moveBoardID } = action
      
      let updatedBoards = JSON.parse(JSON.stringify(state.boards))

      let dragBoardIdx = updatedBoards.findIndex(board => board.id === dragBoardID)
      let moveBoardIdx = updatedBoards.findIndex(board => board.id === moveBoardID)

      let dragItemIdx = updatedBoards[dragBoardIdx].taskList.findIndex(task => task.id === dragItemID)
      let moveItemIdx = moveItemID ? updatedBoards[moveBoardIdx].taskList.findIndex(task => task.id === moveItemID) : 0

      let dragItem = updatedBoards[dragBoardIdx].taskList.slice(dragItemIdx, dragItemIdx + 1)

      updatedBoards[dragBoardIdx].taskList.splice(dragItemIdx, 1)
      updatedBoards[moveBoardIdx].taskList.splice(moveItemIdx, 0, {...dragItem[0]})

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
  projectId: '',
  projectName: '',
  boards: [],
  loading: true
}

function Project() {
  const [project, dispatch] = useReducer(projectReducer, initialState)
  const [board, setBoard] = useState("")

  const { id } = useParams()

  useEffect(() => {
    fetch(`http://localhost:5000/projects/${id}`)
      .then(res => res.json())
      .then(data => {
        let project = {
          projectId: id,
          projectName: data.name,
          boards: data.boards.map(board => {
            let taskList = board.tasks.map(task => {
              return {
                id: task._id,
                content: task.content
              }
            })

            return {
              id: board._id,
              title: board.title,
              taskList
            }
          })
        }

        dispatch({type: 'LOAD_PROJECT', payload: project})
      })
      .catch(err => console.log(err)) 
  }, [])

  const [isDragging, setIsDragging] = useState(false)
  const dragged = useRef()
  const dragItem = useRef()

  const handleDragEnd = () => {
    setIsDragging(false)
    console.log(dragged.current);
    dragged.current = null
    dragItem.current.removeEventListener('dragend', handleDragEnd)
    dragItem.current = null

    console.log('dragend')
  }

  const handleDragStart = (e, params) => {
    e.dataTransfer.effectAllowed = 'move'
    dragged.current = params
    dragItem.current = e.target

    dragItem.current.addEventListener('dragend', handleDragEnd)
    
    console.log(params);

    setTimeout(() => {
      setIsDragging(true)
    }, 0)
  }

  const handleDragEnter = (e, moveID, moveBoardID) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    if (moveID !== dragged.current.taskID) {
      console.log("Dragged item id", dragged, e.target)
      dispatch({type:'MOVE_TASK', 
                dragItemID: dragged.current.taskID, 
                moveItemID: moveID, 
                dragBoardID: dragged.current.boardID, moveBoardID})
      
      dragged.current.boardID = moveBoardID
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

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

  console.log("Rerendering Project Component")
  console.log('State is', project)

  let data
  if(project.loading) {
    data = <div>Loading Project.......</div>
  } else {
    data = <div className="Project">
    {project.boards.map(board => <Board 
                                    key={board.id} 
                                    {...board}
                                    draggedID={isDragging && dragged.current.taskID}
                                    isDragging={isDragging}
                                    handleDragStart={handleDragStart}
                                    handleDragEnter={handleDragEnter}
                                    handleDragOver={handleDragOver} 
                                    handleDragEnd={handleDragEnd}
                                    addNewTask={addNewTask} />)}
    <div>
      <input type="text" value={board} onChange={handleInputChange} />
      <button onClick={addNewBoard}>Add Board</button>
    </div>
  </div>
  }

  return (
    data
  )
}

export default Project
