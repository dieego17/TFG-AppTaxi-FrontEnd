import { useState, useEffect } from 'react'
import { getAllClientesFacturas } from '../services/getAllClientesFacturas'

//hook para conseguir todos los clientes
export const useCorreoFactura = (idUsuario) => {
    const [clientes, setClientes] = useState([])

    const loadClientes = async () =>{
        const allClientes = await getAllClientesFacturas(idUsuario)
        setClientes(allClientes)
    }
    

    useEffect(() => {
        loadClientes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idUsuario])
    
    return clientes
}