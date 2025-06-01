/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGanancias } from "../../../../hooks/useGanancias";
import { deleteGanancia } from "../../../../services/deleteGanancia";

function AllGanancias() {
  const token = localStorage.getItem("token");
  const idUsuario = token ? JSON.parse(atob(token.split(".")[1])).id_usuario : "";

  const [alertDelete, setAlertDelete] = useState(false);

  // Estado para almacenar la página actual
  const [currentPage, setCurrentPage] = useState(1);
  const gananciasPerPage = 4;
  // Calcular el índice del último gasto y del primer gasto
  const indexOfLastGanancia = currentPage * gananciasPerPage;
  const indexOfFirstGanancia = indexOfLastGanancia - gananciasPerPage;

  // Obtener todas las ganancias usando el hook
  const allGanancias = useGanancias(idUsuario);
  console.log(allGanancias);
  // Estado para almacenar las ganancias
  const [ganancias, setGanancias] = useState(allGanancias);

 // Actualizar el estado cuando las ganancias se carguen
 useEffect(() => {
    setGanancias(allGanancias);
  }, [allGanancias]);

  // Obtener las ganancias actuales
  const currentGanancias = ganancias.slice(
    indexOfFirstGanancia,
    indexOfLastGanancia
  );

  // Estado para almacenar la ganancia seleccionada
  const [gananciaSeleccionada, setGananciaSeleccionada] = useState(null);

  // Función para eliminar una ganancia
  const handleDelete = async () => {
    if (!gananciaSeleccionada) return;

    // Llamar a la función para eliminar una ganancia
    const deleted = await deleteGanancia(gananciaSeleccionada.id_ganancia);
    // Si se elimina la ganancia, actualizar el estado
    if (deleted) {
      // Filtrar las ganancias para eliminar la ganancia seleccionada
      setGanancias(ganancias.filter(g => g.id_ganancia !== gananciaSeleccionada.id_ganancia));
      setGananciaSeleccionada(null);
      setAlertDelete(true);
    }
  };

  const handleEliminarClick = (ganancia) => {
    // Almacenar la ganancia seleccionada
    setGananciaSeleccionada(ganancia);
  };

  // Formatear la fecha
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div>
      {
        alertDelete && (
          <div className="container__body">
              <div className="notificacion__container">
                <div className="notificacion__body">
                  <i className="notificacion__icon fa-regular fa-circle-check"></i>
                  <p className="texto__success--grande">
                    Ganancia eliminada correctamente.
                  </p>
                </div>
                <div className="notifiacion__progress"></div>
              </div>
            </div>
        )
      }
      <h2 className="h2__graficaGanancias">Todas las Ganancias</h2>
      <div className="container__button--ganancia">
        <Link
          to="/dashboard/resumen-financiero/añadir-ganancia"
          className="button__ganancias button__insertar--ganancia"
        >
          Insertar Nueva Ganancia
        </Link>
      </div>
      {currentGanancias && ganancias.length > 0 ? (
        <table className="table">
          <thead className="table__thead">
            <tr className="table__tr">
              <th className="table__th">Descripción</th>
              <th className="table__th">Ganancia Total</th>
              <th className="table__th">Fecha</th>
              <th className="table__th">Eliminar</th>
            </tr>
          </thead>
          <tbody className="table__tbody">
            {currentGanancias.map((ganancia) => (
              <tr className="table__tr" key={ganancia.id_ganancia}>
                <td data-label="Descripción" className="table__td">{ganancia.descripcion_ganancia}</td>
                <td data-label="Ganancia Total" className="table__td">{ganancia.ganancia_total}€</td>
                <td data-label="Fecha" className="table__td">
                  {formatDate(ganancia.fecha_ganancia)}
                </td>
                <td data-label="Eliminar" className="table__td">
                  <button
                    type="button"
                    className="btn"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => handleEliminarClick(ganancia)}
                  >
                    <i className="fa-solid fa-trash-can icon__basura"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no__clientes">No existen ganancias.</p>
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
              <p>¿Estas seguro que quieres eliminar la ganancia de {gananciaSeleccionada &&
                gananciaSeleccionada.descripcion_ganancia}?<br />
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
          disabled={indexOfLastGanancia >= ganancias.length}
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

export default AllGanancias;
