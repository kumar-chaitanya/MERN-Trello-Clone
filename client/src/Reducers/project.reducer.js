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

    case "DELETE_TASK": {
      let { boardID, taskID } = action
      let boards = JSON.parse(JSON.stringify(state.boards))
      let boardIdx = boards.findIndex(board => board.id === boardID)
      let taskIdx = boards[boardIdx].taskList.findIndex(task => task.id === taskID)

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

