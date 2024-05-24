/* eslint-disable no-unused-vars */
import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useOneViajeRuta } from '../../../../../../hooks/useOneViajeRuta'

function RutaMapa() {

    const [idUsuario, setIdUsuario] = useState("3");
    const params = useParams();
    const id = params.id;
    
    const ruta = useOneViajeRuta(id)
    console.log(ruta)

  return (
    <div>
        {
            ruta && 
                <div key={ruta.id_viaje}>
                    <h1>Origen: {ruta.origen_viaje}</h1>
                    <h1>Destino: {ruta.destino_viaje}</h1>
                    <h1>Distancia: {ruta.distancia_viaje}</h1>
                    <h1>Fecha viaje: {ruta.fecha_viaje}</h1>
                    <h1>Hora viaje: {ruta.hora_viaje}</h1>
                </div>
            
        }
    </div>
  )
}

export default RutaMapa