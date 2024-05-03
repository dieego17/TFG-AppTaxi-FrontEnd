import { useState, useEffect } from 'react'
import { getAllTestimonios } from '../services/getAllTestimonios'

export const useTestimonio = () => {

    const [testimonios, setTestimonios] = useState([])

    const loadTestiomonios = async () => {
        const allTestimonios = await getAllTestimonios()
        setTestimonios(allTestimonios)
    }

    useEffect(() => {
        loadTestiomonios()
    }, [])
    
    return testimonios
}