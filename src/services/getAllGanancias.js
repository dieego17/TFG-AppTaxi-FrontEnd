export const getAllGanancias = async () => {

    const ApiUrl = import.meta.env.VITE_REACT_URL_API

    const response = await fetch(`${ApiUrl}/ganancias/3`);
    const data = await response.json();
    
    return data;
};