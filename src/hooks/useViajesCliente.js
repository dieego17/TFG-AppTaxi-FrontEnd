import { useState, useEffect } from 'react'
import { getAllViajesCliente } from '../services/getAllViajesCliente'

//hook para conseguir todos los clientes
export const useViajesCliente = (idUsuario) => {
    const [viajes, setViajes] = useState([])

    const loadViajes = async () =>{
        const allViajes = await getAllViajesCliente(idUsuario)
        setViajes(allViajes)
    }
    

    useEffect(() => {
        loadViajes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idUsuario])
    
    return viajes
}