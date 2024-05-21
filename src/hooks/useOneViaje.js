import { useState, useEffect } from 'react';
import { getOneViaje } from '../services/getOneViaje';

// Hook to get a viaje with pagination
export const useOneViaje = (id, idUsuario, page, limit) => {
  const [viaje, setViaje] = useState([]);

  const loadViaje = async () => {
    const oneViaje = await getOneViaje(id, idUsuario, page, limit);
    setViaje(oneViaje);
  };

  useEffect(() => {
    loadViaje();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, idUsuario, page, limit]);

  return viaje;
};
