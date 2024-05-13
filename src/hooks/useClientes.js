import { useState, useEffect } from 'react'
import { getAllClientes } from '../services/getAllClientes'

export const useClientes = () => {
    const [clientes, setClientes] = useState([])

    const loadClientes = async () =>{
        const allClientes = await getAllClientes()
        setClientes(allClientes)
    }
    

    useEffect(() => {
        loadClientes();
    }, [])
    
    return clientes
}