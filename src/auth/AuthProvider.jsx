/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useState, useEffect } from 'react';
import React from 'react'

// Crear el contexto
const AuthContext = createContext({
    isAuth: false
})

export const useAuth = () => useContext(AuthContext)

// Hook para acceder al contexto
function AuthProvider({ children }) {

    const [isAuth, setIsAuth] = useState(false)

  return (
    <AuthContext.Provider value={{ isAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider