/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { createContext, useContext, useState, useEffect } from 'react';

// Contexto para manejar errores del backend
const BackendErrorContext = createContext();

// Hook personalizado para usar el contexto de errores del backend
export const useBackendError = () => useContext(BackendErrorContext);

export const BackendErrorProvider = ({ children }) => {
  // Estado para almacenar si hay un error en el backend
  const [backendError, setBackendError] = useState(false);
  const ApiUrl = import.meta.env.VITE_REACT_URL_API;

  useEffect(() => {
    // Función para comprobar el estado del backend
    const checkBackendStatus = async () => {
      try {
        // Verificar el estado del backend
        const response = await fetch(`${ApiUrl}/status`); 
        // Si el estado no es 200, lanza un error
        if (!response.ok) {
          throw new Error('Backend not reachable');
        }
        // Si el estado es 200 y hay un error, establece el estado como no error
        if (backendError) {
          setBackendError(false);
        }
      } catch (error) {
        // Si hay un error, establece el estado como error
        setBackendError(true);
      }
    };

    // Comprobar el estado del backend al cargar la página
    checkBackendStatus();

    // Comprobar el estado del backend cada 30 segundos
    const interval = setInterval(checkBackendStatus, 30000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <BackendErrorContext.Provider value={{ backendError }}>
      {children}
    </BackendErrorContext.Provider>
  );
};
