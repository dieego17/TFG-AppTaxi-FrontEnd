/* eslint-disable no-unused-vars */
import React from 'react'
import { useGanancias } from '../../../../hooks/useGanancias'

function AllGanancias() {

    const ganancias = useGanancias()

  return (
    <div>
        <h2>GANANCIAS</h2>
        {
            ganancias.map(ganancia =>{
                console.log(ganancia),
                <div key={ganancia.id} >
                    <p>Descripción: {ganancia.descripcion_ganancia}</p>
                    <p>Total: {ganancia.ganancia_total}€</p>
                    <p>Fecha: {ganancia.fecha_ganancia}</p>
                </div>
            })
            
        }
    </div>
  )
}

export default AllGanancias