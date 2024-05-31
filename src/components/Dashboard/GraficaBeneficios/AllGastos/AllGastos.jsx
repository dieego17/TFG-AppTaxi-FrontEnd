/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGastos } from "../../../../hooks/useGastos";
import { deleteGasto } from "../../../../services/deleteGasto";
import './allgastos.css'

function AllGastos() {
  const token = localStorage.getItem("token");
  const idUsuario = token
    ? JSON.parse(atob(token.split(".")[1])).id_usuario
    : "";

  const [currentPage, setCurrentPage] = useState(1);

  const gastosPerPage = 4;
  const indexOfLastGasto = currentPage * gastosPerPage;
  const indexOfFirstGasto = indexOfLastGasto - gastosPerPage;

  const gastos = useGastos(idUsuario);

  const currentGastos = gastos.slice(indexOfFirstGasto, indexOfLastGasto);

  // Estado para almacenar el gasto seleccionado
  const [gastoSeleccionado, setGastoSeleccionado] = useState(null);

  // Función para eliminar una gasto
  const handleDelete = async () => {
    if (!gastoSeleccionado) return;

    const deleted = await deleteGasto(gastoSeleccionado.id_gasto);
    if (deleted) {
      window.location.reload();
    }
  };

  // Formatear la fecha
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const handleEliminarClick = (gasto) => {
    setGastoSeleccionado(gasto);
  };

  return (
    <div>
      <h2 className="h2__graficaGanancias">Todos los Gastos</h2>
      <div className="container__button--perdida">
        <Link to='/dashboard/resumen-financiero/añadir-gasto' className='button__perdida'>
          Insertar Nuevo Gasto
        </Link>
      </div>
      {currentGastos && currentGastos.length > 0 ? (
        <table className="table">
          <thead className="table__thead">
            <tr className="table__tr">
              <th className="table__th">Descripción</th>
              <th className="table__th">Gasto Total</th>
              <th className="table__th">Fecha</th>
              <th className="table__th">Eliminar</th>
            </tr>
          </thead>
          <tbody className="table__tbody">
            {currentGastos.map((gasto) => (
              <tr className="table__tr" key={gasto.id_gasto}>
                <td data-label="Descripción" className="table__td">{gasto.descripcion_gasto}</td>
                <td data-label="Gastos Total" className="table__td">{gasto.gasto_total}€</td>
                <td data-label="Fecha" className="table__td">{formatDate(gasto.fecha_gasto)}</td>
                <td data-label="Eliminar" className="table__td">
                  <button
                    type="button"
                    className="btn"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => handleEliminarClick(gasto)}
                  >
                    <i className="fa-solid fa-trash-can icon__basura"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No existen gastos.</p>
      )}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title" id="exampleModalLabel">
                <i className="fa-regular fa-circle-xmark"></i>
              </h1>
            </div>
            <div className="modal-body">
              <p>¿Estas seguro que quieres eliminar el gasto de {gastoSeleccionado && gastoSeleccionado.descripcion_gasto}?<br />
                Este proceso no podrá deshacerse.
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={handleDelete}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Botones de paginación */}
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
          disabled={indexOfLastGasto >= gastos.length}
        >
          Siguiente
        </button>
      </div>
      <div className="pagination__container">
        <Link className="button__volver" to={"/dashboard/resumen-financiero"}>
          Volver
        </Link>
      </div>
    </div>
  );
}

export default AllGastos;
