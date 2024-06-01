/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './cliente.css';
import HeaderCliente from './HeaderCliente/HeaderCliente';
import { Outlet } from 'react-router-dom';
import ResumenCliente from './ResumenCliente/ResumenCliente';
import { useLocation } from 'react-router-dom';
import logo from '../../assets/images/logoBlanco.png';
import FooterCliente from './FooterCliente/FooterCliente';

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

  // Obtiene la ubicación actual
  const location = useLocation();

  // Verifica si la ubicación actual es la página del cliente
  const mostrarResumen = location.pathname === '/cliente';

  return (
    <div>
      {noCliente && <div className='aviso'>No tienes permisos para acceder a esta página</div>}
      <header>
        <HeaderCliente />
      </header>
      <main>
        <ResumenCliente mostrar={mostrarResumen} />
        <div>
          <Outlet />
        </div>
      </main>
      <footer className='container__footer'>
        <FooterCliente />
      </footer>
    </div>
  );
}

export default Cliente;
