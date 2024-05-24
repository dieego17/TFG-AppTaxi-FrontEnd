/* eslint-disable no-unused-vars */
import React from 'react'
import { useState, useEffect } from 'react';
import './cliente.css'
import ReservarViaje from './ReservarViaje/ReservarViaje';

function Cliente() {

  const [idUsuario, setUsuario] = useState('1'); // Declarar usuario usando useState
  const nombre = 'Joselu'

  return (
      <section className='container container__cliente'>
        
        <h1>Bienvenido {nombre}{/*  {usuario?.usuario?.nombre} */}</h1>
        <ReservarViaje idUsuario={idUsuario} />
      </section>
      
  );
}


export default Cliente