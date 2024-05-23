/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useReservasClientes } from '../../../hooks/useReservasClientes';
import { updateEstadoViaje } from '../../../services/updateEstadoReserva';
import { deleteReserva } from '../../../services/deleteReserva';
import './misReservas.css';

function MisReservas() {
    const [idUsuario, setIdUsuario] = useState(1);
    const reservasData = useReservasClientes(idUsuario);
    const [reservas, setReservas] = useState([]);

    // use effect para actualizar las reservas
    useEffect(() => {
        setReservas(reservasData);
    }, [reservasData]);

    // Función para formatear la fecha
    const formatearFecha = (fecha) => {
        const date = new Date(fecha);
        return date.toLocaleDateString();
    };

    // Función para cancelar una reserva
    const cancelarReserva = async (event, reservaId) => {
        event.preventDefault();
        const reservaCancelada = await deleteReserva(reservaId);
        // Si la reserva se cancela, se actualiza el estado de las reservas
        if (reservaCancelada) {
          // Se filtra la reserva que se canceló
            setReservas((prevReservas) =>
              // Se actualiza el estado de las reservas
                prevReservas.filter((reserva) => reserva.id_reserva !== reservaId)
            );
            window.location.reload();
        }
    };

    // Función para confirmar una reserva
    const confirmarReserva = async (event, reservaId) => {
        event.preventDefault();
        // Se actualiza el estado de la reserva
        const nuevoEstado = 'Confirmada';
        // Se actualiza el estado de la reserva en la base de datos
        const reservaActualizada = await updateEstadoViaje(reservaId, nuevoEstado);
        // Si la reserva se actualiza, se actualiza el estado de las reservas
        if (reservaActualizada) {
          // Se actualiza el estado de las reservas
            setReservas((prevReservas) =>
                prevReservas.map((reserva) =>
                    reserva.id_reserva === reservaId
                        ? { ...reserva, estado_reserva: nuevoEstado }
                        : reserva
                )
            );
        }
    };

    return (
        <div className='container__reservas container'>
            <h2>Mis Reservas</h2>
            {reservas && reservas.length > 0 ? (
                <div>
                    <table className='table'>
                        <thead className='table__thead'>
                            <tr className='table__tr'>
                                <th className='table__th'>Fecha</th>
                                <th className='table__th'>Estado Reserva</th>
                                <th className='table__th'>Hora Reserva</th>
                            </tr>
                        </thead>
                        <tbody className='table__tbody'>
                            {reservas.map((reserva) => (
                                <tr className='table__tr' key={reserva.id_reserva}>
                                    <td className='table__td'>{formatearFecha(reserva.fecha_reserva)}</td>
                                    <td className='table__td'>
                                        <div>
                                            {reserva.estado_reserva === 'Pendiente' ? (
                                                <p>Reserva Pendiente</p>
                                            ) : reserva.estado_reserva === 'Confirmada' ? (
                                                <p>Reserva Confirmada</p>
                                            ) : null}
                                        </div>
                                        {reserva.estado_reserva === 'Pendiente' && (
                                            <div className='container__buttons'>
                                                <button className='estado__cancelado' onClick={(event) => cancelarReserva(event, reserva.id_reserva)}>Cancelar</button>
                                                <button className='estado__confirmado' onClick={(event) => confirmarReserva(event, reserva.id_reserva)}>Confirmar</button>
                                            </div>
                                        )}
                                    </td>
                                    <td className='table__td'>{reserva.hora_reserva}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No existen reservas para este usuario</p>
            )}
        </div>
    );
}

export default MisReservas;
