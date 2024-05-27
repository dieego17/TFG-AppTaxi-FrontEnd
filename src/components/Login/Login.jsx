/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';


function parseJwt (token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

function Login() {

  //creo el estado para el email y la contraseña y guardo el valor en el estado
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Estado para mostrar/ocultar la contraseña
  const [showPassword, setShowPassword] = useState(false);

  // Función para manejar el inicio de sesión
  const handleLogin = (e) =>{
    e.preventDefault();

    const data ={
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
    .then(data => {
      if(data.token){
        localStorage.setItem('token', data.token);
        const usuario = parseJwt(data.token);
        console.log(usuario.rol);
        if(usuario.rol === 'cliente'){
          window.location.href = '/cliente';
        }else if(usuario.rol === 'admin'){
          window.location.href = '/dashboard';
        }
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
                <Link to={'/register-taxista'} className="btn btn-primary btn-block">Registro como conductor</Link>
                <Link to={'/register-cliente'} className="btn btn-primary btn-block">Registro como cliente</Link>
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