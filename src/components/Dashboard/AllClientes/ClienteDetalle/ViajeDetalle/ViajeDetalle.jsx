/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useOneViaje } from "../../../../../hooks/useOneViaje";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { updateEstadoViaje } from "../../../../../services/updateEstadoViaje";
import Pdf from "../../../../pdf/Pdf";
import "./viaje.css";

function ClienteDetalle() {
  const [idUsuario, setIdUsuario] = useState("3"); // idUsuario de prueba
  const params = useParams();
  const id = params.id;
  // Estado local para almacenar los datos del viaje
  const [viajes, setViajes] = useState([]);

  // Obtener los datos del viaje
  const fetchedViajes = useOneViaje(id, idUsuario);

  // Actualizar el estado localmente
  useEffect(() => {
    setViajes(fetchedViajes);
  }, [fetchedViajes]);

  // Función para formatear la fecha
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  // Función para formatear la hora
  const formatTime = (time) => {
    const [hour, minute] = time.split(":");
    return `${hour}:${minute}`;
  };

  // Función para cambiar el estado del viaje
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

  return (
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
          </tr>
        </thead>
        <tbody>
          {viajes.map((viaje) => (
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
                      loading ? 'Cargando documento...' : <button className="button__pdf">Descargar Factura <i className="bi bi-download"></i></button>
                    }
                  </PDFDownloadLink>
                ) : (
                  <p>Factura no disponible</p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link className="button__volver" to={"/dashboard/clientes"}>Volver</Link>
    </div>
  );
}

export default ClienteDetalle;
