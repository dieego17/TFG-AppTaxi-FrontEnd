/* eslint-disable no-unused-vars */
import React from 'react';
import { useAuth } from '../../auth/AuthProvider';
import { Link } from 'react-router-dom';
import { useClientes } from '../../hooks/useClientes';
import { useEffect } from 'react';

import Login from '../Login/Login';

function Dashboard() {
  const auth = useAuth();
  const clientes = useClientes();

  useEffect(() => {
    // Verificar si el usuario está autenticado al cargar el componente
    if (!auth.isAuth) {
      return <Login />;
    }
  }, [auth.isAuth]);

  return (
    <div>
      <h1>Bienvenido 
        {
          auth.getUser().nombre 
        } 
        </h1>
      <table className='table'>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Correo electrónico</th>
            <th>Dirección</th>
            <th>Método de pago</th>
            <th>Más información</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <tr key={cliente.id}>
              <td>{cliente.usuario.nombre} {cliente.usuario.apellidos}</td>
              <td>{cliente.usuario.telefono}</td>
              <td>{cliente.usuario.correo_electronico}</td>
              <td>{cliente.direccion_cliente}</td>
              <td>{cliente.metodo_pago}</td>
              <td>
                <Link to={`/cliente/${cliente.id}`}>
                  <i className="fa-solid fa-circle-info"></i>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
