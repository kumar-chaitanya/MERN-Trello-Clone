import React, { useState, useReducer, useRef, useEffect, createContext } from 'react'
import { useParams } from 'react-router-dom'

export const ProjectContext = createContext()

const initialState = {
  projectId: '',
  projectName: '',
  boards: [],
  loading: true
}

const projectReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_PROJECT": {
      return { ...action.payload, loading: false }
    }

    case "CREATE_BOARD": {
      return { ...state, boards: [...state.boards, { id: action.id, title: action.title, taskList: [] }] }
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
      updatedBoards[moveBoardIdx].taskList.splice(moveItemIdx, 0, { ...dragItem[0] })

      return {
        ...state,
        boards: [...updatedBoards]
      }
    }

    case "ADD_TASK": {
      let { boardID, content, id } = action
      let boards = JSON.parse(JSON.stringify(state.boards))
      let updatedBoardIdx = boards.findIndex(board => board.id === boardID)
      let updatedTaskList = [...boards[updatedBoardIdx].taskList, {
        id,
        content
      }]

      boards[updatedBoardIdx].taskList = [...updatedTaskList]
      return { ...state, boards: [...boards] }
    }

    default:
      return state
  }
}

export const ProjectProvider = (props) => {
  const [project, dispatch] = useReducer(projectReducer, initialState)
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
        dispatch({ type: 'LOAD_PROJECT', payload: project })
      })
      .catch(err => console.log(err))
  }, [id])

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
      dispatch({
        type: 'MOVE_TASK',
        dragItemID: dragged.current.taskID,
        moveItemID: moveID,
        dragBoardID: dragged.current.boardID, moveBoardID
      })

      dragged.current.boardID = moveBoardID
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const addNewTask = async (boardID, content) => {
    try {
      const res = await fetch(`http://localhost:5000/projects/${id}/boards/${boardID}/task`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content })
      })

      if (res.ok) {
        const task = await res.json()
        dispatch({ type: 'ADD_TASK', boardID, content: task.content, id: task._id })
        return true
      }
    } catch (err) {
      console.log(err)
    }
  }

  const addNewBoard = (board) => {
    fetch(`http://localhost:5000/projects/${id}/boards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: board })
    }).then(res => {
      if (res.ok) return res.json()
    }).then(board => {
      dispatch({ type: 'CREATE_BOARD', title: board.title, id: board._id })
    })
    .catch(err => console.log(err))
  }

  console.log("Rerendering Project Component")
  console.log('State is', project)

  return (
    <ProjectContext.Provider value={{ project, dragged, isDragging, handleDragStart, handleDragEnter, handleDragOver, addNewTask, addNewBoard }}>
      {props.children}
    </ProjectContext.Provider>
  )
}