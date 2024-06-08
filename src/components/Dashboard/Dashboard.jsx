/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; 
import { Outlet } from 'react-router-dom';
import AsideDashboard from './AsideDashboard/AsideDashboard';
import ResumenDashboard from './ResumenDashboard/ResumenDashboard';
import './dashboard.css';
import AsideDashboardPequeño from './AsideDashboard/AsideDashboarPequeño/AsideDashboardPequeño';



function Dashboard() {

  //comprobar si tiene rol de administrador
  const token = localStorage.getItem('token');
  const rol = token ? JSON.parse(atob(token.split('.')[1])).rol : '';

  //crear estado para enseñar un aviso si no tiene rol de administrador
  const [noAdmin, setNoAdmin] = useState(false);

  //actualizar el estado de noAdmin si el rol no es administrador
  if (rol !== 'admin') {
    setNoAdmin(true);
  }

  // Obtiene la ubicación actual
  const location = useLocation();

  // Verifica si la ubicación actual es la página del Dashboard
  const mostrarResumen = location.pathname === '/dashboard';

  return (
    <div className='container__dashboard'>
      {noAdmin && <div className='aviso'>No tienes permisos para acceder a esta página</div>}
      <aside className='aside__dashboard'>
        <AsideDashboard />
      </aside>
      {/* Aside para baja resolución */}
      <aside className='aside__dashboard__pequeño'>
        <AsideDashboardPequeño />
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
