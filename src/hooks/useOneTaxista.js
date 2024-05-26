import { useState, useEffect } from 'react'
import { getOneTaxista } from '../services/getOneTaxista'

//hook para conseguir todos los clientes
export const useOneTaxista = (idUsuario) => {
    const [taxista, setTaxista] = useState([])

    const loadTaxista = async () =>{
        const oneTaxista = await getOneTaxista(idUsuario)
        setTaxista(oneTaxista)
    }
    

    useEffect(() => {
        loadTaxista();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idUsuario])
    
    return taxista
}