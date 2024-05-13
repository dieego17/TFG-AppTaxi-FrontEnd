export const getAllTestimonios = async () => {
  const ApiUrl = import.meta.env.VITE_REACT_URL_API
    try {
        const response = await fetch(`${ApiUrl}/testimonios`)
        const data = await response.json()
        return data
    } catch (error) {
        console.log('Error en la petición getAllTestimonios:', error)
    }
}
