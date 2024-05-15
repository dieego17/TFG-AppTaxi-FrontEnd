/* eslint-disable no-unused-vars */

import React from 'react'
import { Link } from 'react-router-dom'
import './aside.css'

function AsideDashboard() {
  return (
    <div className='container__aside'>
      <h2>ASIDE</h2>
      <ul>
      <li>
          <Link to={'/dashboard'}>
            Home
          </Link>
        </li>
        <li>
          <Link to={'/dashboard/resumen-beneficios'}>
            Resumen de Beneficios
          </Link>
        </li>
        <li>
          <Link to={`/dashboard/clientes`}>
            Clientes
          </Link>
        </li>
        <li>
          <Link to={'/dashboard/insertar-ganancias-perdidas'}>
            Crear Ganancias y Gastos
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default AsideDashboard