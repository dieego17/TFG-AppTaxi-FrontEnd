/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';

function Login() {

  //creo el estado para el email y la contraseña y guardo el valor en el estado
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Estado para mostrar/ocultar la contraseña
  const [showPassword, setShowPassword] = useState(false);

  // Función para manejar el inicio de sesión
  const handleLogin = (e) =>{
    e.preventDefault();

    // Crear un objeto con los datos del formulario
    const data = {
      correo_electronico: email,
      contraseña: password
    }

    // Hacer una petición POST a la API para iniciar sesión
    fetch('http://localhost:3000/appTaxio/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    // Guardar el token en el localStorage
    .then(data => {
      if(data.token){
        const token = data.token
        localStorage.setItem('token', token)
      }
    })


    console.log({correo_electronico: email, contraseña: password});
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
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="Ingresa tu correo electrónico" 
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Contraseña:</label>
                  <div className="input-group">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      className="form-control" 
                      placeholder="Ingresa tu contraseña" 
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`} onClick={() => setShowPassword(!showPassword)}></i>
                      </span>
                    </div>
                  </div>
                </div>
                <button onClick={handleLogin} type="submit" className="btn btn-primary btn-block">Iniciar Sesión</button>
                <Link to={'/register'} className="btn btn-primary btn-block">Registro</Link>
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

export default Login;