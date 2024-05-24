//GET para obtener el viaje y calcuar la ruta
export const getOneViajeRuta = async (id_viaje) => {
    const ApiUrl = import.meta.env.VITE_REACT_URL_API;
    const response = await fetch(`${ApiUrl}/viajes/detalles-ruta/${id_viaje}`);
    const data = await response.json();

    return data;
  };