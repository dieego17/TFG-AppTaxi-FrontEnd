import { useState, useEffect } from 'react'
import { getOneViaje } from '../services/getOneViaje'

//hook para conseguir un viaje
export const useOneViaje= (id, idUsuario) => {

    const [viaje, setViaje] = useState([])

    const loadViaje = async () => {
        const OneViaje = await getOneViaje(id, idUsuario)
        setViaje(OneViaje)
    }

    useEffect(() => {
        loadViaje()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])
    
    return viaje
}