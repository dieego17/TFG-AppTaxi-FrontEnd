export const getAllClientesFacturas = async (idUsuario) => {
    const ApiUrl = import.meta.env.VITE_REACT_URL_API
      try {
          const response = await fetch(`${ApiUrl}/usuarios/factura/${idUsuario}`)
          const data = await response.json()
          console.log('data:', data)
          return data
      } catch (error) {
          console.log('Error en la petición getAllClientes:', error)
      }
  }
  