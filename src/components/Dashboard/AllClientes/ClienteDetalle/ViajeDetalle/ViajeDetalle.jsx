/* eslint-disable no-unused-vars */
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useOneViaje } from "../../../../../hooks/useOneViaje";
import { useState } from "react";
import { PDFDownloadLink } from '@react-pdf/renderer'
import Pdf from "../../../../pdf/Pdf";
import InsertarFactura from "./InsertarFactura";

function ClienteDetalle() {
  const [idUsuario, setIdUsuario] = useState("3"); // idUsuario de prueba
  const params = useParams();
  const id = params.id;
  const viajes = useOneViaje(id, idUsuario);

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
            <th>Destino Viaje</th>
            <th>Origen Viaje</th>
            <th>Hora Viaje</th>
            <th>Fecha Viaje</th>
            <th>Estado Viaje</th>
            <th>Precio Viaje</th>
            <th>Factura</th>
          </tr>
        </thead>
        <tbody>
          {
            viajes.map((viaje) => (
              <tr key={viaje.id_viaje}>
                <td>{viaje.destino_viaje}</td>
                <td>{viaje.origen_viaje}</td>
                <td>{formatTime(viaje.hora_viaje)}</td>
                <td>{formatDate(viaje.fecha_viaje)}</td>
                {viaje.estado_viaje === 1 ? (
                  <td className="estado__pendiente">Pendiente</td>
                ) : (
                  <td className="estado__confirmado">Finalizado</td>
                )}
                <td>{viaje.precioTotal_viaje}€</td>
                <td>
                  <PDFDownloadLink document={<Pdf viaje={viaje} />} fileName="factura.pdf">
                    {({ blob, url, loading, error }) =>
                      loading ? 'Cargando documento...' : <button>Descargar Factura</button>
                    }
                  </PDFDownloadLink>
                  <InsertarFactura />
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <Link to={"/dashboard/clientes"}>Volver</Link>
    </div>
  );
}

export default ClienteDetalle;
