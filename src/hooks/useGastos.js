import { useState, useEffect } from 'react'
import { getAllGastos } from '../services/getAllGastos'

//hook para conseguir todos los clientes
export const useGastos = () => {
    const [gastos, setGastos] = useState([])

    const loadGastos = async () =>{
        const allGastos = await getAllGastos()
        setGastos(allGastos)
    }
    

    useEffect(() => {
        loadGastos();
    }, [])
    
    return gastos
}