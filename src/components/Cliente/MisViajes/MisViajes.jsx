/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useViajesCliente } from "../../../hooks/useViajesCliente";
import { Link } from "react-router-dom";


function MisViajes() {

  // Obtener el id del usuario del token
  const token = localStorage.getItem('token');
  const idUsuario = token ? JSON.parse(atob(token.split('.')[1])).id_usuario : '';

  const viajes = useViajesCliente(idUsuario);


  // Función para formatear la fecha
  const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString();
  };


  return (
    <div className="container__reservas container">
      <h2>Mis Viajes</h2>
      {viajes && viajes.length > 0 ? (
        <div>
          <table className="table">
            <thead className="table__thead">
              <tr className="table__tr">
                <th className="table__th">Origen</th>
                <th className="table__th">Destino</th>
                <th className="table__th">Fecha</th>
                <th className="table__th">Estado Viaje</th>
                <th className="table__th">Hora Reserva</th>
                <th className="table__th">Precio Total</th>
                <th className="table__th">Más información</th>
              </tr>
            </thead>
            <tbody className="table__tbody">
              {viajes.map((viaje) => (
                <tr className="table__tr" key={viaje.id_viaje}>
                    <td className="table__td">{viaje.origen_viaje}</td>
                    <td className="table__td">{viaje.destino_viaje}</td>
                    <td className="table__td">
                        {formatearFecha(viaje.fecha_viaje)}
                    </td>
                    <td className="table__td">{viaje.estado_viaje}</td>
                    <td className="table__td">{viaje.hora_viaje}</td>
                    <td className="table__td">{viaje.precioTotal_viaje}€</td>
                    <td className="table__td">
                        <Link to={`/cliente/mis-viajes/detalles/${viaje.id_viaje}`}>
                            <i className="fa-solid fa-circle-info"></i>
                        </Link>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No existen viajes para este usuario</p>
      )}
    </div>
  );
}

export default MisViajes;
