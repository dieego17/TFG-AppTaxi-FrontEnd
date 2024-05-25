/* eslint-disable no-unused-vars */
import React from 'react'
import { useState, useEffect } from 'react';
import './cliente.css'
import ReservarViaje from './ReservarViaje/ReservarViaje';
import HeaderCliente from './HeaderCliente/HeaderCliente';
import { Outlet } from 'react-router-dom';

function Cliente() {

  const [idUsuario, setUsuario] = useState('1'); // Declarar usuario usando useState
  const nombre = 'Joselu'

  return (
      <div className=''>
        <header>
          <HeaderCliente />
        </header>
        <main>
          <Outlet />
        </main>
        <footer>

        </footer>
      </div>
      
  );
}


export default Cliente