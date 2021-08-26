import React, { useContext } from 'react'

import { AuthContext } from '../Contexts/Auth.context'

export const isProtected = (Component) => {
  return (props) => {
    const { authLoading, isAuthenticated } = useContext(AuthContext)
    let toRender = null

    if(authLoading) {
      toRender = 'Loading...'
    } else if(!authLoading && isAuthenticated) {
      toRender = <Component {...props}>{props.children}</Component>
    } else {
      toRender = 'Please Login First'
    }
  
    return toRender
  }
}