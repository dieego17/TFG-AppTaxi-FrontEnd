// services/getOneReserva.js
export const getOneReserva = async (id, idUsuario, page, limit) => {
  const ApiUrl = import.meta.env.VITE_REACT_URL_API;
  const response = await fetch(`${ApiUrl}/reservas/${id}/detalles/${idUsuario}?page=${page}&limit=${limit}`);
  const data = await response.json();

  return data; 
};
