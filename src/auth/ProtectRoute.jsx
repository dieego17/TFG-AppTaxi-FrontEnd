/* eslint-disable no-unused-vars */
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './AuthProvider'

function ProtectRoute() {

    const auth = useAuth()

  return (
    <div>
      {auth.isAuth ? <Outlet /> : <Navigate to='/login' />}
    </div>
  )
}

export default ProtectRoute