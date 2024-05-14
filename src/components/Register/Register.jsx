/* eslint-disable no-unused-vars */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from '../../auth/AuthProvider'
import { Navigate } from 'react-router-dom'


function Register() {

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repitePassword, setRepitePassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [repitePasswordError, setRepitePasswordError] = useState('');
  const [errorResponse, setErrorResponse] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepet, setShowPasswordRepet] = useState(false);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    if (!newName) {
      setNameError('Por favor ingresa tu nombre.');
    } else {
      setNameError('');
    }
  };

  const handleLastNameChange = (e) => {
    const newLastName = e.target.value;
    setLastName(newLastName);
    if (!newLastName) {
      setLastNameError('Por favor ingresa tus apellidos.');
    } else {
      setLastNameError('');
    }
  };

  const handlePhoneChange = (e) => {
    const newPhone = e.target.value;
    setPhone(newPhone);
    if (!newPhone) {
      setPhoneError('Por favor ingresa tu teléfono.');
    } else {
      setPhoneError('');
    }
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (!newEmail) {
      setEmailError('Por favor ingresa tu correo electrónico.');
    } else if (!validateEmail(newEmail)) {
      setEmailError('Por favor ingresa un correo electrónico válido.');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (!newPassword) {
      setPasswordError('Por favor ingresa tu contraseña.');
    } else if (!validatePassword(newPassword)) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres.');
    } else {
      setPasswordError('');
    }
  };

  const handleRepitePasswordChange = (e) => {
    const newPasswordRepeat = e.target.value;
    setRepitePassword(newPasswordRepeat);
    if (newPasswordRepeat !== password) {
      setRepitePasswordError('Las contraseñas no coinciden.');
    } else {
      setRepitePasswordError('');
    }
  };


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
    try {
      const response = await fetch('http://localhost:3000/appTaxio/v1/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: name,
          apellidos: lastName,
          telefono: phone,
          correo_electronico: email,
          contraseña: password,
        }),
      });

      if (response.status === 200) {
        console.log('Usuario registrado con éxito');
        setErrorResponse('');
        goTo('/login');
      } else if (response.status === 400) {
        const json = await response.json();
        setErrorResponse(json.body.message);
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      setErrorResponse('Error al procesar la solicitud. Inténtalo de nuevo más tarde.');
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
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Nombre:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ingresa tu nombre"
                    value={name}
                    onChange={handleNameChange}
                  />
                  {nameError && <div className="text-danger">{nameError}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Apellidos:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ingresa tus apellidos"
                    value={lastName}
                    onChange={handleLastNameChange}
                  />
                  {lastNameError && <div className="text-danger">{lastNameError}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Teléfono:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ingresa tu teléfono"
                    value={phone}
                    onChange={handlePhoneChange}
                  />
                  {phoneError && <div className="text-danger">{phoneError}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Correo Electrónico:</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Ingresa tu correo electrónico"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  {emailError && <div className="text-danger">{emailError}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="password">Contraseña:</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="Ingresa tu contraseña"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`} onClick={() => setShowPassword(!showPassword)}></i>
                      </span>
                    </div>
                  </div>
                  {passwordError && <div className="text-danger">{passwordError}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="repitePassword">Repetir Contraseña:</label>
                  <div className="input-group">
                    <input
                      type={showPasswordRepet ? "text" : "password"}
                      className="form-control"
                      placeholder="Repite tu contraseña"
                      value={repitePassword}
                      onChange={handleRepitePasswordChange}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className={`fa ${showPasswordRepet ? "fa-eye-slash" : "fa-eye"}`} onClick={() => setShowPasswordRepet(!showPasswordRepet)}></i>
                      </span>
                    </div>
                  </div>
                  {repitePasswordError && <div className="text-danger">{repitePasswordError}</div>}
                </div>
                <button type="submit" className="btn btn-primary btn-block" >Registrarse</button>
                <Link to={'/login'} className="btn btn-primary btn-block">Volver</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

