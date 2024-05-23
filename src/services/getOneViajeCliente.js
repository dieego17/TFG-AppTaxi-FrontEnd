export const getOneViajeCliente = async (id_viaje) => {
    const ApiUrl = import.meta.env.VITE_REACT_URL_API;
    const response = await fetch(`${ApiUrl}/viajes/${id_viaje}/detalles`);
    const data = await response.json();

    return data;
  };