/* eslint-disable no-unused-vars */
import React from 'react'
import { useParams } from 'react-router-dom';
import { useOneCliente } from '../../../../../hooks/useOneCliente';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function ReservaDetalle() {

    const [idUsuario, setIdUsuario] = useState('3'); // idUsuario de prueba
    const params = useParams();
    const id = params.id;
    const clientes = useOneCliente(id, idUsuario);

    return (
        <div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Fecha Reserva</th>
                        <th>Hora Reserva</th>
                        <th>Estado Reserva</th>
                    </tr>
                </thead>
                <tbody>
                {
                clientes.map((cliente) => (
                    cliente.reservas.map((reserva) => (
                                <tr key={reserva.id_reserva}>
                                    <td>{reserva.fecha_reserva}</td>
                                    <td>{reserva.hora_reserva}</td>
                                    <td>{reserva.estado_reserva}</td>
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

export default ReservaDetalle