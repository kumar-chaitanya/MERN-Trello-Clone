import React, { createContext, useEffect } from 'react'

import { useAuthReducer } from '../Reducers/auth.reducer'

export const AuthContext = createContext()

export const AuthProvider = (props) => {
  const [auth, dispatch] = useAuthReducer()

  useEffect(() => {
    // const authToken = JSON.parse(localStorage.getItem('authToken'))
    const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTI2Mzg5ZDg2ZmQ1ZjQwZTBlNjQ1ZDMiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE2MzAwMDMwOTQsImV4cCI6MTYzMDAwNjY5NH0.5TQCKAsJCCsFfTyCkeAP6aTuDsS9iWy0mkMsEfyElaw'

    if (!authToken) dispatch({ type: "AUTH_FAILURE" })
    else {
      fetch('http://localhost:5000/auth/login', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      }).then(res => {
        console.log(res)
        if (!res.ok) dispatch({ type: "AUTH_FAILURE" })
        return res.json()
      }).then((data) => {
        if(data.user) dispatch({ type: "AUTH_SUCCESS", payload: { user: data.user, authToken } })
        else console.log(data.message)
      }).catch(err => {
          console.log(err)
          dispatch({ type: "AUTH_FAILURE" })
        })
    }
  }, [])

  const logout = () => {
    dispatch({ type: "AUTH_LOGOUT" })
  }

  return (
    <AuthContext.Provider value={{
      user: auth.user,
      isAuthenticated: auth.isAuthenticated,
      authLoading: auth.authLoading,
      authToken: auth.authToken,
      logout
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}