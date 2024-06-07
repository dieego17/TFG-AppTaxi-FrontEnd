/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useOneViaje } from "../../../../../hooks/useOneViaje";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { updateEstadoViaje } from "../../../../../services/updateEstadoViaje";
import Pdf from "../../../../pdf/Pdf";
import "./viaje.css";
import { cancelarViajeTaxista } from "../../../../../services/cancelarViajeTaxista";

function ClienteDetalle() {
  /* Solo aparecen los viajes del cliente que haya confirmado la reserva */
  // Obtener el id del usuario
  const token = localStorage.getItem("token");
  const idUsuario = token ? JSON.parse(atob(token.split(".")[1])).id_usuario : "";

  // Obtener el id del viaje de la ruta
  const params = useParams();
  const id = params.id;

   // Estado para almacenar el viaje seleccionado
  const [viajeSeleccionado, setViajeSeleccionado] = useState(null);

  // Función para eliminar un viaje
  const handleEliminarClick = async (idViaje) => {
    setViajeSeleccionado(idViaje);
  }

  // Estado local para almacenar la página actual
  const [currentPage, setCurrentPage] = useState(1);
  const viajesPerPage = 3; // Viajes por página
  // Calcular el índice de inicio y fin de los viajes a mostrar en la página actual
  const indexOfLastViaje = currentPage * viajesPerPage;
  // Obtener el índice de la primera reserva
  const indexOfFirstViaje = indexOfLastViaje - viajesPerPage;

  // Estado local para almacenar los viajes
  const [viajes, setViajes] = useState([]);

  // Funcion para formatear la fecha
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  //Funcion para formatear la hora
  const formatTime = (time) => {
    const [hour, minute] = time.split(":");
    return `${hour}:${minute}`;
  };

  //Función para cambiar el estado del viaje
  const handleChangeEstadoViaje = async (viajeId, nuevoEstado) => {
    // Actualizar el estado en la base de datos
    await updateEstadoViaje(viajeId, nuevoEstado);

    // Actualizar el estado localmente
    setViajes((prevViajes) =>
      prevViajes.map((viaje) =>
        viaje.id_viaje === viajeId ? { ...viaje, estado_viaje: nuevoEstado } : viaje
      )
    );
  };

  //Función para cancelar el viaje
  const handleCancelarViaje = async () => {
    if (!viajeSeleccionado) return;
  
    const viajeId = viajeSeleccionado;
  
    // Actualizar el estado local para eliminar el viaje cancelado
    setViajes(prevViajes => prevViajes.filter(viaje => viaje.id_viaje !== viajeId));
  
    // Actualizar el estado en la base de datos
    await cancelarViajeTaxista(viajeId);
  };

  // Obtener los datos del viaje
  const fetchedViajes = useOneViaje(id, idUsuario);

  // Obtener los viajes a mostrar en la página actual
  const currentViajes = viajes.slice(indexOfFirstViaje, indexOfLastViaje);

  // Actualizar el estado localmente
  useEffect(() => {
    setViajes(fetchedViajes);
  }, [fetchedViajes]);

  const calcularIva = (precio) => {
    const resta = (precio * 0.1).toFixed(1);
    return parseFloat(resta) + precio;
  };

  return (
    <div>
      {currentViajes.length === 0 ? (
        <p className="no__clientes">No existen viajes para este cliente</p>
      ) : (
        <div>
          <h1 className="h1__allClientes">Todos los Viajes</h1>
          <table className="table">
            <thead>
              <tr>
                <th className="table__th">Origen</th>
                <th className="table__th">Destino</th>
                <th className="table__th">Hora</th>
                <th className="table__th">Fecha</th>
                <th className="table__th">Estado</th>
                <th className="table__th">Precio</th>
                <th className="table__th">Factura</th>
                <th className="table__th">Ruta</th>
              </tr>
            </thead>
            <tbody>
              {currentViajes.map((viaje) => (
                <tr key={viaje.id_viaje}>
                  <td className="table__td" data-label="Origen">{viaje.origen_viaje}</td>
                  <td className="table__td" data-label="Destino">{viaje.destino_viaje}</td>
                  <td className="table__td" data-label="Hora">{formatTime(viaje.hora_viaje)}</td>
                  <td className="table__td" data-label="Fecha">{formatDate(viaje.fecha_viaje)}</td>
                  <td className="table__td" data-label="Estado">
                    <button className={viaje.estado_viaje === 'Pendiente' ? "estado__pendiente" : "estado__confirmado"}>{viaje.estado_viaje}</button>
                    <br />
                    <button className="button__estado" onClick={() => handleChangeEstadoViaje(viaje.id_viaje, viaje.estado_viaje === 'Pendiente' ? 'Finalizado' : 'Pendiente')}>
                      {viaje.estado_viaje === 'Pendiente' ? 'Marcar como Finalizado' : 'Marcar como Pendiente'}
                    </button>
                    <br />
                    <button
                    type="button"
                    className="btn button__cancelar"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => handleEliminarClick(viaje.id_viaje)}>
                      Cancelar Viaje
                    </button>
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
                          <p className="modal__text">¿Estas seguro que quieres cancelar el viaje seleccionado?<br />
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
                            onClick={handleCancelarViaje}
                          >
                            Confirmar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  </td>
                  <td className="table__td" data-label="Precio">{calcularIva(viaje.precioTotal_viaje)}€</td>
                  <td className="table__td" data-label="Crear factura">
                    {viaje.estado_viaje === 'Finalizado' ? (
                      <PDFDownloadLink document={<Pdf viaje={viaje} />} fileName="factura.pdf">
                        {({ blob, url, loading, error }) =>
                          <button className="button__downloadPdf">Descargar Factura <i className="bi bi-download"></i></button>
                        }
                      </PDFDownloadLink>
                    ) : (
                      <p>Factura no disponible</p>
                    )}
                  </td>
                  <td className="table__td" data-label="Ver ruta">
                    <Link className="td__link" to={`/dashboard/clientes/viajes-detalles/ruta/${viaje.id_viaje}`}> 
                      <i className="fa-solid fa-car-side"></i>
                    </Link>
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
            <button className="button__siguiente" onClick={() => setCurrentPage(currentPage + 1)} disabled={indexOfLastViaje >= fetchedViajes.length}>
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

export default ClienteDetalle;
