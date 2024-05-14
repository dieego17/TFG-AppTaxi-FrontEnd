export const getOneCliente = async (id, idUsuario) => {
    const ApiUrl = import.meta.env.VITE_REACT_URL_API
    const response = await fetch(`${ApiUrl}/clientes/${id}/detalles/${idUsuario}`)
    const data = await response.json()

    return data
  }