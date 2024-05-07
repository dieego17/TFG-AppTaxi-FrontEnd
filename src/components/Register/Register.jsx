/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom';

function Register() {
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
                      <input type="text" className="form-control" id="name" placeholder="Ingresa tu nombre" />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="name">Apellidos:</label>
                      <input type="text" className="form-control" id="name" placeholder="Ingresa tu nombre" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="name">Teléfono:</label>
                      <input type="text" className="form-control" id="name" placeholder="Ingresa tu nombre" />
                    </div>
    
                    <div className="form-group">
                      <label htmlFor="email">Correo Electrónico:</label>
                      <input type="email" className="form-control" id="email" placeholder="Ingresa tu correo electrónico" />
                    </div>
    
                    <div className="form-group">
                      <label htmlFor="password">Contraseña:</label>
                      <input type="password" className="form-control" id="password" placeholder="Ingresa tu contraseña" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">Repetir Contraseña:</label>
                      <input type="password" className="form-control" id="password" placeholder="Ingresa tu contraseña" />
                    </div>
    
                    <button type="submit" className="btn btn-primary btn-block">Registrarse</button>
                    <Link to={'/login'} className="btn btn-primary btn-block">Volver</Link>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
}

export default Register