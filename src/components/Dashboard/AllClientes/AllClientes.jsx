/* eslint-disable no-unused-vars */
import React from 'react'
import { useClientes } from '../../../hooks/useClientes';
import { Link } from 'react-router-dom';
import './allclientes.css'
import { useState, useEffect } from 'react';


function AllClientes() {

  const [idUsuario, setUsuario] = useState('3')

  
  const clientes = useClientes(idUsuario);

  const nombre = 'Joselu'
  const inicial = nombre.charAt(0)

  return (
    <div>
        <table className='table'>
        <thead className='table__thead'>
          <tr className='table__tr'>
            <th className='table__th'>Nombre</th>
            <th className='table__th'>Apellidos</th>
            <th className='table__th'>Teléfono</th>
            <th className='table__th'>Correo electrónico</th>
            <th className='table__th'>Dirección</th>
            <th className='table__th'>Ver Reservas</th>
            <th className='table__th'>Ver Viajes</th>
          </tr>
        </thead>
        <tbody className='table__tbody'>
        {clientes && clientes.map(cliente => (
          <tr className='table__tr' key={cliente.id_usuario}>
            <td className='table__td'>
              {cliente.usuario.nombre}
              </td>
            <td className='table__td'>{cliente.usuario.apellidos}</td>
            <td className='table__td'>{cliente.usuario.telefono}</td>
            <td className='table__td'>{cliente.usuario.correo_electronico}</td>
            <td className='table__td'>{cliente.usuario.direccion_usuario}</td>
            <td className='table__td'>
              <Link className='td__link' to={`/dashboard/clientes/reservas-detalle/${cliente.id_usuario}`}>
                <i className="bi bi-suitcase-lg-fill link__icon"></i>
              </Link>
            </td>
            <td className='table__td'>
              <Link className='td__link' to={`/dashboard/clientes/viajes-detalle/${cliente.id_usuario}`}>
                <i className="fa-solid fa-taxi link__icon"></i>
              </Link>
            </td>
          </tr>
        ))}

        </tbody>
      </table>
    </div>
  )
}

export default AllClientes