/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './header.css';

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid container">
        <Link to={'/'}>
          <img src={logo} alt="logo" className="logo__img" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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
              <Link to={'/services'} className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Servicios
              </Link>
              <ul className="dropdown-menu">
                <li><Link to={'#'} className="dropdown-item">Action</Link></li>
                <li><Link to={'#'} className="dropdown-item">Another action</Link></li>
                <li><hr className="dropdown-divider"/></li>
                <li><Link to={'#'} className="dropdown-item">Something else here</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to={'/quienes-somos'} className="nav-link">
                Quiénes somos
              </Link>
            </li>
            <li className="nav-item">
              <Link to={'/login'} className="nav-link">
                <i className="fa-solid fa-user"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
