/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import GraficaBeneficios from '../GraficaBeneficios/GraficaBeneficios';
import AllClientes from '../AllClientes/AllClientes';
import './resumen.css';
import CalendarioDisponibilidad from './CalendarioDisponibilidad/CalendarioDisponibilidad';

function ResumenDashboard({ mostrar }) {
  if (!mostrar) {
    return null; // Si mostrar es falso, no renderizar nada
  }

  const token = localStorage.getItem('token');
  const userName = token ? JSON.parse(atob(token.split('.')[1])).nombre : '';
  const apellidos = token ? JSON.parse(atob(token.split('.')[1])).apellidos : '';

  return (
    <div className="resumen-dashboard container">
      <section className='section__dashboard section__dashboard--dos'>
        <article className='article__dashboard article__dashboard--dos'>
          <div className="article-content">
            <CalendarioDisponibilidad />
            </div>
        </article>
        <article className='article__dashboard article__dashboard--dos'>
          <Link to={'/dashboard/resumen-financiero'} className="article-link">
            <div className="article-content">
              <GraficaBeneficios />
            </div>
          </Link>
        </article>
      </section>
      <section className='section__dashboard'>
        <article className='article__dashboard article__dashboard--tabla'>
          <Link to={'/dashboard/clientes'} className="article-link">
            <div className="article-content article-content__clientes">
              <AllClientes />
            </div>
          </Link>
        </article>
      </section>
    </div>
  );
}

export default ResumenDashboard;
