export const getOneTaxista = async (id_usuario) => {
    const ApiUrl = import.meta.env.VITE_REACT_URL_API;
    const response = await fetch(`${ApiUrl}/usuarios/taxista/${id_usuario}`);
    const data = await response.json();

    return data;
  };