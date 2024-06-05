/* eslint-disable no-unused-vars */
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useBackendError } from '../auth/useBackEndErrorContext'; 
import Header from './Header/Header.jsx';
import Footer from './Footer/Footer.jsx';
import Mantenimiento from './Mantenimiento/Mantenimiento.jsx';

// Componente de Layout
function Layout() {
  const { backendError } = useBackendError();
  return (
    <div>
      {backendError ? (
        <Mantenimiento />
      ) : (
        <div>
          <header>
            <Header />
          </header>
          <main>
            <Outlet />
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      )}
    </div>
  );
}

export default Layout;
