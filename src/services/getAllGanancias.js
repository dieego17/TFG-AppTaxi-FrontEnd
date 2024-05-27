export const getAllGanancias = async (idUsuario) => {

    const ApiUrl = import.meta.env.VITE_REACT_URL_API

    const response = await fetch(`${ApiUrl}/ganancias/${idUsuario}`);
    const data = await response.json();
    
    return data;
};