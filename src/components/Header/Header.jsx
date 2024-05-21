/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './header.css';

function Header() {
  // State to manage user login status and name
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Simulate a login check
    const user = {
      loggedIn: true,
      name: 'Diego Rubio'
    };

    if (user.loggedIn) {
      setIsLoggedIn(true);
      setUserName(user.name);
    }
  }, []);

  return (
    <section className='section__header'>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid container">
          <Link to={'/'}>
            <img src={logo} alt="logo" className="logo__img" />
          </Link>
          <button className="button__nav" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <i className="fa-solid fa-bars nav__icon"></i>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to={'/'} className="nav-link">
                  Inicio
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link to={'/servicios'} className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Servicios
                </Link>
                <ul className="dropdown-menu">
                  <li><Link to={'/servicios/ciudad-a-ciudad'} className="dropdown-item">Viajes de ciudad a ciudad</Link></li>
                  <li><Link to={'/servicios/recogida-inmediata'} className="dropdown-item">Recogida inmediata</Link></li>
                  <li><Link to={'/servicios/viaje-por-horas'} className="dropdown-item">Alquiler por horas y día completo</Link></li>
                </ul>
              </li>
              <li className="nav-item">
                <Link to={'/quienes-somos'} className="nav-link">
                  Quiénes somos
                </Link>
              </li>
              {isLoggedIn ? (
                <li className="nav-item">
                  <div className="dropdown">
                    <button className="nav-link nav-link--user" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      {userName} <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <Link to={'/cliente/editar-perfil'} className='dropdown-item'>
                          <p>Perfil</p>
                        </Link>
            
                      </li>
                      <li>
                        <Link to={'/cliente/reservas'} className='dropdown-item'>
                          <p>Mis Reservas</p>
                        </Link>
            
                      </li>
                      <li>
                        <Link to={'/'} className='dropdown-item'>
                          <p>Cerrar Sesión</p>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              ) : (
                <li className="nav-item">
                  <Link to={'/login'} className="nav-link btn btn-light button__login">
                    <i className="bi bi-person-circle"></i> Iniciar Sesión
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </section>
  );
}

export default Header;
