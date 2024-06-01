/* eslint-disable no-unused-vars */
import React from "react";
import { useParams } from "react-router-dom";
import { useOneViajeDetalleCliente } from "../../../../hooks/useOneViajeDetalleCliente";
import "./detalle.css";
import { Link } from "react-router-dom";

function DetalleViaje() {
  const params = useParams();
  const id = params.id;
  const viaje = useOneViajeDetalleCliente(id);

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
    <section className="container">
      <div className="container__viaje--detalle">
        <h1 className="h1__titleViaje">Detalle Viaje</h1>
        <article className="article__viaje">
          <p className="text__detalleViaje">
            <strong className="strong__detalleViaje">Origen:</strong>{" "}
            {viaje.origen_viaje}
          </p>
          <p className="text__detalleViaje">
            <strong className="strong__detalleViaje">Destino:</strong>{" "}
            {viaje.destino_viaje}
          </p>
          <p className="text__detalleViaje">
            <strong className="strong__detalleViaje">Fecha:</strong>{" "}
            {formatearFecha(viaje.fecha_viaje)}
          </p>
          <p className="text__detalleViaje">
            <strong className="strong__detalleViaje">Hora:</strong>{" "}
            {viaje.hora_viaje}
          </p>
          <p className="text__detalleViaje">
            <strong className="strong__detalleViaje">Precio Total:</strong>{" "}
            {calcularIva(viaje.precioTotal_viaje)}€
          </p>
          <p className="text__detalleViaje">
            <strong className="strong__detalleViaje">Taxista:</strong>{" "}
            {viaje.taxistum?.usuario?.nombre}{" "}
            {viaje.taxistum?.usuario?.apellidos}
          </p>
          <p className="text__detalleViaje">
            <strong className="strong__detalleViaje">Vehículo:</strong>{" "}
            {viaje.taxistum?.vehiculo}
          </p>
          <p className="text__detalleViaje">
            <strong className="strong__detalleViaje">
              Número de Licencia:
            </strong>{" "}
            {viaje.taxistum?.num_licencia}
          </p>
        </article>
        <div className="container__buttonVolverDe">
          <Link to={"/cliente/mis-viajes"} className="link__volver">
            Volver
          </Link>
        </div>
      </div>
    </section>
  );
}

export default DetalleViaje;
