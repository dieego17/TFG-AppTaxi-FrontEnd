/* eslint-disable no-unused-vars */
import React from 'react'
import './header.css'
import { Link } from 'react-router-dom'

function HeaderDashboard() {


  const nombre = 'Diego'
  const inicial = nombre.charAt(0)

  return (
    <div className='container__header'>
      <div className='header__bienvenida'>
        <h2>Bienvenido/a Diego</h2>
      </div>
      <div className="dropdown">
        <button className="button__perfil" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <div className='foto__user'>
            <p className='letra__perfil'>{inicial}</p>
          </div>
        </button>
        <ul className="dropdown-menu">
          <li>
            <Link to={'/'} className='dropdown-item'>
              <p>Cerrar Sesión</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default HeaderDashboard