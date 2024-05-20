import { useState, useEffect } from 'react'
import { getOneViajeCliente } from '../services/getOneViajeCliente'

//hook para conseguir el cleinte de un viaje
export const useOneViajeCliente = (idViaje) => {

    const [cliente, setCliente] = useState([])

    const loadViajeCliente = async () => {
        const OneReserva = await getOneViajeCliente(idViaje)
        setCliente(OneReserva)
    }

    useEffect(() => {
        loadViajeCliente()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idViaje])
    
    return cliente
}