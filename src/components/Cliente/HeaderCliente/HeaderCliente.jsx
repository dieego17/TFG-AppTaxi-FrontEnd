/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logoBlanco.png';
import './headerCliente.css';

function HeaderCliente() {
  

  const token = localStorage.getItem('token');
  const userName =  token ? JSON.parse(atob(token.split('.')[1])).nombre : '';
  const apellidos =  token ? JSON.parse(atob(token.split('.')[1])).apellidos : '';

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <section className='section__header'>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid container">
          <Link to={'/cliente'}>
            <img src={logo} alt="logo" className="logo__img" />
          </Link>
          <button className="button__nav" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <i className="fa-solid fa-bars nav__icon"></i>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to={'/cliente'} className="nav-link">
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link to={'/cliente/nuevo-viaje/'} className="nav-link">
                  Nuevo Viaje
                </Link>
              </li>
              <li className="nav-item dropdown custom-dropdown container__deplebable">
                <a className="nav-link dropdown-toggle custom-dropdown-toggle" role="button">
                  Historial
                </a>
                <ul className="custom-dropdown-menu menu__desplegable">
                  <li><Link to={'/cliente/mis-reservas'} className="custom-dropdown-item"><i className="fa-solid fa-suitcase"></i> Mis Reservas</Link></li>
                  <li><Link to={'/cliente/mis-viajes'} className="custom-dropdown-item"><i className="fa-solid fa-taxi"></i> Mis Viajes</Link></li>
                </ul>
              </li>
              <li className="nav-item">
                <Link to={'/cliente/crear-reseña'} className="nav-link">
                  Añadir Reseña
                </Link>
              </li>
              <li className="nav-item dropdown custom-dropdown">
                <a className="nav-link btn btn-light button__login dropdown-toggle custom-dropdown-toggle" role="button">
                <i className="fa-solid fa-user"></i> {userName} {apellidos}
                </a>
                <ul className="custom-dropdown-menu">
                  <li><Link onClick={handleLogout} className="custom-dropdown-item"><i className="fa-solid fa-arrow-right-from-bracket"></i> Cerrar Sesión</Link></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </section>
  );
}

export default HeaderCliente;
