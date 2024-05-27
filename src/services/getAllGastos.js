export const getAllGastos = async (idUsuario) => {

    const ApiUrl = import.meta.env.VITE_REACT_URL_API

    const response = await fetch(`${ApiUrl}/perdidas/${idUsuario}`);
    const data = await response.json();
    
    return data;
};