import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const PublicRoute = (props) => {
  const {auth}=useSelector((state)=>state.auths);

  if(auth) {
    return <Navigate to={"/"} />
  } else {
    return props.children
  }
}

export default PublicRoute
