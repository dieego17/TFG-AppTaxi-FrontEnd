import { useState, useEffect } from 'react'
import { getAllClientes } from '../services/getAllClientes'

//hook para conseguir todos los clientes
export const useClientes = (idUsuario) => {
    const [clientes, setClientes] = useState([])

    const loadClientes = async () =>{
        const allClientes = await getAllClientes(idUsuario)
        setClientes(allClientes)
    }
    

    useEffect(() => {
        loadClientes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idUsuario])
    
    return clientes
}