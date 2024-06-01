/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useOneReserva } from "../../../../../hooks/useOneReserva";
import "./reserva.css";

function ReservaDetalle() {
  // Obtener el id del usuario
  const token = localStorage.getItem("token");
  const idUsuario = token ? JSON.parse(atob(token.split(".")[1])).id_usuario : "";

  // Obtener el id de la reserva de la ruta
  const { id } = useParams();

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
      {currentReservas.length === 0 ? (
        <h1 className="no__reservas">No existen reservas para este cliente</h1>
      ) : (
        <div>
          <h1 className="h1__allClientes">Todas las Reservas</h1>
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
                  <td data-label="Fecha Reserva">{formatDate(reserva.fecha_reserva)}</td>
                  <td data-label="Hora Reserva">{formatTime(reserva.hora_reserva)}</td>
                  <td data-label="Estado Reserva">
                    <button className={reserva.estado_reserva === "Pendiente" ? "estado__pendiente" : "estado__confirmado"}>
                      {reserva.estado_reserva}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination__container">
            <button className="button__anterior" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
              Anterior
            </button>
            <span className="span__numero">
              Página {currentPage}
            </span>
            <button className="button__siguiente" onClick={() => setCurrentPage(currentPage + 1)} disabled={indexOfLastReserva >= reservas.length}>
              Siguiente
            </button>
          </div>
        </div>
      )}
      <div className="container__buttonVolver">
        <Link className="button__volver" to={"/dashboard/clientes"}>
          Volver
        </Link>
      </div>
    </div>
  );
}

export default ReservaDetalle;
