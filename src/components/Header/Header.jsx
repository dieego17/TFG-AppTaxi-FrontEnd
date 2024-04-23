/* eslint-disable no-unused-vars */
import React from 'react'
import './header.css'
import logo from '../../assets/logo.png'
import taxi from '../../assets/taxi__header.png'

function Header() {
  return (
    <header className='header border'>
      <section className='container mt-3'>
        <div className='header__logo'>
          <a href="/">
            <img className='logo__img' src={logo} alt="" />
          </a>
        </div>
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link" href="#">Home</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Servicios
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Quiénes somos</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#"><i className="fa-solid fa-user"></i></a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </section>
      <section className='section__title container'>
        <article className='d-flex flex-column justify-content-end article__text'>
          <h1 className='article__h1'>El viaje de tu vida</h1>
          <p className='text-center'>Prueba</p>
          <a className='button__header' href="/">Conseguir un viaje</a>
        </article>
        <article>
          <img className='img__coche' src={taxi} alt="" />
        </article>
      </section>
    </header>
  )
}

export default Header