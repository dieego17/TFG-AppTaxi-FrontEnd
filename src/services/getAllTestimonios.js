export const getAllTestimonios = async () => {
    try {
        const response = await fetch('http://localhost:3000/appTaxi/v1/testimonios')
        const data = await response.json()
        return data
    } catch (error) {
        console.log('Error en la petición getAllTestimonios:', error)
    }
}
