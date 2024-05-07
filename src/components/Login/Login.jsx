/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import './login.css'
import { Link } from 'react-router-dom'
import Cliente from '../Cliente/Cliente'


function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [login, setLogin] = useState(false)

  const handleLogin = (e) =>{
    e.preventDefault(); // Evitar que el formulario se envíe automáticamente
    console.log({email, password})
  
    const data = {
      email,
      password
    }
  
    fetch('http://localhost:3000/appTaxi/v1/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  
    .then(response => response.json())
    .then(result =>{
      console.log(result.token)
      if(result.token){
        localStorage.setItem('token', result.token)
        setLogin(true)
      }
    })
  }

  return (
    
    <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card">
          <div className="card-header">
            <h3 className="text-center">Iniciar Sesión</h3>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="email">Correo Electrónico:</label>
                <input onChange={(e) =>{ setEmail(e.target.value) }} type="email" className="form-control" id="email" placeholder="Ingresa tu correo electrónico" required />
              </div>
              <div className="form-group">
                <label htmlFor="password">Contraseña:</label>
                <input onChange={(e) =>{ setPassword(e.target.value) }} type="password" className="form-control" id="password" placeholder="Ingresa tu contraseña" required />
              </div>
              <button type="submit" onClick={handleLogin} className="btn btn-primary btn-block">Iniciar Sesión</button>
              <Link to={'/register'} className="btn btn-primary btn-block">Registrarse</Link>
            </form>
          </div>
        </div>
      </div>
    </div>
    <Link to={'/'}>
    Volver
  </Link>
  </div> 
    
  );
}

export default Login

    