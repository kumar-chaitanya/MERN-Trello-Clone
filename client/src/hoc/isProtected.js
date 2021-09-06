import React, { useContext } from 'react'

import Loader from '../Components/Loader'
import Error from '../Components/Error'
import { AuthContext } from '../Contexts/Auth.context'

export const isProtected = (Component) => {
  return (props) => {
    const { authLoading, isAuthenticated } = useContext(AuthContext)
    let toRender = null

    if(authLoading) {
      toRender = <Loader />
    } else if(!authLoading && isAuthenticated) {
      toRender = <Component {...props}>{props.children}</Component>
    } else {
      toRender = <Error message={'Please Login First'} />
    }
  
    return toRender
  }
}