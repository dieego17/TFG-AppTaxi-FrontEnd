import { useState, useEffect } from 'react'
import { getOneViajeCliente } from '../services/getOneViajeCliente'

//hook para conseguir el cleinte de un viaje
export const useOneViajeCliente = (id_viaje) => {

    const [cliente, setCliente] = useState([])

    const loadViajeCliente = async () => {
        const OneReserva = await getOneViajeCliente(id_viaje)
        setCliente(OneReserva)
    }

    useEffect(() => {
        loadViajeCliente()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id_viaje])
    
    return cliente
}