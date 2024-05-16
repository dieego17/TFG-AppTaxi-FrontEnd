/* eslint-disable no-unused-vars */
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useOneCliente } from "../../../../../hooks/useOneCliente";
import { useState } from "react";
import { PDFDownloadLink } from '@react-pdf/renderer'
import Pdf from "../../../../pdf/Pdf";

function ClienteDetalle() {
  const [idUsuario, setIdUsuario] = useState("3"); // idUsuario de prueba
  const params = useParams();
  const id = params.id;
  const clientes = useOneCliente(id, idUsuario);

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
          {clientes.map((cliente) =>
            cliente.reservas.map((reserva) => (
              <tr key={reserva.viaje.id_viaje}>
                <td>{reserva.viaje.destino_viaje}</td>
                <td>{reserva.viaje.origen_viaje}</td>
                <td>{formatTime(reserva.viaje.hora_viaje)}</td>
                <td>{formatDate(reserva.viaje.fecha_viaje)}</td>

                {reserva.viaje.estado_viaje === 1 ? (
                    <td className="estado__pendiente">Pendiente</td>
                    ) : (
                    <td className="estado__confirmado">Finalizado</td>
                    )}
                <td>{reserva.viaje.precioTotal_viaje}€</td>
                <td>
                <PDFDownloadLink document={<Pdf clientes={clientes} />} fileName="factura.pdf">
                  {({ blob, url, loading, error }) =>
                    loading ? 'Cargando documento...' : <button>Descargar Factura</button>
                  }
                </PDFDownloadLink>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <Link to={"/dashboard/clientes"}>Volver</Link>
    </div>
  );
}

export default ClienteDetalle;
