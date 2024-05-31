/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useClientes } from "../../../hooks/useClientes";
import { Link } from "react-router-dom";
import "./allclientes.css";

function AllClientes() {
  const token = localStorage.getItem("token");
  const idUsuario = token ? JSON.parse(atob(token.split(".")[1])).id_usuario : "";

  // Estado local para el número de página actual
  const [currentPage, setCurrentPage] = useState(1);

  // Lógica para calcular el índice de inicio y fin de los clientes a mostrar en la página actual
  const clientsPerPage = 4;
  // Obtener el índice de la última reserva y el índice de la primera reserva
  const indexOfLastClient = currentPage * clientsPerPage;
  // Obtener el índice de la primera reserva
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;

  // Obtener la lista de clientes utilizando el hook useClientes
  const clientes = useClientes(idUsuario);

  // Obtener los clientes a mostrar en la página actual
  const currentClients = clientes.slice(indexOfFirstClient, indexOfLastClient);

  return (
    <div>
      {currentClients.length === 0 ? (
        <h1 className="no__clientes">Todavía no tienes clientes</h1>
      ) : (
        <div className="table-container">
          <h1 className="h1__allClientes">Todos los Clientes</h1>
          <table className="table">
            <thead className="table__thead">
              <tr className="table__tr">
                <th className="table__th">Nombre</th>
                <th className="table__th">Apellidos</th>
                <th className="table__th">Teléfono</th>
                <th className="table__th">Email</th>
                <th className="table__th">Dirección</th>
                <th className="table__th">Reservas</th>
                <th className="table__th">Viajes</th>
              </tr>
            </thead>
            <tbody className="table__tbody">
              {currentClients.map((cliente) => (
                <tr className="table__tr" key={cliente.id_usuario}>
                  <td data-label="Nombre" className="table__td">{cliente.usuario.nombre}</td>
                  <td data-label="Apellidos" className="table__td">{cliente.usuario.apellidos}</td>
                  <td data-label="Teléfono" className="table__td">{cliente.usuario.telefono}</td>
                  <td data-label="Email" className="table__td">{cliente.usuario.correo_electronico}</td>
                  <td data-label="Dirección" className="table__td">{cliente.usuario.direccion_usuario}</td>
                  <td data-label="Reservas" className="table__td">
                    <Link
                      className="td__link"
                      to={`/dashboard/clientes/reservas-detalle/${cliente.id_usuario}`}
                    >
                      <i className="bi bi-suitcase-lg-fill link__icon"></i>
                    </Link>
                  </td>
                  <td data-label="Viajes" className="table__td">
                    <Link
                      className="td__link"
                      to={`/dashboard/clientes/viajes-detalle/${cliente.id_usuario}`}
                    >
                      <i className="fa-solid fa-taxi link__icon"></i>
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
              disabled={indexOfLastClient >= clientes.length}
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllClientes;
