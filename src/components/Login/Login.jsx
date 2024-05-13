/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import { Navigate } from 'react-router-dom';

function Login() {
  // Estados para guardar los datos del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Estado para mostrar mensaje de error
  const [errorResponse, setErrorResponse] = useState('');

  // Hook para obtener el estado de autenticación
  const auth = useAuth();

  // Hook para redireccionar a otra página
  const goTo = useNavigate();

  // Función para enviar los datos del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar que el formulario recargue la página

    try {
      // Enviar los datos del formulario al backend
      const response = await fetch('http://localhost:3000/appTaxio/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          correo_electronico: email,
          contraseña: password
        })
      });

      // Manejar la respuesta del backend
      if (response.ok) {
        console.log('Usuario logueado con éxito');
        setErrorResponse('');

        // Guardar el token de acceso y de refresco en el local storage
        const json = await response.json();
        if (json.body.accessToken && json.body.refreshToken) {
          auth.saveUser(json);
          if(json.body.usuario.rol === 'admin'){
            goTo('/dashboard');
          }else{
            goTo('/cliente');
          }
        }
      } else {
        const json = await response.json();
        setErrorResponse(json.body.message);
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      setErrorResponse('Error al procesar la solicitud. Inténtalo de nuevo más tarde.');
    }
  };

  // Si el usuario ya está autenticado, redirigir a la página de dashboard
  if (auth.isAuth) {
    return <Navigate to='/dashboard' />;
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
              {errorResponse && (
                <div className="alert alert-danger" role="alert">
                  {errorResponse}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Correo Electrónico:</label>
                  <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="email" placeholder="Ingresa tu correo electrónico" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Contraseña:</label>
                  <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="password" placeholder="Ingresa tu contraseña" />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Iniciar Sesión</button>
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