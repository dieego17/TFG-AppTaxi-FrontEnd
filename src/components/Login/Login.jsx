/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import './login.css'
import { Link } from 'react-router-dom'


function Login() {

  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => { 
    e.preventDefault()
    console.log({user, password})
    const data = {user, password}

    fetch('http://localhost:3000/appTaxi/v1/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    .then(response => response.json())
    .then(result =>{console.log(result)})
  }

  return (
    <div>
      <form action="">
        <input onChange={(e) => {setUser(e.target.value)}} type="text" placeholder="Usuario"/>
        <input onChange={(e) => {setPassword(e.target.value)}} type="password" placeholder="Contraseña"/>
        <button type='submit' onClick={handleLogin} >Iniciar Sesión</button>
      </form>
      <Link to={'/'}>
        Volver
      </Link>
    </div>
    
  )
}

export default Login