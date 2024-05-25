/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'
import './aside.css'
import logo from '../../../assets/images/logo.png'

function AsideDashboard() {
  return (
    <div className='container__aside'>
      <section className='section__logo'>
        <Link to={'/dashboard'}>
          <img className='logo__aside' src={logo} alt="" />
        </Link>
      </section>
      <ul className='ul__aside'>
        <li className='list__aside'>
          <Link to={'/dashboard'}>
            <i className="fa-solid fa-house icon__aside"></i>
          </Link>
        </li>
        <li className='list__aside'>
          <Link to={'/dashboard/resumen-financiero'}>
            <i className="fa-solid fa-chart-simple icon__aside"></i>
          </Link>
        </li>
        <li className='list__aside'>
          <Link to={`/dashboard/clientes`}>
            <i className="fa-solid fa-users icon__aside"></i>
          </Link>
        </li>
        <li className='list__aside list__aside--ajustes'>
          <Link to={'/dashboard/editar-perfil'}>
            <i className="fa-solid fa-gear icon__aside"></i>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default AsideDashboard