/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import { Navigate } from 'react-router-dom';

function Login() {
  // Estados para guardar los datos del formulario y errores
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorResponse, setErrorResponse] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Estado para mostrar/ocultar la contraseña
  const [showPassword, setShowPassword] = useState(false);

  // Hook para obtener el estado de autenticación
  const auth = useAuth();

  // Hook para redireccionar a otra página
  const goTo = useNavigate();

  // Función para validar el correo electrónico
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  // Función para validar la contraseña
  const validatePassword = (password) => {
    return password.length >= 6; // mínimo 6 caracteres
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!e.target.value) {
      setEmailError('Por favor ingresa tu correo electrónico.');
    } else if (!validateEmail(e.target.value)) {
      setEmailError('Por favor ingresa un correo electrónico válido.');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (!e.target.value) {
      setPasswordError('Por favor ingresa tu contraseña.');
    } else if (!validatePassword(e.target.value)) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres.');
    } else {
      setPasswordError('');
    }
  };

  // Función para enviar los datos del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar que el formulario recargue la página

    // Reiniciar errores
    setEmailError('');
    setPasswordError('');
    setErrorResponse('');

    // Validar campos
    if (!email || !validateEmail(email)) {
      setEmailError('Por favor ingresa un correo electrónico válido.');
      return;
    }

    if (!password || !validatePassword(password)) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

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
          console.log(json)
          if(json.body.usuario.rol === 'admin'){
            goTo('/dashboard');
          }else if(json.body.usuario.rol === 'cliente'){
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
                  <input 
                    value={email} 
                    onChange={handleEmailChange} 
                    type="email" 
                    className="form-control" 
                    placeholder="Ingresa tu correo electrónico" 
                  />
                  {emailError && <div className="text-danger">{emailError}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="password">Contraseña:</label>
                  <div className="input-group">
                    <input 
                      value={password} 
                      onChange={handlePasswordChange} 
                      type={showPassword ? "text" : "password"} 
                      className="form-control" 
                      placeholder="Ingresa tu contraseña" 
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`} onClick={() => setShowPassword(!showPassword)}></i>
                      </span>
                    </div>
                  </div>
                  {passwordError && <div className="text-danger">{passwordError}</div>}
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