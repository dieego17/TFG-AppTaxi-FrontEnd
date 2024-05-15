import { useState, useEffect } from 'react'
import { getOneCliente } from '../services/getOneCliente'

export const useOneCliente = (id, idUsuario) => {

    const [cliente, setCliente] = useState([])

    const loadCliente = async () => {
        const OneCliente = await getOneCliente(id, idUsuario)
        setCliente(OneCliente)
    }

    useEffect(() => {
        loadCliente()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])
    
    return cliente
}