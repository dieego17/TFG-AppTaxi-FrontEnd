import { useState, useEffect } from 'react'
import { getAllFechasViajes } from '../services/getAllFechasViajes'

//hook para conseguir todos los clientes
export const useFechaViaje = (idUsuario) => {
    const [fechas, setFechas] = useState([])

    const loadFechas = async () =>{
        const allFechas = await getAllFechasViajes(idUsuario)
        setFechas(allFechas)
    }
    

    useEffect(() => {
        loadFechas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idUsuario])
    
    return fechas
}