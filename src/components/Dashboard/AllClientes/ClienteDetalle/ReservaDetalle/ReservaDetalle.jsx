/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useOneReserva } from "../../../../../hooks/useOneReserva";
import { Link } from "react-router-dom";
import "./reserva.css";

function ReservaDetalle() {
  // Obtener el id del usuario
  const token = localStorage.getItem("token");
  const idUsuario = token ? JSON.parse(atob(token.split(".")[1])).id_usuario : "";

  // Obtener el id de la reserva de la ruta
  const params = useParams();
  const id = params.id;

  // Estado local para almacenar la página actual
  const [currentPage, setCurrentPage] = useState(1);
  // Reservas por página
  const reservasPerPage = 3; 
  // Calcular el índice de inicio y fin de las reservas a mostrar en la página actual
  const indexOfLastReserva = currentPage * reservasPerPage;
  // Obtener el índice de la primera reserva
  const indexOfFirstReserva = indexOfLastReserva - reservasPerPage;

  // Obtener las reservas
  const reservas = useOneReserva(id, idUsuario);

  // Obtener las reservas a mostrar en la página actual
  const currentReservas = reservas.slice(indexOfFirstReserva, indexOfLastReserva);

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
          {currentReservas.map((reserva) => (
            <tr key={reserva.id_reserva}>
              <td>{formatDate(reserva.fecha_reserva)}</td>
              <td>{formatTime(reserva.hora_reserva)}</td>
              {reserva.estado_reserva === "Pendiente" ? (
                <td>
                  <p className="estado__pendiente">Pendiente</p>
                </td>
              ) : (
                <td>
                  <p className="estado__confirmado">Confirmada</p>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination__container">
        <button className="button__anterior" onClick={()=> setCurrentPage(currentPage - 1) } disabled={currentPage === 1}>
          Anterior
        </button>
        <span className="span__numero">
          Página {currentPage}
        </span>
        <button className="button__siguiente" onClick={() => setCurrentPage(currentPage + 1)} disabled={indexOfLastReserva >= reservas.length }>
          Siguiente
        </button>
      </div>
      <Link className="button__volver" to={"/dashboard/clientes"}>
        Volver
      </Link>
    </div>
  );
}

export default ReservaDetalle;

