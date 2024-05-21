export const getOneViaje = async (id, idUsuario, page, limit) => {
  const ApiUrl = import.meta.env.VITE_REACT_URL_API;
  const response = await fetch(`${ApiUrl}/viajes/${id}/detalles/${idUsuario}?page=${page}&limit=${limit}`);
  const data = await response.json();
  console.log(data);
  return data; 
};
