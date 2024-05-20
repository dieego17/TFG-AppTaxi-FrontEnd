export const getOneViajeCliente = async (idViaje) => {
    const ApiUrl = import.meta.env.VITE_REACT_URL_API;
    const response = await fetch(`${ApiUrl}/viajes/${idViaje}/detalles`);
    const data = await response.json();
  
    return data;
  };