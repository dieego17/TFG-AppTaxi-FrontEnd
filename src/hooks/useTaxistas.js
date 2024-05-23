import { useState, useEffect } from 'react'
import { getAllTaxistas } from '../services/getAllTaxistas'

//hook para conseguir todos los clientes
export const useTaxistas = () => {
    const [taxistas, setTaxistas] = useState([])

    const loadTaxistas = async () =>{
        const allTaxistas = await getAllTaxistas()
        setTaxistas(allTaxistas)
    }
    

    useEffect(() => {
        loadTaxistas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return taxistas
}