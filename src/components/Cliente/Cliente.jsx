/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './cliente.css';
import HeaderCliente from './HeaderCliente/HeaderCliente';
import { Outlet } from 'react-router-dom';

function Cliente() {
  // Comprobar si tiene rol de cliente
  const token = localStorage.getItem('token');
  const rol = token ? JSON.parse(atob(token.split('.')[1])).rol : '';

  // Crear estado para enseñar un aviso si no tiene rol de cliente
  const [noCliente, setNoCliente] = useState(false);

  // Actualizar el estado de noCliente si el rol no es cliente
  if (rol !== 'cliente') {
    setNoCliente(true);
  }

  return (
    <div>
      {noCliente && <div className='aviso'>No tienes permisos para acceder a esta página</div>}
      <header>
        <HeaderCliente />
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
}

export default Cliente;
