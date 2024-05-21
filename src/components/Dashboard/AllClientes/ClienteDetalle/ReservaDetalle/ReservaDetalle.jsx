/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useOneReserva } from "../../../../../hooks/useOneReserva";
import { Link } from "react-router-dom";
import "./reserva.css";

function ReservaDetalle() {
  const [idUsuario, setIdUsuario] = useState("3"); // idUsuario de prueba
  const params = useParams();
  const id = params.id;

  // Estado local para almacenar la página actual
  const [currentPage, setCurrentPage] = useState(1);
  // Reservas por página
  const reservasPerPage = 4; 

  // Obtener las reservas
  const reservas = useOneReserva(id, idUsuario, currentPage, reservasPerPage);

  // Función para ir a la página siguiente
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Función para ir a la página anterior
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

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
          {reservas.map((reserva) => (
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
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Anterior
        </button>
        <span>
          Página {currentPage}
        </span>
        <button onClick={handleNextPage} disabled={reservas.length < reservasPerPage}>
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

