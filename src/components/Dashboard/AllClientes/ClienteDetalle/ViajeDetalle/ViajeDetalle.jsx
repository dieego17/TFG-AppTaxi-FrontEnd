/* eslint-disable no-unused-vars */
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useOneCliente } from '../../../../../hooks/useOneCliente';
import { useState } from 'react';

function ClienteDetalle() {
    const [idUsuario, setIdUsuario] = useState('3'); // idUsuario de prueba
    const params = useParams();
    const id = params.id;
    const clientes = useOneCliente(id, idUsuario);

    return (
        <div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Destino Viaje</th>
                        <th>Origen Viaje</th>
                        <th>Hora Viaje</th>
                        <th>Fecha Viaje</th>
                        <th>Estado Viaje</th>
                        <th>Precio Viaje</th>
                    </tr>
                </thead>
                <tbody>
                {
                clientes.map((cliente) => (
                    cliente.reservas.map((reserva) => (
                                <tr key={reserva.viaje.id_viaje}>
                                <td>{reserva.viaje.destino_viaje}</td>
                                <td>{reserva.viaje.origen_viaje}</td>
                                <td>{reserva.viaje.hora_viaje}</td>
                                <td>{reserva.viaje.fecha_viaje}</td>
                                <td>{reserva.viaje.estado_viaje}</td>
                                <td>{reserva.viaje.precioTotal_viaje}€</td>
                                </tr>
                    ))
                ))
            }
                </tbody>
            </table>
            <Link to={'/dashboard/clientes'}>Volver</Link>
        </div>
    );
}

export default ClienteDetalle;
