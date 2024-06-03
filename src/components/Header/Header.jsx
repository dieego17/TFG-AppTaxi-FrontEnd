/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logoBlanco.png';
import './header.css';

function Header() {

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
              <li className="nav-item">
                <Link to={'/servicios'} className="nav-link">
                Servicios
                </Link>
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
