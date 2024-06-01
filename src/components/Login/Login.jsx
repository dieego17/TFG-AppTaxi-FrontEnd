/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { login } from "../../services/login";
import logo from "../../assets/images/logoVerde.png";
import img__login from "../../assets/images/login.webp";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPass, setErrorPass] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
      setErrorEmail("Introduzca un correo válido");
      return false;
    } else {
      setErrorEmail("");
      return true;
    }
  };

  const validatePassword = (password) => {
    if (password === "") {
      setErrorPass("Introduzca una contraseña");
      return false;
    } else if (password.length < 6) {
      setErrorPass("Debe tener al menos 6 caracteres");
      return false;
    } else {
      setErrorPass("");
      return true;
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email) || !validatePassword(password)) {
      return;
    }

    const data = {
      correo_electronico: email,
      contraseña: password,
    };

    try {
      await login(data);
    } catch (error) {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="container-fluid fullscreen__container">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-12 col-md-8 col-lg-5 p-3">
            <section className="section__Login p-3 rounded">
              <article className="article__link--register mb-3 d-flex justify-content-center">
                <Link
                  to="/register-taxista"
                  className="link__register link__register--taxista me-2"
                >
                  Registrarse como conductor
                </Link>
                <Link
                  to="/register-cliente"
                  className="link__register link__register--cliente ms-2"
                >
                  Registrarse como cliente
                </Link>
              </article>
              <article className="article__logo mb-3">
                <img className="login__logo" src={logo} alt="logo" />
                <div className="container__texto--login">
                  <h3 className="h3__login">¡Bienvenido de nuevo!</h3>
                  <p className="p__login">Inicia sesión en tu cuenta</p>
                </div>
              </article>
              <article className="article__login">
                <form className="form__login">
                  {error && <p className="error__login">{error}</p>}
                  <div className="container__login--group mb-3">
                    <div className="d-flex justify-content-between align-items-center col-12">
                      <label className="label__login" htmlFor="email">
                        Email
                      </label>
                      {errorEmail && (
                        <p className="error__login">{errorEmail}</p>
                      )}
                    </div>
                    <input
                      type="email"
                      className="input__Login"
                      placeholder="Introduce tu correo electrónico"
                      onChange={handleEmailChange}
                    />
                  </div>
                  <div className="container__login--group mb-3 ">
                    <div className="d-flex justify-content-between align-items-center col-12">
                      <label className="label__login" htmlFor="password">
                        Contraseña
                      </label>
                      {errorPass && <p className="error__login">{errorPass}</p>}
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="input__Login"
                      placeholder="Introduce tu contraseña"
                      onChange={handlePasswordChange}
                    />
                    <span
                      className={`fa ${
                        showPassword ? "fa-unlock" : "fa-lock"
                      } icono__password--Login`}
                      onClick={() => setShowPassword(!showPassword)}
                    ></span>
                  </div>
                  <div className="container__forgot--password mb-3">
                    <Link to="/forgot-password" className="link__forgot">
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                  <div className="container__login--group mb-3">
                    <button
                      onClick={handleLogin}
                      type="submit"
                      className="boton__Login"
                    >
                      Iniciar Sesión
                    </button>
                  </div>
                </form>
              </article>
              <article className="article__login--out text-center">
                <Link className="link__out" to="/">
                  Volver
                </Link>
              </article>
            </section>
          </div>
          <div className="col-12 col-lg-6 d-none d-lg-block container__imagen p-3">
            <img src={img__login} alt="Login" className="img-fluid rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
