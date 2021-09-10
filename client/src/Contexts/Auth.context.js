import React, { createContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { useAuthReducer } from '../Reducers/auth.reducer'

export const AuthContext = createContext()

export const AuthProvider = (props) => {
  const [auth, dispatch] = useAuthReducer()
  const history = useHistory()

  const logout = () => {
    dispatch({ type: "AUTH_LOGOUT" })
    localStorage.removeItem('authToken')
    localStorage.removeItem('expiresIn')
    history.push('/login')
  }

  const login = ({user, authToken, expiresIn}) => {
    dispatch({ type: "AUTH_SUCCESS", payload: { user, authToken } })
    localStorage.setItem('authToken', authToken)
    localStorage.setItem('expiresIn', expiresIn)
    setInterval(() => {
      let now = new Date()
      let expiry = new Date(expiresIn)
      if(now.getTime() >= expiry.getTime()) logout()
    }, 1000);
  } 

  useEffect(() => {
    const authToken = localStorage.getItem('authToken')
    const expiresIn = localStorage.getItem('expiresIn')

    if (!authToken) dispatch({ type: "AUTH_FAILURE" })
    else {
      fetch('api/auth/login', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      }).then(res => {
        if (!res.ok) dispatch({ type: "AUTH_FAILURE" })
        return res.json()
      }).then((data) => {
        if(data.user) {
          dispatch({ type: "AUTH_SUCCESS", payload: { user: data.user, authToken } })
          setInterval(() => {
            let now = new Date()
            let expiry = new Date(expiresIn)
            if(now.getTime() >= expiry.getTime()) logout()
          }, 1000);
        }
      }).catch(err => {
          console.log(err)
          dispatch({ type: "AUTH_FAILURE" })
        })
    }
  }, [])

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