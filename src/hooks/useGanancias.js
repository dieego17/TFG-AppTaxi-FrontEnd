import { useState, useEffect } from 'react'
import { getAllGanancias } from '../services/getAllGanancias'

//hook para conseguir todos los clientes
export const useGanancias = (idUsuario) => {
    const [ganancias, setGanancias] = useState([])

    const loadGanancias = async () =>{
        const allGanancias = await getAllGanancias(idUsuario)
        setGanancias(allGanancias)
    }
    

    useEffect(() => {
        loadGanancias();
    }, [])
    
    return ganancias
}