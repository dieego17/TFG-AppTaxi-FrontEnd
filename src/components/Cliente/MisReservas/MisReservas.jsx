/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useReservasClientes } from "../../../hooks/useReservasClientes";
import { updateEstadoViaje } from "../../../services/updateEstadoReserva";
import { deleteReserva } from "../../../services/deleteReserva";
import "./misReservas.css";
import { Link } from "react-router-dom";

function MisReservas() {
  // ID del usuario
  const token = localStorage.getItem("token");
  const idUsuario = token
    ? JSON.parse(atob(token.split(".")[1])).id_usuario
    : "";

  const reservasData = useReservasClientes(idUsuario);
  const [reservas, setReservas] = useState([]);
  const [reservaAEliminar, setReservaAEliminar] = useState(null);

  // Estado local para el número de página actual
  const [currentPage, setCurrentPage] = useState(1);
  // Lógica para calcular el índice de inicio y fin de las reservas a mostrar en la página actual
  const reservasPerPage = 3;

  // Obtener el índice de la última reserva y el índice de la primera reserva
  const indexOfLastReserva = currentPage * reservasPerPage;
  // Obtener el índice de la primera reserva
  const indexOfFirstReserva = indexOfLastReserva - reservasPerPage;

  // Obtener las reservas a mostrar en la página actual
  const currentReservas = reservas.slice(
    indexOfFirstReserva,
    indexOfLastReserva
  );

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
    }
  };

  // Función para confirmar una reserva
  const confirmarReserva = async (event, reservaId) => {
    event.preventDefault();
    // Se actualiza el estado de la reserva
    const nuevoEstado = "Confirmada";
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
    <div className="container__reservas container">
      <h2 className="h2__reservasCliente">Mis Reservas</h2>
      {currentReservas && currentReservas.length > 0 ? (
        <div>
          <table className="table">
            <thead className="table__thead">
              <tr className="table__tr">
                <th className="table__th">Fecha</th>
                <th className="table__th">Hora</th>
                <th className="table__th">Estado</th>
                <th className="table__th">Origen Viaje</th>
                <th className="table__th">Destino Viaje</th>
                <th className="table__th">Acciones</th>
              </tr>
            </thead>
            <tbody className="table__tbody">
              {currentReservas.map((reserva) => (
                <tr className="table__tr" key={reserva.id_reserva}>
                  <td data-label="Fecha" className="table__td">
                    {formatearFecha(reserva.fecha_reserva)}
                  </td>
                  <td data-label="Hora" className="table__td">
                    {reserva.hora_reserva}
                  </td>
                  <td data-label="Estado" className="table__td table__estado">
                    <div>
                      {reserva.estado_reserva === "Pendiente" ? (
                        <button className="texto__pendiente">Pendiente</button>
                      ) : reserva.estado_reserva === "Confirmada" ? (
                        <button className="texto__confirmado">
                          Confirmada
                        </button>
                      ) : null}
                    </div>
                  </td>
                  <td data-label="Origen Viaje" className="table__td">
                    {reserva.viaje.origen_viaje}
                  </td>
                  <td data-label="Destino Viaje" className="table__td">
                    {reserva.viaje.destino_viaje}
                  </td>
                  <td data-label="Acciones" className="table__td">
                    {reserva.estado_reserva === "Pendiente" && (
                      <div className="container__buttons">
                        <button
                          type="button"
                          className="estado__cancelado"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() =>
                            setReservaAEliminar(reserva.id_reserva)
                          }
                        >
                          Cancelar
                        </button>

                        <div
                          className="modal fade"
                          id="exampleModal"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h1
                                  className="modal-title"
                                  id="exampleModalLabel"
                                >
                                  <i className="fa-regular fa-circle-xmark"></i>
                                </h1>
                              </div>
                              <div className="modal-body">
                                <p className="modal__text">
                                  ¿Estas seguro que quieres cancelar la reserva
                                  seleccionada y eliminarla?
                                  <br />
                                  Este proceso no podrá deshacerse.
                                </p>
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-bs-dismiss="modal"
                                >
                                  Cerrar
                                </button>
                                <button
                                  type="button"
                                  className="estado__cancelado"
                                  onClick={(event) =>
                                    cancelarReserva(event, reservaAEliminar)
                                  }
                                  data-bs-dismiss="modal"
                                >
                                  Eliminar
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button
                          className="estado__confirmado"
                          onClick={(event) =>
                            confirmarReserva(event, reserva.id_reserva)
                          }
                        >
                          Confirmar
                        </button>
                      </div>
                    )}
                    {reserva.estado_reserva === "Confirmada" && (
                      <div className="container__mensaje">
                        No se pueden realizar más acciones
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination__container">
            <button
              className="button__anterior"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <span className="span__numero">Página {currentPage}</span>
            <button
              className="button__siguiente"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={indexOfLastReserva >= reservasData.length}
            >
              Siguiente
            </button>
          </div>
        </div>
      ) : (
        <p className="no__clientes">Todavía no tienes ninguna reserva</p>
      )}
    </div>
  );
}

export default MisReservas;
