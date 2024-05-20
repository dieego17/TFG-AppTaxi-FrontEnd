/* eslint-disable no-unused-vars */
import React from 'react'
import { useClientes } from '../../../hooks/useClientes';
import { Link } from 'react-router-dom';


function AllClientes() {
    
  const clientes = useClientes();
  return (
    <div>
        <table className='table'>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Teléfono</th>
            <th>Correo electrónico</th>
            <th>Dirección</th>
            <th>Método de pago</th>
            <th>Ver Reservas</th>
            <th>Ver Viajes</th>
          </tr>
        </thead>
        <tbody>
        {clientes && clientes.map(cliente => (
          <tr key={cliente.id_usuario}>
            <td>{cliente.usuario.nombre}</td>
            <td>{cliente.usuario.apellidos}</td>
            <td>{cliente.usuario.telefono}</td>
            <td>{cliente.usuario.correo_electronico}</td>
            <td>{cliente.usuario.direccion_usuario}</td>
            <td>{cliente.metodo_pago}</td>
            <td>
              <Link to={`/dashboard/clientes/reservas-detalle/${cliente.id_usuario}`}>
                <i className="bi bi-suitcase-lg-fill"></i>
              </Link>
            </td>
            <td>
              <Link to={`/dashboard/clientes/viajes-detalle/${cliente.id_usuario}`}>
                <i className="fa-solid fa-taxi"></i>
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