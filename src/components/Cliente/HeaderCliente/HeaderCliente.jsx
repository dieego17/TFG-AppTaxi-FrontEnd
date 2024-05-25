/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';
import './headerCliente.css';

function HeaderCliente() {

  const userName = 'Joselu Mato'

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
                <Link to={'/cliente'} className="nav-link">
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link to={'/cliente/nuevo-viaje/'} className="nav-link">
                  Nuevo Viaje
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li><Link to={'/cliente/mis-reservas'} className="dropdown-item" href="#">Mis Reservas</Link></li>
                  <li><Link to={'/cliente/mis-viajes'} className="dropdown-item" href="#">Mis Viajes</Link></li>
                </ul>
              </li>
              <li className="nav-item">
                <Link to={'/cliente/crear-reseña'} className="nav-link">
                  Añadir Reseña
                </Link>
              </li>
              <li className="nav-item">
                <Link to={'/'} className="nav-link btn btn-light button__login">
                  {userName} <i className="fa-solid fa-arrow-right-to-bracket"></i>
                </Link>
              </li>
  
            </ul>
          </div>
        </div>
      </nav>
    </section>
  );
}

export default HeaderCliente;
