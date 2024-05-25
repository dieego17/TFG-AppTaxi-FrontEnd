export const getOneViajeDetalleCliente= async (id_viaje) => {

    const ApiUrl = import.meta.env.VITE_REACT_URL_API

    const response = await fetch(`${ApiUrl}/viajes/detalles-taxista/${id_viaje}`);
    const data = await response.json();

    console.log(data);

    return data;
};