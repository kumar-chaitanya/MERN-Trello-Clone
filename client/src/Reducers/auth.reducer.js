import { useReducer } from 'react'

const initialState = {
  authLoading: true,
  authToken: null,
  isAuthenticated: null,
  user: null
}

const authReducer = (state, action) => {
  switch(action.type) {
    case "AUTH_SUCCESS": {
      return {
        authLoading: false,
        isAuthenticated: true,
        ...action.payload
      }
    }

    case "AUTH_FAILURE": {
      return {
        authLoading: false,
        authToken: null,
        isAuthenticated: false,
        user: null
      }
    }

    case "AUTH_LOGOUT": {
      return {
        authLoading: false,
        authToken: null,
        isAuthenticated: false,
        user: null
      }
    }

    default: return { ...state }
  }
}

export function useAuthReducer() {
  const [auth, dispatch] = useReducer(authReducer, initialState)
  return [auth, dispatch]
}