// services/getOneReserva.js
export const getOneReserva = async (id, idUsuario) => {
  const ApiUrl = import.meta.env.VITE_REACT_URL_API;
  const response = await fetch(`${ApiUrl}/reservas/${id}/detalles/${idUsuario}`);
  const data = await response.json();

  return data; 
};
