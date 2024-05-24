export const getAllViajesCliente = async (id_cliente) => {

    const ApiUrl = import.meta.env.VITE_REACT_URL_API

    const response = await fetch(`${ApiUrl}/viajes/detalles-cliente/${id_cliente}`);
    const data = await response.json();
    
    return data;
};