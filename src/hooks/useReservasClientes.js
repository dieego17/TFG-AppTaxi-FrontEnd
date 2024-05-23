import { useState, useEffect } from 'react'
import { getAllReservasCliente } from '../services/getAllReservasCliente'

//hook para conseguir todos los clientes
export const useReservasClientes = (idUsuario) => {
    const [reservas, setReservas] = useState([])

    const loadReservas = async () =>{
        const allReservas = await getAllReservasCliente(idUsuario)
        setReservas(allReservas)
    }
    

    useEffect(() => {
        loadReservas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idUsuario])
    
    return reservas
}