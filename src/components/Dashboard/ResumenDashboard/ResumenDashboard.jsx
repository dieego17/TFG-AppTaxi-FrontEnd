/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import GraficaBeneficios from '../GraficaBeneficios/GraficaBeneficios';
import AllClientes from '../AllClientes/AllClientes';
import './resumen.css';

function ResumenDashboard({ mostrar }) {
  if (!mostrar) {
    return null; // Si mostrar es falso, no renderizar nada
  }

  const userName = localStorage.getItem('userName');

  return (
    <div className="resumen-dashboard">
      <section className='section__dashboard'>
      <article className='article__dashboard col-lg-6 col-md-12'>
        <h1>BIENVENIDO,
          {userName}
        </h1>
      </article>
        <article className='article__dashboard col-lg-6 col-md-12'>
          <Link to={'/dashboard/resumen-financiero'} className="article-link">
            <div className="article-content">
              <GraficaBeneficios />
            </div>
          </Link>
        </article>
      </section>
      <section className='section__dashboard'>
        <article className='article__dashboard'>
          <Link to={'/dashboard/clientes'} className="article-link">
            <div className="article-content">
              <AllClientes />
            </div>
          </Link>
        </article>
      </section>
    </div>
  );
}

export default ResumenDashboard;
