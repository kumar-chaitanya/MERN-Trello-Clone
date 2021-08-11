import React, { useState, useRef, useEffect, createContext } from 'react'
import { useParams } from 'react-router-dom'

import { useProjectReducer } from '../Reducers/project.reducer'

export const ProjectContext = createContext()

export const ProjectProvider = (props) => {
  const [project, dispatch] = useProjectReducer()
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
  }, [])

  const [isDragging, setIsDragging] = useState(false)
  const dragged = useRef()
  const dragItem = useRef()

  const handleDragEnd = () => {
    setIsDragging(false)

    if (dragged.current.position !== undefined) {
      let body = {
        moveFromBoardId: dragged.current.moveFromBoard,
        moveToBoardId: dragged.current.boardID,
        taskId: dragged.current.taskID,
        position: dragged.current.position
      }
      fetch(`http://localhost:5000/projects/${id}/boards/moveTask`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }).then(res => {
        console.log(res)
        if (res.ok) {
          console.log('Task successfully Moved')
        }
      }).catch(err => {
        console.log(err)
      })
    }

    dragged.current = null
    dragItem.current.removeEventListener('dragend', handleDragEnd)
    dragItem.current = null

    console.log('dragend')
  }

  const handleDragStart = (e, params) => {
    e.dataTransfer.effectAllowed = 'move'
    dragged.current = params
    dragged.current.moveFromBoard = params.boardID
    dragItem.current = e.target

    dragItem.current.addEventListener('dragend', handleDragEnd)

    console.log(params);

    setTimeout(() => {
      setIsDragging(true)
    }, 0)
  }

  const handleDragEnter = (e, moveID, moveBoardID, idx) => {
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
      dragged.current.position = idx
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const addNewTask = async (boardID, content) => {
    if (!content) return

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

  const updateTask = async (boardID, taskID, content) => {
    if (!content) return

    try {
      const res = await fetch(`http://localhost:5000/projects/${id}/boards/${boardID}/task/${taskID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content })
      })

      if (res.ok) {
        const task = await res.json()
        dispatch({ type: 'UPDATE_TASK', boardID, content: task.content, taskID: task._id })
        return true
      }
    } catch (err) {
      console.log(err)
    }
  }

  const deleteTask = async (boardID, taskID) => {
    try {
      const res = await fetch(`http://localhost:5000/projects/${id}/boards/${boardID}/task/${taskID}`, {
        method: 'DELETE'
      })

      if (res.ok) dispatch({ type: 'DELETE_TASK', boardID, taskID })
    } catch (err) {
      console.log(err)
    }
  }

  const addNewBoard = (board) => {
    if (!board) return

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

  const updateBoard = async (boardID, title) => {
    if (!title) return

    try {
      const res = await fetch(`http://localhost:5000/projects/${id}/boards/${boardID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title })
      })

      if (res.ok) {
        dispatch({ type: 'UPDATE_BOARD', boardID, title })
        return true
      }
    } catch (err) {
      console.log(err)
    }
  }

  const deleteBoard = async (boardID) => {
    try {
      const res = await fetch(`http://localhost:5000/projects/${id}/boards/${boardID}`, {
        method: 'DELETE'
      })

      if (res.ok) dispatch({ type: 'DELETE_BOARD', boardID })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <ProjectContext.Provider value={{
      project, dragged, isDragging,
      handleDragStart, handleDragEnter, handleDragOver,
      addNewTask, updateTask, deleteTask,
      addNewBoard, updateBoard, deleteBoard
    }}>
      {props.children}
    </ProjectContext.Provider>
  )
}