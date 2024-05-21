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

  return (
    <div className="resumen-dashboard">
      <section className='section__dashboard'>
        <article className='article__dashboard'>
          <Link to={'/dashboard/resumen-beneficios'} className="article-link">
            <div className="article-content">
              <GraficaBeneficios />
            </div>
          </Link>
        </article>
        <article className='article__dashboard'>
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
