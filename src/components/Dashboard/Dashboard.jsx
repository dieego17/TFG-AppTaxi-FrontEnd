/* eslint-disable no-unused-vars */
import React from 'react'
import { useAuth } from '../../auth/AuthProvider'

function Dashboard() {
  const auth = useAuth()
  return (
    <div>Dashboard de {auth.getUser().nombre} </div>
  )
}

export default Dashboard