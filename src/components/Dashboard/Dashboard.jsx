/* eslint-disable no-unused-vars */
// src/components/Dashboard/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Importa useLocation para obtener la ubicación actual
import { Outlet } from 'react-router-dom';
import AsideDashboard from './AsideDashboard/AsideDashboard';
import HeaderDashboard from './HeaderDashboard/HeaderDashboard';
import ResumenDashboard from './ResumenDashboard/ResumenDashboard';
import './dashboard.css';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [usuario, setUsuario] = useState(null);
  // Obtiene la ubicación actual
  const location = useLocation();

  // Verifica si la ubicación actual es la página del Dashboard
  const mostrarResumen = location.pathname === '/dashboard';

  return (
    <div className='container__dashboard'>
      <header className='header__dashboard'>
        <HeaderDashboard />
      </header>
      <aside className='aside__dashboard'>
        <AsideDashboard />
      </aside>
      <main className='main__dashboard'>
        <ResumenDashboard mostrar={mostrarResumen} />
        <div className='outlet__dashboard'>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
