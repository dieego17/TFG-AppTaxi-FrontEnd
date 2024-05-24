import { useState, useEffect } from 'react'
import { getOneViajeDetalleCliente } from '../services/getOneViajeDetalleCliente'

//hook para conseguir el cleinte de un viaje
export const useOneViajeDetalleCliente = (id_viaje) => {

    const [viaje, setViaje] = useState([])

    const loadOneViaje= async () => {
        const OneViaje = await getOneViajeDetalleCliente(id_viaje)
        setViaje(OneViaje)
    }

    useEffect(() => {
        loadOneViaje()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id_viaje])
    
    return viaje
}