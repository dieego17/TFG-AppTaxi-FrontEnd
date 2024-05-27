/* eslint-disable no-unused-vars */
import React from 'react'
import './header.css'
import { Link } from 'react-router-dom'

function HeaderDashboard() {

  const token = localStorage.getItem('token')
  const userName = token ? JSON.parse(atob(token.split('.')[1])).nombre : ''

  const inicial = userName.charAt(0)

  //cerrar sesión
  const handleLogout = () => {
    localStorage.clear()
    window.location.href = '/'
  }

  return (
    <div className='container__header'>
      <div className='header__bienvenida'>
        <h2>Bienvenido/a {userName}</h2>
      </div>
      <div className="dropdown">
        <button className="button__perfil" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <div className='foto__user'>
            <p className='letra__perfil'>{inicial}</p>
          </div>
        </button>
        <ul className="dropdown-menu">
          <li>
            <button onClick={handleLogout} className='dropdown-item'>
              <p>Cerrar Sesión</p>
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default HeaderDashboard