/* eslint-disable no-unused-vars */

import React from 'react'
import { Link } from 'react-router-dom'
import './aside.css'
import logo from '../../assets/images/logo.png'

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
          <Link to={'/dashboard/resumen-beneficios'}>
            <i className="fa-solid fa-chart-simple icon__aside"></i>
          </Link>
        </li>
        <li className='list__aside'>
          <Link to={`/dashboard/clientes`}>
            <i className="fa-solid fa-users icon__aside"></i>
          </Link>
        </li>
        <li className='list__aside'>
          <Link to={'/dashboard/insertar-ganancias-perdidas'}>
            <i className="fa-solid fa-hand-holding-dollar icon__aside"></i>
          </Link>
        </li>
        {/* <li className='list__aside list__aside--logout'>
          <Link to={'/'}>
            <i className="fa-solid fa-power-off icon__aside"></i>
          </Link>
        </li> */}
      </ul>
    </div>
  )
}

export default AsideDashboard