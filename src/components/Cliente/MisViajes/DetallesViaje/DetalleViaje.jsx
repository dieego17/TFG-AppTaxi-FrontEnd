/* eslint-disable no-unused-vars */
import React from 'react'
import { useParams } from 'react-router-dom'
import { useOneViajeDetalleCliente } from '../../../../hooks/useOneViajeDetalleCliente'
import './detalle.css'
import { Link } from 'react-router-dom'

function DetalleViaje() {

    const params = useParams();
    const id = params.id;
    
    const viaje = useOneViajeDetalleCliente(id);

    // Función para formatear la fecha
    const formatearFecha = (fecha) => {
        const date = new Date(fecha);
        return date.toLocaleDateString();
    };


  return (
    <section className='container container__viaje--detalle'>
        <h1>Detalle Viaje</h1>
        <article className='article__viaje'>
            <p>Origen: {viaje.origen_viaje}</p>
            <p>Destino: {viaje.destino_viaje}</p>
            <p>Fecha: {formatearFecha(viaje.fecha_viaje)}</p>
            <p>Hora: {viaje.hora_viaje}</p>
            <p>Precio Total: {viaje.precioTotal_viaje}€</p>
            <p>Factura: {viaje.factura_viaje}</p>
        </article>
        <Link to={'/cliente/mis-viajes'}>
            Volver
        </Link>
    </section>
  )
}

export default DetalleViaje