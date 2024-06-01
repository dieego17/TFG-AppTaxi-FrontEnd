/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useViajesCliente } from "../../../hooks/useViajesCliente";
import { Link } from "react-router-dom";
import "./misViajes.css";


function MisViajes() {

  // Obtener el id del usuario del token
  const token = localStorage.getItem('token');
  const idUsuario = token ? JSON.parse(atob(token.split('.')[1])).id_usuario : '';

  const viajes = useViajesCliente(idUsuario);

  // Estado local para el número de página actual
  const [currentPage, setCurrentPage] = useState(1);
  // Lógica para calcular el índice de inicio y fin de los viajes a mostrar en la página actual
  const viajesPerPage = 3;

  // Obtener el índice de la última reserva y el índice de la primera reserva
  const indexOfLastViaje = currentPage * viajesPerPage;
  // Obtener el índice de la primera reserva
  const indexOfFirstViaje = indexOfLastViaje - viajesPerPage;

  // Obtener los viajes a mostrar en la página actual
  const currentViajes = viajes.slice(indexOfFirstViaje, indexOfLastViaje);


  // Función para formatear la fecha
  const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString();
  };


  const calcularIva = (precio) => {
    const resta = (precio * 0.1).toFixed(1);
    return parseFloat(resta) + precio;
  };



  return (
    <div className="container__reservas container">
      <h2 className="h2__viajesCliente">Mis Viajes</h2>
      {currentViajes && currentViajes.length > 0 ? (
        <div>
          <table className="table">
            <thead className="table__thead">
              <tr className="table__tr">
                <th className="table__th">Origen</th>
                <th className="table__th">Destino</th>
                <th className="table__th">Fecha</th>
                <th className="table__th">Hora</th>
                <th className="table__th">Estado</th>
                <th className="table__th">Precio</th>
                <th className="table__th">Más información</th>
              </tr>
            </thead>
            <tbody className="table__tbody">
              {currentViajes.map((viaje) => (
                <tr className="table__tr" key={viaje.id_viaje}>
                    <td data-label="Origen" className="table__td">{viaje.origen_viaje}</td>
                    <td data-label="Destino" className="table__td">{viaje.destino_viaje}</td>
                    <td data-label="Fecha" className="table__td">
                        {formatearFecha(viaje.fecha_viaje)}
                    </td>
                    <td data-label="Hora" className="table__td">{viaje.hora_viaje}</td>
                    <td data-label="Estado" className="table__td">
                      {viaje.estado_viaje === "Pendiente" ? (
                          <button className="texto__pendiente">Pendiente</button>
                        ) : viaje.estado_viaje === "Finalizado" ? (
                          <button className="texto__confirmado">Finaliado</button>
                        ) : null}
                    </td>
                    <td data-label="Precio" className="table__td">{calcularIva(viaje.precioTotal_viaje)}€</td>
                    <td data-label="Más información" className="table__td">
                        <Link to={`/cliente/mis-viajes/detalles/${viaje.id_viaje}`}>
                            <i className="fa-solid fa-circle-info link__details"></i>
                        </Link>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Botones de paginación */}
          <div className="pagination__container">
            <button className="button__anterior"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <span className="span__numero">
              Página {currentPage}
            </span>
            <button className="button__siguiente"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={indexOfLastViaje >= viajes.length}
            >
              Siguiente
            </button>
          </div>
        </div>
      ) : (
        <p>No existen viajes para este usuario</p>
      )}
    </div>
  );
}

export default MisViajes;
