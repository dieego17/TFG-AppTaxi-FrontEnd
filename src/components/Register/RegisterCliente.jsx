/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./registerCliente.css";
import logo from "../../assets/images/logoVerde.png";
import { registerCliente } from "../../services/registerCliente";
import {  } from "react-router-dom";

function RegisterCliente() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [DNI, setDNI] = useState("");
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
  const [metodoPago, setMetodoPago] = useState("");
  const [errorMetodoPago, setErrorMetodoPago] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
      setEmailError("Introduzca un correo válido");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const validatePassword = (password) => {
    setPasswordError("Introduzca una contraseña");
    if (password === "") {
      setPasswordError("Introduzca una contraseña");
      return false;
    } else if (password.length < 6) {
      setPasswordError("Debe tener al menos 6 caracteres");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const validateRepitePassword = (repitePassword) => {
    if (repitePassword !== password) {
      setRepitePasswordError("Las contraseñas no coinciden");
      return false;
    }
    setRepitePasswordError("");
    return true;
  };

  const validateName = (name) => {
    if (name === "") {
      setNameError("Introduzca tu nombre");
      return false;
    }
    setNameError("");
    return true;
  };

  const validateLastName = (lastName) => {
    if (lastName === "") {
      setLastNameError("Introduzca tu apellido");
      return false;
    }
    setLastNameError("");
    return true;
  };

  const validatePhone = (phone) => {
    if (phone === "") {
      setPhoneError("Introduzca tu teléfono");
      return false;
    } else if (phone.length < 9) {
      setPhoneError("Introduzca un teléfono válido");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const validarDNI = (dni) => {
    const re = /^[0-9]{8}[A-Za-z]$/;
    return re.test(dni);
  };

  const validateDNI = (DNI) => {
    if (DNI === "") {
      setDniError("Introduzca tu DNI");
      return false;
    } else if (!validarDNI(DNI)) {
      setDniError("Introduzca un DNI válido");
      return false;
    }
    setDniError("");
    return true;
  };

  const validateDireccionUsuario = (direccionUsuario) => {
    if (direccionUsuario === "") {
      setDireccionUsuarioError("Introduzca tu dirección");
      return false;
    }
    setDireccionUsuarioError("");
    return true;
  };

  const validateMetodoPago = (metodoPago) => {
    if (metodoPago === "") {
      setErrorMetodoPago("Introduzca tu pago");
      return false;
    }
    setErrorMetodoPago("");
    return true;
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    validateName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    validateLastName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    validatePhone(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };

  const handleDNIChange = (e) => {
    setDNI(e.target.value);
    validateDNI(e.target.value);
  };

  const handleDireccionUsuarioChange = (e) => {
    setDireccionUsuario(e.target.value);
    validateDireccionUsuario(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
  };

  const handleRepitePasswordChange = (e) => {
    setRepitePassword(e.target.value);
    validateRepitePassword(e.target.value);
  };

  const handleMetodoPagoChange = (e) => {
    setMetodoPago(e.target.value);
    validateMetodoPago(e.target.value);
  };

  // Función para enviar los datos del formulario
  const handleRegister = async (e) => {
    // Evitar que el formulario recargue la página
    e.preventDefault();

    // Validar los datos del formulario
    if (
      !validateName(name) ||
      !validateLastName(lastName) ||
      !validatePhone(phone) ||
      !validateEmail(email) ||
      !validatePassword(password) ||
      !validateRepitePassword(repitePassword) ||
      !validateDNI(DNI) ||
      !validateDireccionUsuario(direccionUsuario) ||
      !validateMetodoPago(metodoPago)
    ) {
      return;
    }

    const data = {
      nombre: name,
      apellidos: lastName,
      telefono: phone,
      correo_electronico: email,
      contraseña: password,
      DNI: DNI,
      direccion_usuario: direccionUsuario,
      metodo_pago: metodoPago,
    };

    // Llamar al servicio para registrar al cliente
    const response = await registerCliente(data);

    // Si hay un error en la respuesta, mostrarlo

    if (response.error) {
      setErrorResponse(response.error);
      return;
    }

    // Redirigir al usuario a la página de login
    navigate("/login");
    
  };

  return (
    <div className=" fullscreen__container--register">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-12 col-md-12 col-lg-12 p-3">
            <section className="section__login p-3 rounded">
              <article className="article__logo mb-3">
                <img className="login__logo" src={logo} alt="logo" />
                <div className="container__texto--login">
                  <h3 className="h3__register">Registro cliente</h3>
                  <p className="text__register">Crea una nueva cuenta</p>
                </div>
              </article>
              {
                errorResponse && (
                  <p className="error__login">{errorResponse}</p>
                )
              }
              <article className="article__login">
                <form className="form__login">
                  <div className="row justify-content-center text-center">
                    <div className="container__register--group col-sm-12 col-md-12 col-lg-12 col-xl-4 mb-3 text-center row justify-content-center text-center">
                      <div className="d-flex justify-content-between align-items-center">
                        <label className="label__register" htmlFor="nombre">
                          Nombre
                        </label>
                        {nameError && (
                          <p className="error__login">{nameError}</p>
                        )}
                      </div>
                      <input
                        type="text"
                        className="input__register"
                        placeholder="Introduce tu nombre"
                        onChange={handleNameChange}
                      />
                    </div>
                    <div className="container__register--group col-sm-12 col-md-12 col-lg-12 col-xl-4 mb-3 row justify-content-center text-center">
                      <div className="d-flex justify-content-between align-items-center">
                        <label className="label__register" htmlFor="apellidos">
                          Apellidos
                        </label>
                        {lastNameError && (
                          <p className="error__login">{lastNameError}</p>
                        )}
                      </div>
                      <input
                        type="text"
                        className="input__register"
                        placeholder="Introduce tus apellidos"
                        onChange={handleLastNameChange}
                      />
                    </div>
                    <div className="container__register--group col-sm-12 col-md-12 col-lg-12 col-xl-4 mb-3 row justify-content-center text-center">
                      <div className="d-flex justify-content-between align-items-center">
                        <label className="label__register" htmlFor="telefono">
                          Teléfono
                        </label>
                        {phoneError && (
                          <p className="error__login">{phoneError}</p>
                        )}
                      </div>
                      <input
                        type="text"
                        className="input__register"
                        placeholder="Introduce tu teléfono"
                        onChange={handlePhoneChange}
                      />
                    </div>
                  </div>

                  <div className="row justify-content-center text-center">
                    <div className="container__register--group col-sm-12 col-md-12 col-lg-12 col-xl-4 mb-3 row justify-content-center text-center">
                      <div className="d-flex justify-content-between align-items-center">
                        <label className="label__register" htmlFor="dni">
                          DNI
                        </label>
                        {dniError && <p className="error__login">{dniError}</p>}
                      </div>
                      <input
                        type="text"
                        className="input__register"
                        placeholder="Introduce tu DNI"
                        onChange={handleDNIChange}
                      />
                    </div>
                    <div className="container__register--group col-sm-12 col-md-12 col-lg-12 col-xl-4 mb-3 row justify-content-center text-center">
                      <div className="d-flex justify-content-between align-items-center">
                        <label className="label__register" htmlFor="metodoPago">
                          Método de pago
                        </label>
                        {errorMetodoPago && (
                          <p className="error__login">{errorMetodoPago}</p>
                        )}
                      </div>
                      <select
                        className="input__register"
                        onChange={handleMetodoPagoChange}
                        value={metodoPago}
                      >
                        <option value="">Selecciona un método de pago</option>
                        <option value="Efectivo">Efectivo</option>
                        <option value="Tarjeta de Crédito">
                          Tarjeta de Crédito
                        </option>
                      </select>
                    </div>
                    <div className="container__register--group col-sm-12 col-md-12 col-lg-12 col-xl-4 mb-3 row justify-content-center text-center ">
                      <div className="d-flex justify-content-between align-items-center">
                        <label className="label__register" htmlFor="direccion">
                          Dirección
                        </label>
                        {direccionUsuarioError && (
                          <p className="error__login">
                            {direccionUsuarioError}
                          </p>
                        )}
                      </div>
                      <input
                        type="text"
                        className="input__register"
                        placeholder="Introduce tu dirección"
                        onChange={handleDireccionUsuarioChange}
                      />
                    </div>
                  </div>
                  <div className="row justify-content-center text-center">
                    <div className="container__register--group col-sm-12 col-md-12 col-lg-12 col-xl-4 mb-3 row justify-content-center text-center">
                      <div className="d-flex justify-content-between align-items-center">
                        <label className="label__register" htmlFor="email">
                          Email
                        </label>
                        {emailError && (
                          <p className="error__login">{emailError}</p>
                        )}
                      </div>
                      <input
                        type="email"
                        className="input__register"
                        placeholder="Introduce tu email"
                        onChange={handleEmailChange}
                      />
                    </div>
                    <div className="container__register--group col-sm-12 col-md-12 col-lg-12 col-xl-4 mb-3 row justify-content-center text-center">
                      <div className="d-flex justify-content-between align-items-center">
                        <label className="label__register" htmlFor="password">
                          Contraseña
                        </label>
                        {passwordError && (
                          <p className="error__login">{passwordError}</p>
                        )}
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="input__register input__password"
                        placeholder="Introduce tu contraseña"
                        onChange={handlePasswordChange}
                      />
                      <span
                        className={`fa ${
                          showPassword ? "fa-unlock" : "fa-lock"
                        } icono__password--register`}
                        onClick={() => setShowPassword(!showPassword)}
                      ></span>
                    </div>
                    <div className="container__register--group col-sm-12 col-md-12 col-lg-12 col-xl-4 mb-3 row justify-content-center text-center">
                      <div className="d-flex justify-content-between align-items-center">
                        <label
                          className="label__register"
                          htmlFor="passwordRepet"
                        >
                          Confrimar la contraseña
                        </label>
                        {repitePasswordError && (
                          <p className="error__login">{repitePasswordError}</p>
                        )}
                      </div>
                      <input
                        type={showPasswordRepet ? "text" : "password"}
                        className="input__register input__password"
                        placeholder="Introduce tu contraseña"
                        onChange={handleRepitePasswordChange}
                      />
                      <span
                        className={`fa ${
                          showPasswordRepet ? "fa-unlock" : "fa-lock"
                        } icono__password--register`}
                        onClick={() => setShowPasswordRepet(!showPasswordRepet)}
                      ></span>
                    </div>
                  </div>
                  <div className="container__register--group mb-3 mt-4 text-center">
                    <button
                      type="submit"
                      className="boton__registro"
                      onClick={handleRegister}
                    >
                      Registrarse
                    </button>
                  </div>
                </form>
              </article>

              <article className="article__login--out text-center">
                <Link className="link__out" to="/login">
                  Volver
                </Link>
              </article>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterCliente;
