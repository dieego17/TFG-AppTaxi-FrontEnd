/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../auth/AuthProvider';
import { Outlet } from 'react-router-dom';
import AsideDashboard from './AsideDashboard';
import HeaderDashboard from './HeaderDashboard';
import './dashboard.css';


function Dashboard() {
  /* const auth = useAuth(); */
  const [usuario, setUsuario] = useState(null); // Declarar usuario usando useState

  /* useEffect(() => {
    if (!auth.isAuth) {
      // Redireccionar al componente Login si el usuario no está autenticado
      window.location.href = '/login'; // Cambia la URL según tu configuración de rutas
    }
  }, [auth.isAuth]); */

  useEffect(() => {
    // Lógica para obtener y decodificar el token JWT
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUsuario = decodeJWT(token); // Cambia el nombre de usuario para evitar conflictos
      setUsuario(decodedUsuario); // Actualizar el estado de usuario
    }
  }, []);

  // Función para decodificar el token JWT
  function decodeJWT(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return null;
    }
  }

  return (
    <div className='container__dashboard'>
      <header className='header__dashboard'>
        <HeaderDashboard />
      </header>
      <aside className='aside__dashboard'>
        <AsideDashboard />
      </aside>
      <main className='main'>
        <h1>Bienvenido/a {usuario?.usuario?.nombre} </h1>
        <p>Este es el dashboard</p>
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
