/* eslint-disable no-unused-vars */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from '../../auth/AuthProvider'
import { Navigate } from 'react-router-dom'
import bcrypt from 'bcryptjs'


function Register() {

  // Estados para guardar los datos del formulario
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repitePassword, setRepitePassword] = useState('')

  // Estado para mostrar/ocultar la contraseña
  const [showPassword, setShowPassword] = useState(false); 
  const [showPasswordRepet, setShowPasswordRepet] = useState(false); 
  
  // Estado para mostrar mensaje de error
  const [errorResponse, setErrorResponse] = useState('')


  // Hook para obtener el estado de autenticación
  const auth = useAuth()

  // Hook para redireccionar a otra página
  const goTo = useNavigate()

  // Función para enviar los datos del formulario
  const handleSubmit = async (e) => {
    // Evitar que el formulario recargue la página
    e.preventDefault();

    // Validar que las contraseñas coincidan
    if(password !== repitePassword){
      console.log('Las contraseñas no coinciden')
      return
    }

    // Enviar los datos del formulario al backend
    const response = await fetch('http://localhost:3000/appTaxio/v1/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre: name,
        apellidos: lastName,
        telefono: phone,
        correo_electronico: email,
        contraseña: password
      })
    })
    // Manejar la respuesta del backend
    if(response.status === 400){
      const json = await response.json()
      console.log(json)
      setErrorResponse(json.body.message)

    }else if(response.status === 200){
      console.log('Usuario registrado con éxito')
      setErrorResponse('')
      goTo('/login')
    }
    

  }

  // Si el usuario ya está autenticado, redirigirlo al dashboard
  if(auth.isAuth){
    return <Navigate to='/dashboard' />
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">Crear Cuenta</h3>
            </div>
            <div className="card-body">
              {
               errorResponse && <div className="alert alert-danger" role="alert"> {errorResponse} </div> }
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Nombre:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ingresa tu nombre"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="name">Apellidos:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ingresa tu nombre"
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="name">Teléfono:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ingresa tu nombre"
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Correo Electrónico:</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Ingresa tu correo electrónico"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Contraseña:</label>
                  <div className="input-group">
                    <input onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : "password"} className="form-control" id="password" placeholder="Ingresa tu contraseña" />
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`} onClick={() => setShowPassword(!showPassword)}></i>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="password">Repetir Contraseña:</label>
                  <div className="input-group">
                    <input onChange={(e) => setRepitePassword(e.target.value)} type={showPasswordRepet ? "text" : "password"} className="form-control" id="password" placeholder="Ingresa tu contraseña" />
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className={`fa ${showPasswordRepet ? "fa-eye-slash" : "fa-eye"}`} onClick={() => setShowPasswordRepet(!showPasswordRepet)}></i>
                      </span>
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">
                  Registrarse
                </button>
                <Link to={"/login"} className="btn btn-primary btn-block">
                  Volver
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
