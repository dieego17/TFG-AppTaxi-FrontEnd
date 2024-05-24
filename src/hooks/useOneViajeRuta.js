import { useState, useEffect } from 'react'
import { getOneViajeRuta } from '../services/getOneViajeRuta'

//hook para conseguir el cleinte de un viaje
export const useOneViajeRuta = (id_viaje) => {

    const [ruta, setRuta] = useState([])

    const loadRuta= async () => {
        const OneRuta = await getOneViajeRuta(id_viaje)
        setRuta(OneRuta)
    }

    useEffect(() => {
        loadRuta()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id_viaje])
    
    return ruta
}