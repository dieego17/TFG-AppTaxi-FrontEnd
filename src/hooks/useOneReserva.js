import { useState, useEffect } from 'react';
import { getOneReserva } from '../services/getOneReserva';

// Hook para obtener una reserva con paginación
export const useOneReserva = (id, idUsuario) => {
  const [reserva, setReserva] = useState([]);

  const loadReserva = async () => {
    const OneReserva = await getOneReserva(id, idUsuario);
    setReserva(OneReserva);
  };

  useEffect(() => {
    loadReserva();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, idUsuario]);

  return reserva;
};
