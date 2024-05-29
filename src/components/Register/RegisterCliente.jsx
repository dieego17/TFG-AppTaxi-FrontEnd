/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./registerCliente.css";
import logo from "../../assets/images/logoVerde.png";

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
      setPasswordError("La contraseña debe tener al menos 6 caracteres");
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
    }else if (phone.length < 9) {
      setPhoneError("Introduzca un teléfono válido");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const validateDNI = (DNI) => {
    if (DNI === "") {
      setDniError("Introduzca tu DNI");
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
      setErrorMetodoPago("Introduzca tu método de pago");
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

    // Enviar los datos del formulario al backend
    try {
      const response = await fetch(
        "http://localhost:3000/appTaxio/v1/register/cliente",
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
            metodo_pago: metodoPago,
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
    <div className="container-fluid fullscreen__container--register d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-12 col-md-12 col-lg-12 p-3">
            <section className="section__login p-3 rounded">
              <article className="article__logo mb-3">
                <img className="login__logo" src={logo} alt="logo" />
                <div className="container__texto--login">
                  <h3>Registro cliente</h3>
                  <p>Crea una nueva cuenta</p>
                </div>
              </article>
              <article className="article__login">
                <form className="form__login">
                  <div className="row justify-content-center text-center">
                    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-4 mb-3 text-center row justify-content-center text-center">
                      <label className="label__register" htmlFor="nombre">
                        Nombre
                      </label>
                      <input
                        type="text"
                        className="input__register"
                        placeholder="Introduce tu nombre"
                        onChange={handleNameChange}
                      />
                      {nameError && <p className="error__login">{nameError}</p>}
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-4 mb-3 row justify-content-center text-center">
                      <label className="label__register" htmlFor="apellidos">
                        {" "}
                        Apellidos
                      </label>
                      <input
                        type="text"
                        className="input__register"
                        placeholder="Introduce tus apellidos"
                        onChange={handleLastNameChange}
                      />
                      {lastNameError && (
                        <p className="error__login">{lastNameError}</p>
                      )}
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-4 mb-3 row justify-content-center text-center">
                      <label className="label__register" htmlFor="telefono">
                        Teléfono
                      </label>
                      <input
                        type="text"
                        className="input__register"
                        placeholder="Introduce tu teléfono"
                        onChange={handlePhoneChange}
                      />
                      {phoneError && (
                        <p className="error__login">{phoneError}</p>
                      )}
                    </div>
                  </div>

                  <div className="row justify-content-center text-center">
                    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-4 mb-3 row justify-content-center text-center">
                      <label className="label__register" htmlFor="dni">
                        DNI
                      </label>
                      <input
                        type="text"
                        className="input__register"
                        placeholder="Introduce tu DNI"
                        onChange={handleDNIChange}
                      />
                      {dniError && <p className="error__login">{dniError}</p>}
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-4 mb-3 row justify-content-center text-center">
                      <label className="label__register" htmlFor="pago">
                        Método de Pago
                      </label>
                      <select
                        className="input__register"
                        onChange={handleMetodoPagoChange}
                        value={metodoPago}
                      >
                        <option value="">Selecciona un método de pago</option>
                        <option value="Efectivo">Efectivo</option>
                        <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
                      </select>
                      {errorMetodoPago && (
                        <p className="error__login">{errorMetodoPago}</p>
                      )}
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-4 mb-3 row justify-content-center text-center ">
                      <label className="label__register" htmlFor="dirección">
                        Dirección
                      </label>
                      <input
                        type="text"
                        className="input__register"
                        placeholder="Introduce tu dirección"
                        onChange={handleDireccionUsuarioChange}
                      />
                      {direccionUsuarioError && (
                        <p className="error__login">{direccionUsuarioError}</p>
                      )}
                    </div>
                  </div>
                  <div className="row justify-content-center text-center">
                    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-4 mb-3 row justify-content-center text-center">
                      <label className="label__register" htmlFor="email">
                        Correo Electrónico
                      </label>
                      <input
                        type="email"
                        className="input__register"
                        placeholder="Introduce tu correo electrónico"
                        onChange={handleEmailChange}
                      />
                      {emailError && (
                        <p className="error__login">{emailError}</p>
                      )}
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-4 mb-3 row justify-content-center text-center">
                      <label className="label__register" htmlFor="password">
                        Contraseña
                      </label>
                      <div className="container__password position-relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="input__register"
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
                      {passwordError && (
                        <p className="error__login">{passwordError}</p>
                      )}
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-4 mb-3 row justify-content-center text-center">
                      <label className="label__register" htmlFor="password">
                        Confirma la Contraseña
                      </label>
                      <div className="container__password position-relative">
                        <input
                          type={showPasswordRepet ? "text" : "password"}
                          className="input__register"
                          placeholder="Introduce de nuevo tu contraseña"
                          onChange={handleRepitePasswordChange}
                        />
                        <span
                          className={`fa ${
                            showPasswordRepet ? "fa-unlock" : "fa-lock"
                          } icono__password--register`}
                          onClick={() =>
                            setShowPasswordRepet(!showPasswordRepet)
                          }
                        ></span>
                      </div>
                      {repitePasswordError && (
                        <p className="error__login">{repitePasswordError}</p>
                      )}
                    </div>
                  </div>
                  <div className="container__login--group mb-3 mt-4 text-center">
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
