import { useReducer } from 'react'

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

    case "UPDATE_BOARD": {
      const { boardID, title } = action
      const boards = [...state.boards]
      const boardIdx = boards.findIndex(board => board.id === boardID)
      boards[boardIdx].title = title

      return {
        ...state,
        boards: [...boards]
      }
    }

    case "DELETE_BOARD": {
      const { boardID } = action
      const boards = [...state.boards]
      const boardIdx = boards.findIndex(board => board.id === boardID)
      boards.splice(boardIdx, 1)

      return { ...state, boards: [...boards] }
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
      const { boardID, content, id } = action
      const boards = JSON.parse(JSON.stringify(state.boards))
      const updatedBoardIdx = boards.findIndex(board => board.id === boardID)
      const updatedTaskList = [...boards[updatedBoardIdx].taskList, {
        id,
        content
      }]

      boards[updatedBoardIdx].taskList = [...updatedTaskList]
      return { ...state, boards: [...boards] }
    }

    case "UPDATE_TASK": {
      const { boardID, taskID, content } = action
      const boards = [...state.boards]
      const boardIdx = boards.findIndex(board => board.id === boardID)
      const taskIdx = boards[boardIdx].taskList.findIndex(task => task.id === taskID)

      let updatedTaskList = JSON.parse(JSON.stringify(boards[boardIdx].taskList))
      updatedTaskList[taskIdx].content = content

      boards[boardIdx] = {
        ...boards[boardIdx],
        taskList: [...updatedTaskList]
      }

      return { ...state, boards: [...boards] }
    }

    case "DELETE_TASK": {
      const { boardID, taskID } = action
      const boards = JSON.parse(JSON.stringify(state.boards))
      const boardIdx = boards.findIndex(board => board.id === boardID)
      const taskIdx = boards[boardIdx].taskList.findIndex(task => task.id === taskID)

      boards[boardIdx].taskList.splice(taskIdx, 1)
      return { ...state, boards: [...boards] }
    }

    default:
      return state
  }
}

export function useProjectReducer() {
  const [project, dispatch] = useReducer(projectReducer, initialState)
  return [project, dispatch]
}

