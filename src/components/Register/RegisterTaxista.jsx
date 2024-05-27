/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function RegisterTaxista() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [DNI, setDNI] = useState("");
  const [numeroCuenta, setNumeroCuenta] = useState(""); 
  const [errorNumCuenta, setErrorNumCuenta] = useState("");
  const [direccionUsuario, setDireccionUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [repitePassword, setRepitePassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [dniError, setDniError] = useState("");
  const [direccionUsuarioError, setDireccionUsuarioError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repitePasswordError, setRepitePasswordError] = useState("");
  const [errorResponse, setErrorResponse] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepet, setShowPasswordRepet] = useState(false);
  const [vehiculo, setVehiculo] = useState("");
  const [errorVehiculo, setErrorVehiculo] = useState("");
  const navigate = useNavigate();

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
    setNameError(newName ? "" : "Por favor ingresa tu nombre.");
  };

  const handleLastNameChange = (e) => {
    const newLastName = e.target.value;
    setLastName(newLastName);
    setLastNameError(newLastName ? "" : "Por favor ingresa tus apellidos.");
  };

  const handleDNIChange = (e) => {
    const newDNI = e.target.value;
    setDNI(newDNI);
    setDniError(newDNI ? "" : "Por favor ingresa tu DNI.");
  };

  const handleDireccionUsuarioChange = (e) => {
    const newDireccionUsuario = e.target.value;
    setDireccionUsuario(newDireccionUsuario);
    setDireccionUsuarioError(
      newDireccionUsuario ? "" : "Por favor ingresa tu dirección."
    );
  };

  const handleNumeroCuentaChange = (e) => {
    const newNumeroCuenta = e.target.value;
    setNumeroCuenta(newNumeroCuenta);
    setErrorNumCuenta(newNumeroCuenta ? "" : "Por favor ingresa tu número de cuenta.");
  };

  const handlePhoneChange = (e) => {
    const newPhone = e.target.value;
    setPhone(newPhone);
    setPhoneError(newPhone ? "" : "Por favor ingresa tu teléfono.");
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setEmailError(
      newEmail
        ? validateEmail(newEmail)
          ? ""
          : "Por favor ingresa un correo electrónico válido."
        : "Por favor ingresa tu correo electrónico."
    );
  };

  const handleVehiculoChange = (e) => {
    const newVehiculo = e.target.value;
    setVehiculo(newVehiculo);
    setErrorVehiculo(newVehiculo ? "" : "Por favor ingresa tu vehículo.");
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError(
      newPassword
        ? validatePassword(newPassword)
          ? ""
          : "La contraseña debe tener al menos 6 caracteres."
        : "Por favor ingresa tu contraseña."
    );
  };

  const handleRepitePasswordChange = (e) => {
    const newPasswordRepeat = e.target.value;
    setRepitePassword(newPasswordRepeat);
    setRepitePasswordError(
      newPasswordRepeat === password ? "" : "Las contraseñas no coinciden."
    );
  };

  // Función para enviar los datos del formulario
  const handleSubmit = async (e) => {
    // Evitar que el formulario recargue la página
    e.preventDefault();

    // Validar que las contraseñas coincidan
    if (password !== repitePassword) {
      console.log("Las contraseñas no coinciden");
      return;
    }

    // Enviar los datos del formulario al backend
    try {
      const response = await fetch(
        "http://localhost:3000/appTaxio/v1/register/taxista",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: name,
            apellidos: lastName,
            telefono: phone,
            correo_electronico: email,
            contraseña: password,
            DNI: DNI,
            direccion_usuario: direccionUsuario,
            numero_cuenta: numeroCuenta,
            vehiculo: vehiculo
          }),
        }
      );

      if (response.status === 200) {
        console.log("Usuario registrado con éxito");
        setErrorResponse("");
        navigate("/login");
      } else if (response.status === 400) {
        const json = await response.json();
        setErrorResponse(json.body.message);
      }
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
      setErrorResponse(
        "Error al procesar la solicitud. Inténtalo de nuevo más tarde."
      );
    }
  };

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
                  {lastNameError && (
                    <div className="text-danger">{lastNameError}</div>
                  )}
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
                  {phoneError && (
                    <div className="text-danger">{phoneError}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="DNI">DNI:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ingresa tu DNI"
                    value={DNI}
                    onChange={handleDNIChange}
                  />
                  {dniError && <div className="text-danger">{dniError}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="direccionUsuario">Dirección:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ingresa tu dirección"
                    value={direccionUsuario}
                    onChange={handleDireccionUsuarioChange}
                  />
                  {direccionUsuarioError && (
                    <div className="text-danger">{direccionUsuarioError}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="numeroCuenta">Número de cuenta:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ingresa tu número de cuenta"
                    value={numeroCuenta}
                    onChange={handleNumeroCuentaChange}
                  />
                  {errorNumCuenta && (
                    <div className="text-danger">{errorNumCuenta}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="numeroCuenta">Vehículo:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ingresa tu número de cuenta"
                    value={vehiculo}
                    onChange={handleVehiculoChange}
                  />
                  {errorNumCuenta && (
                    <div className="text-danger">{errorNumCuenta}</div>
                  )}
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
                  {emailError && (
                    <div className="text-danger">{emailError}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="password">Contraseña:</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  {passwordError && (
                    <div className="text-danger">{passwordError}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="repitePassword">Repetir Contraseña:</label>
                  <input
                    type={showPasswordRepet ? "text" : "password"}
                    className="form-control"
                    placeholder="Repite tu contraseña"
                    value={repitePassword}
                    onChange={handleRepitePasswordChange}
                  />
                  {repitePasswordError && (
                    <div className="text-danger">{repitePasswordError}</div>
                  )}
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

export default RegisterTaxista;
