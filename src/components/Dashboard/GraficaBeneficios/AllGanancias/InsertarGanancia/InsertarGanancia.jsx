/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createGanancia } from "../../../../../services/createGanancia";
import "./insertarGanancia.css";

function InsertarGanancias() {
  const [descripcionGanancias, setDescripcionGanancias] = useState("");
  const [importeGanancias, setImporteGanancias] = useState("");
  const [fechaGanancia, setFechaGanancia] = useState("");

  // ID del usuario logueado
  const token = localStorage.getItem("token");
  const idTaxista = token
    ? JSON.parse(atob(token.split(".")[1])).id_usuario
    : "";

  const [errorDescripcionGanancias, setErrorDescripcionGanancias] =
    useState("");
  const [errorImporteGanancias, setErrorImporteGanancias] = useState("");
  const [errorFechaGanancias, setErrorFechaGanancias] = useState("");

  // Estado para mostrar la Alerta de éxito
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);

  const validateDescripcion = (descripcionGastos) => {
    if (descripcionGastos.length > 255) {
      setErrorDescripcionGanancias(
        "La descripción no puede superar los 255 caracteres"
      );
      return false;
    } else if (descripcionGastos.length < 5) {
      setErrorDescripcionGanancias(
        "La descripción debe tener al menos 5 caracteres"
      );
      return false;
    } else {
      setErrorDescripcionGanancias("");
      return true;
    }
  };

  const validateImport = (importeGastos) => {
    if (importeGastos === "") {
      setErrorImporteGanancias("El importe no puede estar vacío");
      return false;
    } else if (importeGastos <= 0) {
      setErrorImporteGanancias("El importe no puede ser negativo");
      return false;
    } else {
      setErrorImporteGanancias("");
      return true;
    }
  };

  const validateDate = (fechaGastos) => {
    if (fechaGastos === "") {
      setErrorFechaGanancias("La fecha no puede estar vacía");
      return false;
    } else {
      setErrorFechaGanancias("");
      return true;
    }
  };

  const handleChangeDescripcionGanancia = (e) => {
    setDescripcionGanancias(e.target.value);
    validateDescripcion(e.target.value);
  };

  const handleChangeImporteGanancia = (e) => {
    setImporteGanancias(e.target.value);
    validateImport(e.target.value);
  };

  const handleChangeFechaGanancia = (e) => {
    setFechaGanancia(e.target.value);
    validateDate(e.target.value);
  };

  const handleSubmitGanancias = (e) => {
    e.preventDefault();

    // Verificar si algún campo está vacío
    if (
      !validateDescripcion(descripcionGanancias) ||
      !validateImport(importeGanancias) ||
      !validateDate(fechaGanancia)
    ) {
      return;
    }

    // Si todos los campos están completos, enviar los datos
    const data = {
      descripcion_ganancia: descripcionGanancias,
      ganancia_total: importeGanancias,
      id_taxista: idTaxista,
      fecha_ganancia: fechaGanancia,
    };

    // Llamar a la función para insertar una nueva ganancia
    createGanancia(idTaxista, data);

    // Mostrar alerta de éxito
    setShowAlertSuccess(true);
  };

  return (
    <div className="container">
      <div className="section__insertGanancia">
        <h2 className="ganancia__title">Añadir Ganancias</h2>
        {
          // Mostrar alerta de éxito
          showAlertSuccess && (
            <div
              className="alert alert-warning alerta__success--ganancia fade show"
              role="alert"
            >
              <strong className="texto__success--grandeGanancia">
                Ganancia insertada correctamente.
              </strong>
              <button
                type="button"
                className="btn__close--ganancia"
                data-bs-dismiss="alert"
                aria-label="Close"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
          )
        }
        <form className="formulario__ganancias">
          <div className="form-group">
            <label className="label__ganancia" htmlFor="descripcionGanancias">Descripción:</label>
            <textarea
              className="input__ganancia"
              id="descripcionGanancias"
              value={descripcionGanancias}
              onChange={handleChangeDescripcionGanancia}
            ></textarea>
            {errorDescripcionGanancias && (
                <p className="error">{errorDescripcionGanancias}</p>
                )}
          </div>
          <div className="form-group">
            <label className="label__ganancia" htmlFor="fechaGastos">Fecha:</label>
            <input
              className="input__ganancia"
              id="fechaGastos"
              value={fechaGanancia}
              type="date"
              onChange={handleChangeFechaGanancia}
            />
            {errorFechaGanancias && (
                <p className="error">{errorFechaGanancias}</p>
                )}
          </div>
          <div className="form-group">
            <label className="label__ganancia" htmlFor="importeGanancias">Importe total:</label>
            <input
              className="input__ganancia"
              id="importeGanancias"
              type="number"
              value={importeGanancias}
              onChange={handleChangeImporteGanancia}
            />
            {errorImporteGanancias && (
                <p className="error">{errorImporteGanancias}</p>
                )}
          </div>
          <button onClick={handleSubmitGanancias} type="submit" className="button__insertarGanancia">
            Insertar Ganancia
          </button>
        </form>
      </div>
      <div className="button__volverGanancia">
        <Link
          className="button__volver"
          to={"/dashboard/resumen-financiero/todas-ganancias"}
        >
          Volver
        </Link>
      </div>
    </div>
  );
}

export default InsertarGanancias;
