import { useState, useEffect } from 'react'
import { getAllGanancias } from '../services/getAllGanancias'

//hook para conseguir todos los clientes
export const useGanancias = () => {
    const [ganancias, setGanancias] = useState([])

    const loadGanancias = async () =>{
        const allGanancias = await getAllGanancias()
        setGanancias(allGanancias)
    }
    

    useEffect(() => {
        loadGanancias();
    }, [])
    
    return ganancias
}