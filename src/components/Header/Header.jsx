/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logoBlanco.png';
import './header.css';

function Header() {
  const [userName, setUserName] = useState('');

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
              <li className="nav-item">
                <Link to={'/login'} className="nav-link btn btn-light button__login">
                  <i className="bi bi-person-circle"></i> Iniciar Sesión
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </section>
  );
}

export default Header;
