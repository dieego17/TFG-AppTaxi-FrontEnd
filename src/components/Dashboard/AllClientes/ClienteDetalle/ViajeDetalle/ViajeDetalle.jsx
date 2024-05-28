/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useOneViaje } from "../../../../../hooks/useOneViaje";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { updateEstadoViaje } from "../../../../../services/updateEstadoViaje";
import Pdf from "../../../../pdf/Pdf";
import "./viaje.css";

function ClienteDetalle() {

  /* Solo aparecen los viajes del cliente que haya confirmado la reserva */
  // Obtener el id del usuario
  const token = localStorage.getItem("token");
  const idUsuario = token ? JSON.parse(atob(token.split(".")[1])).id_usuario : "";

  // Obtener el id del viaje de la ruta
  const params = useParams();
  const id = params.id;

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

  // Obtener los datos del viaje
  const fetchedViajes = useOneViaje(id, idUsuario);

  // Obtener los viajes a mostrar en la página actual
  const currentViajes = viajes.slice(indexOfFirstViaje, indexOfLastViaje);

  // Actualizar el estado localmente
  useEffect(() => {
    setViajes(fetchedViajes);
  }, [fetchedViajes]);

  return (
    <div>
      {currentViajes.length === 0 ? (
        <p>No existen viajes para este cliente</p>
      ) : (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>Origen Viaje</th>
                <th>Destino Viaje</th>
                <th>Hora Viaje</th>
                <th>Fecha Viaje</th>
                <th>Estado Viaje</th>
                <th>Precio Viaje</th>
                <th>Factura</th>
                <th>Visualizar Ruta</th>
              </tr>
            </thead>
            <tbody>
              {currentViajes.map((viaje) => (
                <tr key={viaje.id_viaje}>
                  <td>{viaje.origen_viaje}</td>
                  <td>{viaje.destino_viaje}</td>
                  <td>{formatTime(viaje.hora_viaje)}</td>
                  <td>{formatDate(viaje.fecha_viaje)}</td>
                  <td>
                    <p className={viaje.estado_viaje === 'Pendiente' ? "estado__pendiente" : "estado__confirmado"}>{viaje.estado_viaje}</p>
                    <button className="button__estado" onClick={() => handleChangeEstadoViaje(viaje.id_viaje, viaje.estado_viaje === 'Pendiente' ? 'Finalizado' : 'Pendiente')}>
                      {viaje.estado_viaje === 'Pendiente' ? 'Marcar como Finalizado' : 'Marcar como Pendiente'}
                    </button>
                  </td>
                  <td>{viaje.precioTotal_viaje}€</td>
                  <td>
                    {viaje.estado_viaje === 'Finalizado' ? (
                      <PDFDownloadLink document={<Pdf viaje={viaje} />} fileName="factura.pdf">
                        {({ blob, url, loading, error }) =>
                          <button className="button__pdf">Descargar Factura <i className="bi bi-download"></i></button>
                        }
                      </PDFDownloadLink>
                    ) : (
                      <p>Factura no disponible</p>
                    )}
                  </td>
                  <td>
                    <Link to={`/dashboard/clientes/viajes-detalles/ruta/${viaje.id_viaje}`}> 
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
      <Link className="button__volver" to={"/dashboard/clientes"}>
        Volver
      </Link>
    </div>
  );
}

export default ClienteDetalle;
