/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./crearFactura.css";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDF from "./PDF/PDF";

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

  const [formularioCompleto, setFormularioCompleto] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosFactura((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Verificar si todos los campos están completos
  const verificarFormularioCompleto = () => {
    const {
      nombreCliente,
      apellidosCliente,
      dniCliente,
      direccionCliente,
      telefonoCliente,
      precio,
      origenViaje,
      destinoViaje,
      fechaViaje,
    } = datosFactura;
    if (
      nombreCliente !== "" &&
      apellidosCliente !== "" &&
      dniCliente !== "" &&
      direccionCliente !== "" &&
      telefonoCliente !== "" &&
      precio !== "" &&
      origenViaje !== "" &&
      destinoViaje !== "" &&
      fechaViaje !== ""
    ) {
      setFormularioCompleto(true);
    } else {
      setFormularioCompleto(false);
    }
  };

  // Llamar a verificarFormularioCompleto cada vez que cambie algún campo
  useEffect(() => {
    verificarFormularioCompleto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datosFactura]);

  return (
    <div className="container__crearFactura">
      <h1 className="h1__crearFactura">Crear Factura</h1>
      <form className="form__factura">
        <div className="container__forms">
          <div className="container__inputs">
            <label className="label__crearFactur" htmlFor="nombreCliente">Nombre Cliente:</label>
            <input className="input__crearFactura"
              type="text"
              name="nombreCliente"
              id="nombreCliente"
              placeholder="Nombre Cliente"
              value={datosFactura.nombreCliente}
              onChange={handleChange}
            />
          </div>
          <div className="container__inputs">
            <label className="label__crearFactur" htmlFor="apellidosCliente">Apellidos Cliente:</label>
            <input className="input__crearFactura"
              type="text"
              name="apellidosCliente"
              id="apellidosCliente"
              placeholder="Apellidos Cliente"
              value={datosFactura.apellidosCliente}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="container__forms">
          <div className="container__inputs">
            <label className="label__crearFactur" htmlFor="dniCliente">DNI Cliente:</label>
            <input className="input__crearFactura"
              type="text"
              name="dniCliente"
              id="dniCliente"
              placeholder="DNI Cliente"
              value={datosFactura.dniCliente}
              onChange={handleChange}
            />
          </div>
          <div className="container__inputs">
            <label className="label__crearFactur" htmlFor="direccionCliente">Dirección Cliente:</label>
            <input className="input__crearFactura"
              type="text"
              name="direccionCliente"
              id="direccionCliente"
              placeholder="Dirección Cliente"
              value={datosFactura.direccionCliente}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="container__forms">
          <div className="container__inputs">
            <label className="label__crearFactur" htmlFor="telefonoCliente">Teléfono Cliente:</label>
            <input className="input__crearFactura"
              type="text"
              name="telefonoCliente"
              id="telefonoCliente"
              placeholder="Teléfono Cliente"
              value={datosFactura.telefonoCliente}
              onChange={handleChange}
            />
          </div>
          <div className="container__inputs">
            <label className="label__crearFactur" htmlFor="origenViaje">Origen del viaje</label>
            <input className="input__crearFactura"
              type="text"
              name="origenViaje"
              id="origenViaje"
              placeholder="Origen del viaje"
              value={datosFactura.origenViaje}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="container__forms">
          <div className="container__inputs">
            <label className="label__crearFactur" htmlFor="destinoViaje">Destino del viaje</label>
            <input className="input__crearFactura"
              type="text"
              name="destinoViaje"
              id="destinoViaje"
              placeholder="Destino del viaje"
              value={datosFactura.destinoViaje}
              onChange={handleChange}
            />
          </div>
          <div className="container__inputs">
            <label className="label__crearFactur" htmlFor="fechaViaje">Fecha del viaje</label>
            <input className="input__crearFactura"
              type="date"
              name="fechaViaje"
              id="fechaViaje"
              value={datosFactura.fechaViaje}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="container__inputs container__precio">
          <label className="label__crearFactur" htmlFor="precio">Precio:</label>
          <input className="input__crearFactura"
            type="number"
            name="precio"
            id="precio"
            placeholder="00.00€"
            value={datosFactura.precio}
            onChange={handleChange}
          />
        </div>
        {formularioCompleto ? (
          <PDFDownloadLink
            document={<PDF datosFactura={datosFactura} />}
            fileName="factura.pdf"
          >
            {({ blob, url, loading, error }) => (
              <button type="button" className="button__pdf button__pdf-wrapper">
                Descargar Factura <i className="bi bi-download"></i>
              </button>
            )}
          </PDFDownloadLink>
        ) : (
          <p>Por favor, complete todos los campos.</p>
        )}
      </form>
    </div>
  );
}

export default CrearFactura;
