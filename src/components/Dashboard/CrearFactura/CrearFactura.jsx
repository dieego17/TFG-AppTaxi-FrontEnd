/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./crearFactura.css";
import { PDFDownloadLink } from "@react-pdf/renderer";
import FacturaCreada from "./PDF/FacturaCreada";

function CrearFactura() {
  const [datosFactura, setDatosFactura] = useState({
    nombreCliente: "",
    apellidosCliente: "",
    dniCliente: "",
    direccionCliente: "",
    telefonoCliente: "",
    precio: "",
    origenViaje: "",
    destinoViaje: "",
    fechaViaje: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosFactura((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Crear Factura</h1>
      <form className="form__factura">
        <label htmlFor="nombreCliente">Nombre Cliente:</label>
        <input
          type="text"
          name="nombreCliente"
          id="nombreCliente"
          value={datosFactura.nombreCliente}
          onChange={handleChange}
        />
        <label htmlFor="apellidosCliente">Apellidos Cliente:</label>
        <input
          type="text"
          name="apellidosCliente"
          id="apellidosCliente"
          value={datosFactura.apellidosCliente}
          onChange={handleChange}
        />
        <label htmlFor="dniCliente">DNI Cliente:</label>
        <input
          type="text"
          name="dniCliente"
          id="dniCliente"
          value={datosFactura.dniCliente}
          onChange={handleChange}
        />
        <label htmlFor="direccionCliente">Dirección Cliente:</label>
        <input
          type="text"
          name="direccionCliente"
          id="direccionCliente"
          value={datosFactura.direccionCliente}
          onChange={handleChange}
        />
        <label htmlFor="telefonoCliente">Teléfono Cliente:</label>
        <input
          type="text"
          name="telefonoCliente"
          id="telefonoCliente"
          value={datosFactura.telefonoCliente}
          onChange={handleChange}
        />

        <label htmlFor="origenViaje">Introduce el origen del viaje</label>
        <input
          type="text"
          name="origenViaje"
          id="origenViaje"
          value={datosFactura.origenViaje}
          onChange={handleChange}
        />
        <label htmlFor="destinoViaje">Introduce el destino del viaje</label>
        <input
          type="text"
          name="destinoViaje"
          id="destinoViaje"
          value={datosFactura.destinoViaje}
          onChange={handleChange}
        />
        <label htmlFor="fechaViaje">Introduce la fecha del viaje</label>
        <input
          type="date"
          name="fechaViaje"
          id="fechaViaje"
          value={datosFactura.fechaViaje}
          onChange={handleChange}
        />

        <label htmlFor="precio">Precio:</label>
        <input
          type="text"
          name="precio"
          id="precio"
          value={datosFactura.precio}
          onChange={handleChange}
        />

        <PDFDownloadLink
          document={<FacturaCreada datosFactura={datosFactura} />}
          fileName="factura.pdf"
        >
          {({ blob, url, loading, error }) => (
            <button className="button__pdf" >
              Descargar Factura <i className="bi bi-download"></i>
            </button>
          )}
        </PDFDownloadLink>
      </form>
    </div>
  );
}

export default CrearFactura;
