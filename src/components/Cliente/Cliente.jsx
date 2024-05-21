/* eslint-disable no-unused-vars */
import React from 'react'
import { useAuth } from '../../auth/AuthProvider'
import { useState, useEffect } from 'react';
import './cliente.css'

function Cliente() {
  /* const auth = useAuth();
  const [usuario, setUsuario] = useState(null); // Declarar usuario usando useState

  useEffect(() => {
    if (!auth.isAuth) {
      // Redireccionar al componente Login si el usuario no está autenticado
      window.location.href = '/login'; // Cambia la URL según tu configuración de rutas
    }
  }, [auth.isAuth]);

  useEffect(() => {
    // Lógica para obtener y decodificar el token JWT
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUsuario = decodeJWT(token); // Cambia el nombre de usuario para evitar conflictos
      setUsuario(decodedUsuario); // Actualizar el estado de usuario
    }
  }, []);

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
  } */

  const nombre = 'Diego'

  return (
      <section className='container container__cliente'>
        
        <h1>Bienvenido {nombre}{/*  {usuario?.usuario?.nombre} */}</h1>
      </section>
      
  );
}


export default Cliente