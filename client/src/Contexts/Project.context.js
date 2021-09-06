import React, { useState, useRef, useEffect, createContext, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { isProtected } from '../hoc/isProtected'

import { useProjectReducer } from '../Reducers/project.reducer'
import { AuthContext } from './Auth.context'

export const ProjectContext = createContext()

const Provider = (props) => {
  const { authToken } = useContext(AuthContext)
  const [project, dispatch] = useProjectReducer()
  const { id } = useParams()

  useEffect(() => {
    fetch(`http://localhost:5000/projects/${id}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          dispatch({ type: 'SET_ERROR', payload: data.message })
          setTimeout(() => {
            dispatch({ type: 'RESET_ERROR' })
          }, 4000);
        }
        else {
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
        }

      })
      .catch(err => {
        console.log(err)
        dispatch({ type: 'SET_ERROR', payload: err.message })
        setTimeout(() => {
          dispatch({ type: 'RESET_ERROR' })
        }, 4000);
      })
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
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(body)
      }).then(res => {
        if (!res.ok) {
          dispatch({ type: 'SET_ERROR', payload: 'Some error occurred, please try again' })
          setTimeout(() => {
            dispatch({ type: 'RESET_ERROR' })
          }, 4000);
        }
      }).catch(err => {
        console.log(err)
        dispatch({ type: 'SET_ERROR', payload: err.message })
        setTimeout(() => {
          dispatch({ type: 'RESET_ERROR' })
        }, 4000);
      })
    }

    dragged.current = null
    dragItem.current.removeEventListener('dragend', handleDragEnd)
    dragItem.current = null
  }

  const handleDragStart = (e, params) => {
    e.dataTransfer.effectAllowed = 'move'
    dragged.current = params
    dragged.current.moveFromBoard = params.boardID
    dragItem.current = e.target

    dragItem.current.addEventListener('dragend', handleDragEnd)

    setTimeout(() => {
      setIsDragging(true)
    }, 0)
  }

  const handleDragEnter = (e, moveID, moveBoardID, idx) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    if (moveID !== dragged.current.taskID) {
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
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
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
      dispatch({ type: 'SET_ERROR', payload: err.message })
      setTimeout(() => {
        dispatch({ type: 'RESET_ERROR' })
      }, 4000);
    }
  }

  const updateTask = async (boardID, taskID, content) => {
    if (!content) return

    try {
      const res = await fetch(`http://localhost:5000/projects/${id}/boards/${boardID}/task/${taskID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
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
      dispatch({ type: 'SET_ERROR', payload: err.message })
      setTimeout(() => {
        dispatch({ type: 'RESET_ERROR' })
      }, 4000);
    }
  }

  const deleteTask = async (boardID, taskID) => {
    try {
      const res = await fetch(`http://localhost:5000/projects/${id}/boards/${boardID}/task/${taskID}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })

      if (res.ok) dispatch({ type: 'DELETE_TASK', boardID, taskID })
    } catch (err) {
      console.log(err)
      dispatch({ type: 'SET_ERROR', payload: err.message })
      setTimeout(() => {
        dispatch({ type: 'RESET_ERROR' })
      }, 4000);
    }
  }

  const addNewBoard = (board) => {
    if (!board) return

    fetch(`http://localhost:5000/projects/${id}/boards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({ title: board })
    }).then(res => {
      if (res.ok) return res.json()
    }).then(board => {
      dispatch({ type: 'CREATE_BOARD', title: board.title, id: board._id })
    })
      .catch(err => {
        console.log(err)
        dispatch({ type: 'SET_ERROR', payload: err.message })
        setTimeout(() => {
          dispatch({ type: 'RESET_ERROR' })
        }, 4000);
      })
  }

  const updateBoard = async (boardID, title) => {
    if (!title) return

    try {
      const res = await fetch(`http://localhost:5000/projects/${id}/boards/${boardID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ title })
      })

      if (res.ok) {
        dispatch({ type: 'UPDATE_BOARD', boardID, title })
        return true
      }
    } catch (err) {
      console.log(err)
      dispatch({ type: 'SET_ERROR', payload: err.message })
      setTimeout(() => {
        dispatch({ type: 'RESET_ERROR' })
      }, 4000);
    }
  }

  const deleteBoard = async (boardID) => {
    try {
      const res = await fetch(`http://localhost:5000/projects/${id}/boards/${boardID}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })

      if (res.ok) dispatch({ type: 'DELETE_BOARD', boardID })
    } catch (err) {
      console.log(err)
      dispatch({ type: 'SET_ERROR', payload: err.message })
      setTimeout(() => {
        dispatch({ type: 'RESET_ERROR' })
      }, 4000);
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

export const ProjectProvider = isProtected(Provider)