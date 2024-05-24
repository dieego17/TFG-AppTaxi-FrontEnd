/* eslint-disable no-unused-vars */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Navigate } from 'react-router-dom'


function Register() {

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepet, setShowPasswordRepet] = useState(false);

  

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">Crear Cuenta</h3>
            </div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label htmlFor="name">Nombre:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ingresa tu nombre"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Apellidos:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ingresa tus apellidos"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="DNI">DNI:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ingresa tu DNI"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="direccion">Dirección:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ingresa tu direccion"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Teléfono:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ingresa tu teléfono"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Correo Electrónico:</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Ingresa tu correo electrónico"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Contraseña:</label>
                  <div className="input-group">
                    <input
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
                </div>
                <div className="form-group">
                  <label htmlFor="repitePassword">Repetir Contraseña:</label>
                  <div className="input-group">
                    <input
                      type={showPasswordRepet ? "text" : "password"}
                      className="form-control"
                      placeholder="Repite tu contraseña"
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className={`fa ${showPasswordRepet ? "fa-eye-slash" : "fa-eye"}`} onClick={() => setShowPasswordRepet(!showPasswordRepet)}></i>
                      </span>
                    </div>
                  </div>
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

