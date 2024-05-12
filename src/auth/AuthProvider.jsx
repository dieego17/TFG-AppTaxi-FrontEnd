/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useState, useEffect } from 'react';
import React from 'react'

// Crear el contexto
const AuthContext = createContext({
    isAuth: false,
    getAccessToken: () => {},
    saveUser: (json) => {},
    getRefreshToken: () => {},
    getUser: () => ({})
})

export const useAuth = () => useContext(AuthContext)

// Hook para acceder al contexto
function AuthProvider({ children }) {

    const [isAuth, setIsAuth] = useState(false)
    const [accessToken, setAccessToken] = useState('')
    const [user, setUser] = useState({})

    useEffect(() => {
      checkAuth()
    }, [])

    async function requestNewToken(token) {
      // Hacer una petición al backend para obtener un nuevo token de acceso
      const response = await fetch('http://localhost:3000/appTaxio/v1/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      if(response.ok){
        const json = await response.json()
        if(json.body.accessToken){
          return json.body.accessToken
        }else{
          return null
        }
      }
    }

    async function getUserInfo(token) {
      // Hacer una petición al backend para obtener la información del usuario
      const response = await fetch('http://localhost:3000/appTaxio/v1/usuarios', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      if(response.ok){
        const json = await response.json()
        return json
      }else{
        return null
      }
    }

    async function checkAuth(){
      if(accessToken){
        //el usuario esta autenticado
      }else{
        //el usuario no esta autenticado
        //el metodo nos devuelve el token
        const token = getRefreshToken()
        if(token){
          const newAccessToken = await requestNewToken(token)
          if(newAccessToken){
            const userInfo = await getUserInfo(newAccessToken)
            if(userInfo){
              saveSessionInfo(userInfo, newAccessToken, token)
            }
          }
        }
      }
    }

    function saveSessionInfo(userInfo, accessToken, refreshToken){
      setAccessToken(accessToken)
      setUser(userInfo)
      localStorage.setItem('token', JSON.stringify(refreshToken))
      setIsAuth(true)
    }

    function getAccessToken() {
      return accessToken
    } 

    function getRefreshToken() {
      const tokenData = localStorage.getItem('Token')
      if (tokenData) {
        const token  = JSON.parse(tokenData)
        return token
      }
      return null
    } 

    function saveUser(json) {
      saveSessionInfo(json.body.usuario, json.body.accessToken, json.body.refreshToken)
    }

    //funcion para obtener la informacion del usuario
    function getUser(){
      return user
    }

  return (
    <AuthContext.Provider value={{ isAuth, getAccessToken, saveUser, getRefreshToken, getUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider