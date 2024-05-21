/* eslint-disable no-unused-vars */
import React from "react";
import { useParams } from "react-router-dom";
import { useOneReserva } from "../../../../../hooks/useOneReserva";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./reserva.css";

function ReservaDetalle() {
  const [idUsuario, setIdUsuario] = useState("3"); // idUsuario de prueba
  const params = useParams();
  const id = params.id;
  const reservas = useOneReserva(id, idUsuario);

   // Función para formatear la fecha
   const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  // Función para formatear la hora
  const formatTime = (time) => {
    const [hour, minute] = time.split(":");
    return `${hour}:${minute}`;
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Fecha Reserva</th>
            <th>Hora Reserva</th>
            <th>Estado Reserva</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((reserva) =>
            <tr key={reserva.id_reserva}>
            <td>{formatDate(reserva.fecha_reserva)}</td>
            <td>{formatTime(reserva.hora_reserva)}</td>

            {reserva.estado_reserva === "Pendiente" ? (
                <td>
                    <p className="estado__pendiente">Pendiente</p>
                </td>
                ) : 
                <td>
                    <p className="estado__confirmado">Confirmada</p>
                </td>
                }
          </tr>
          )}
        </tbody>
      </table>
      <Link className="button__volver" to={"/dashboard/clientes"}>Volver</Link>
    </div>
  );
}

export default ReservaDetalle;
