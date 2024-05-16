/* eslint-disable no-unused-vars */
import React from "react";
import { useParams } from "react-router-dom";
import { useOneCliente } from "../../../../../hooks/useOneCliente";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./reserva.css";

function ReservaDetalle() {
  const [idUsuario, setIdUsuario] = useState("3"); // idUsuario de prueba
  const params = useParams();
  const id = params.id;
  const clientes = useOneCliente(id, idUsuario);

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
          {clientes.map((cliente) =>
            cliente.reservas.map((reserva) => (
              <tr key={reserva.id_reserva}>
                <td>{formatDate(reserva.fecha_reserva)}</td>
                <td>{formatTime(reserva.hora_reserva)}</td>

                {reserva.estado_reserva === "Pendiente" ? (
                    <td className="estado__pendiente">
                        Pendiente
                    </td>
                    ) : 
                    <td className="estado__confirmado">
                        Confirmada
                    </td>
                    }
              </tr>
            ))
          )}
        </tbody>
      </table>
      <Link to={"/dashboard/clientes"}>Volver</Link>
    </div>
  );
}

export default ReservaDetalle;
