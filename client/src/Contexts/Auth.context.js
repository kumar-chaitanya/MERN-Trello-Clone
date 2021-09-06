import React, { createContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { useAuthReducer } from '../Reducers/auth.reducer'

export const AuthContext = createContext()

export const AuthProvider = (props) => {
  const [auth, dispatch] = useAuthReducer()
  const history = useHistory()

  useEffect(() => {
    const authToken = localStorage.getItem('authToken')

    if (!authToken) dispatch({ type: "AUTH_FAILURE" })
    else {
      fetch('http://localhost:5000/auth/login', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      }).then(res => {
        if (!res.ok) dispatch({ type: "AUTH_FAILURE" })
        return res.json()
      }).then((data) => {
        if(data.user) dispatch({ type: "AUTH_SUCCESS", payload: { user: data.user, authToken } })
      }).catch(err => {
          console.log(err)
          dispatch({ type: "AUTH_FAILURE" })
        })
    }
  }, [])

  const login = ({user, authToken}) => {
    dispatch({ type: "AUTH_SUCCESS", payload: { user, authToken } })
    localStorage.setItem('authToken', authToken)
  }

  const logout = () => {
    dispatch({ type: "AUTH_LOGOUT" })
    localStorage.removeItem('authToken')
    history.push('/login')
  }

  return (
    <AuthContext.Provider value={{
      user: auth.user,
      isAuthenticated: auth.isAuthenticated,
      authLoading: auth.authLoading,
      authToken: auth.authToken,
      login,
      logout
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}