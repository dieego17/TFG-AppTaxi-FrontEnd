/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./registerTaxista.css";
import logo from "../../assets/images/logoVerde.png";
import { registerTaxista } from "../../services/registerTaxista";

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
    setNameError(newName ? "" : "Introduzca tu nombre.");
  };

  const handleLastNameChange = (e) => {
    const newLastName = e.target.value;
    setLastName(newLastName);
    setLastNameError(newLastName ? "" : "Introduzca tus apellidos.");
  };

  const handleDNIChange = (e) => {
    const newDNI = e.target.value;
    setDNI(newDNI);
    setDniError(newDNI ? "" : "Introduzca tu DNI.");
  };

  const handleDireccionUsuarioChange = (e) => {
    const newDireccionUsuario = e.target.value;
    setDireccionUsuario(newDireccionUsuario);
    setDireccionUsuarioError(
      newDireccionUsuario ? "" : "Introduzca tu dirección."
    );
  };

  const handleNumeroCuentaChange = (e) => {
    const newNumeroCuenta = e.target.value;
    setNumeroCuenta(newNumeroCuenta);
    if (newNumeroCuenta.length < 5 || newNumeroCuenta.length > 20) {
      setErrorNumCuenta("El número cuenta debe tener entre 5 y 20 caracteres");
    } else if (newNumeroCuenta === "") {
      setErrorNumCuenta("Introduzca un número de cuenta.");
    } else {
      setErrorNumCuenta("");
    }
  };

  const handlePhoneChange = (e) => {
    const newPhone = e.target.value;
    setPhone(newPhone);
    setPhoneError(newPhone ? "" : "Introduzca tu teléfono.");
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setEmailError(
      newEmail
        ? validateEmail(newEmail)
          ? ""
          : "Introduzca un correo válido"
        : "Introduzca un correo válido"
    );
  };

  const handleVehiculoChange = (e) => {
    const newVehiculo = e.target.value;
    setVehiculo(newVehiculo);
    setErrorVehiculo(newVehiculo ? "" : "Introduzca un vehículo.");
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError(
      newPassword
        ? validatePassword(newPassword)
          ? ""
          : "Debe tener al menos 6 caracteres."
        : "Introduzca una contraseña"
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
  const handleRegister = async (e) => {
    // Evitar que el formulario recargue la página
    e.preventDefault();

    // Validar que las contraseñas coincidan
    if (password !== repitePassword) {
      console.log("Las contraseñas no coinciden");
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
      numero_cuenta: numeroCuenta,
      vehiculo: vehiculo,
    };

    // enviar los datos al backend
    const response = await registerTaxista(data);

    if (response.error) {
      setErrorResponse(response.error);
      return;
    }

  };

  return (
    <div className="container-fluid fullscreen__container--registerTaxista d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-12 col-md-12 col-lg-12 p-3">
            <section className="section__login p-3 rounded">
              <article className="article__logo mb-3">
                <img className="login__logo" src={logo} alt="logo" />
                <div className="container__texto--login">
                  <h3>Registro taxista</h3>
                  <p>Crea una nueva cuenta</p>
                </div>
              </article>
              <article className="article__login">
                <form className="form__login">
                  <div className="row justify-content-center text-center">
                    <div className="container__inputs--register col-sm-12 col-md-12 col-lg-12 col-xl-4 mb-5 text-center row justify-content-center text-center">
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
                    <div className="container__inputs--register col-sm-12 col-md-12 col-lg-12 col-xl-4 mb-5 row justify-content-center text-center">
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
                    <div className="container__inputs--register col-sm-12 col-md-12 col-lg-12 col-xl-4 mb-5 row justify-content-center text-center">
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
                    <div className="container__inputs--register col-sm-12 col-md-12 col-lg-12 col-xl-4 mb-5 row justify-content-center text-center">
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
                    <div className="container__inputs--register col-sm-12 col-md-12 col-lg-12 col-xl-4 mb-5 row justify-content-center text-center ">
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
                    <div className="container__inputs--register col-sm-12 col-md-12 col-lg-12 col-xl-4 mb-5 row justify-content-center text-center ">
                      <div className="d-flex justify-content-between align-items-center">
                        <label className="label__register" htmlFor="numCuenta">
                          Número de cuenta
                        </label>
                        {errorNumCuenta && (
                          <p className="error__login">{errorNumCuenta}</p>
                        )}
                      </div>
                      <input
                        type="text"
                        className="input__register"
                        placeholder="Introduce tu número de cuenta"
                        onChange={handleNumeroCuentaChange}
                      />
                    </div>
                  </div>
                  <div className="row justify-content-center text-center">
                    <div className="container__inputs--register col-sm-12 col-md-12 col-lg-12 col-xl-4 mb-5 row justify-content-center text-center">
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
                        placeholder="Introduce tu correo electrónico"
                        onChange={handleEmailChange}
                      />
                    </div>
                    <div className="container__inputs--register col-sm-12 col-md-12 col-lg-12 col-xl-4 mb-5 row justify-content-center text-center">
                      <div className="d-flex justify-content-between align-items-center">
                        <label className="label__register" htmlFor="vehiculo">
                          Vehículo
                        </label>
                        {errorVehiculo && (
                          <p className="error__login">{errorVehiculo}</p>
                        )}
                      </div>
                      <input
                        type="text"
                        className="input__register"
                        placeholder="Introduce tu vehículo"
                        onChange={handleVehiculoChange}
                      />
                    </div>
                  </div>
                  <div className="row justify-content-center text-center">
                    <div className="container__inputs--register col-sm-12 col-md-12 col-lg-12 col-xl-4 mb-5 row justify-content-center text-center">
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
                        className="input__register"
                        placeholder="Introduce tu contraseña"
                        onChange={handlePasswordChange}
                      />
                      <span
                        className={`fa ${
                          showPassword ? "fa-unlock" : "fa-lock"
                        } icono__password--taxista`}
                        onClick={() => setShowPassword(!showPassword)}
                      ></span>
                    </div>
                    <div className="container__inputs--register col-sm-12 col-md-12 col-lg-12 col-xl-4 mb-5 row justify-content-center text-center">
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
                        className="input__register"
                        placeholder="Introduce de nuevo tu contraseña"
                        onChange={handleRepitePasswordChange}
                      />
                      <span
                        className={`fa ${
                          showPasswordRepet ? "fa-unlock" : "fa-lock"
                        } icono__password--taxista`}
                        onClick={() => setShowPasswordRepet(!showPasswordRepet)}
                      ></span>
                    </div>
                  </div>
                  <div className="container__inputs--register mb-3 mt-4 text-center">
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

export default RegisterTaxista;
