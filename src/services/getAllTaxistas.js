export const getAllTaxistas = async () => {
    const ApiUrl = import.meta.env.VITE_REACT_URL_API
      try {
          const response = await fetch(`${ApiUrl}/usuarios`)
          const data = await response.json()
          return data
      } catch (error) {
          console.log('Error en la petición getAllTaxistass:', error)
      }
  }