/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./insertarGasto.css";
import { createGasto } from "../../../../../services/createGasto";

function InsertarGasto() {
  const [descripcionGastos, setDescripcionGastos] = useState("");
  const [importeGastos, setImporteGastos] = useState("");
  const [fechaGastos, setFechaGastos] = useState("");

  const [errorDescripcionGastos, setErrorDescripcionGastos] = useState("");
  const [errorImporteGastos, setErrorImporteGastos] = useState("");
  const [errorFechaGastos, setErrorFechaGastos] = useState("");

  const token = localStorage.getItem("token");
  const idTaxista = token
    ? JSON.parse(atob(token.split(".")[1])).id_usuario
    : "";

  const validateDescripcion = (descripcionGastos) => {
    if (descripcionGastos.length > 255) {
      setErrorDescripcionGastos(
        "La descripción no puede superar los 255 caracteres"
      );
      return false;
    } else if (descripcionGastos.length < 5) {
      setErrorDescripcionGastos(
        "La descripción debe tener al menos 5 caracteres"
      );
      return false;
    } else {
      setErrorDescripcionGastos("");
      return true;
    }
  };

  const validateImport = (importeGastos) => {
    if (importeGastos === "") {
      setErrorImporteGastos("El importe no puede estar vacío");
      return false;
    } else if (importeGastos <= 0) {
      setErrorImporteGastos("El importe no puede ser negativo");
      return false;
    } else {
      setErrorImporteGastos("");
      return true;
    }
  };

  const validateDate = (fechaGastos) => {
    if (fechaGastos === "") {
      setErrorFechaGastos("La fecha no puede estar vacía");
      return false;
    } else {
      setErrorFechaGastos("");
      return true;
    }
  };

  const handleChangeDescripcionGastos = (e) => {
    setDescripcionGastos(e.target.value);
    validateDescripcion(e.target.value);
  };

  const handleChangeImporteGastos = (e) => {
    setImporteGastos(e.target.value);
    validateImport(e.target.value);
  };

  const handleChangeFechaGastos = (e) => {
    setFechaGastos(e.target.value);
    validateDate(e.target.value);
  };

  // Estado para mostrar la Alerta de éxito
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);

  const handleSubmitGastos = (e) => {
    e.preventDefault();

    if (
      !validateDescripcion(descripcionGastos) ||
      !validateImport(importeGastos) ||
      !validateDate(fechaGastos)
    ) {
      return;
    }

    // Si todos los campos están completos, enviar los datos
    const data = {
      descripcion_gasto: descripcionGastos,
      gasto_total: importeGastos,
      id_taxista: idTaxista,
      fecha_gasto: fechaGastos,
    };

    // Llamar a la función para insertar un nuevo gasto
    createGasto(idTaxista, data);
    // Mostrar la alerta de éxito
    setShowAlertSuccess(true);
    //limpiar los campos
    setDescripcionGastos("");
    setImporteGastos("");
    setFechaGastos("");
  };

  return (
    <div className="container">
      <div className="section__insertGasto">
        <h2 className="h2__insertarGrafica">Insertar Nuevo Gasto</h2>
        {
          // Mostrar alerta de éxito
          showAlertSuccess && (
            <div className="container__body">
              <div className="notificacion__container">
                <div className="notificacion__body">
                  <i className="notificacion__icon fa-regular fa-circle-check"></i>
                  <p className="texto__success--grande">
                    Gasto insertado correctamente.
                  </p>
                </div>
                <div className="notifiacion__progress"></div>
              </div>
            </div>
          )
        }

        <form className="formulario__gastos">
          <div className="form-group">
            <label className="label__gastos" htmlFor="descripcionGastos">
              Descripción:
            </label>
            <textarea
              className="input__gastos"
              id="descripcionGastos"
              value={descripcionGastos}
              placeholder="Descripción del gasto"
              onChange={handleChangeDescripcionGastos}
            ></textarea>
            {errorDescripcionGastos && (
              <p className="error">{errorDescripcionGastos}</p>
            )}
          </div>
          <div className="form-group">
            <label className="label__gastos" htmlFor="fechaGastos">
              Fecha:
            </label>
            <input
              className="input__gastos"
              id="fechaGastos"
              value={fechaGastos}
              type="date"
              onChange={handleChangeFechaGastos}
            />
            {errorFechaGastos && <p className="error">{errorFechaGastos}</p>}
          </div>
          <div className="form-group">
            <label className="label__gastos" htmlFor="importeGastos">
              Importe total:
            </label>
            <input
              className="input__gastos"
              id="importeGastos"
              type="number"
              placeholder="Importe total del gasto"
              value={importeGastos}
              onChange={handleChangeImporteGastos}
            />
            {errorImporteGastos && (
              <p className="error">{errorImporteGastos}</p>
            )}
          </div>
          <button
            onClick={handleSubmitGastos}
            type="submit"
            className="button__insertarGasto"
          >
            Insertar Gasto
          </button>
        </form>
      </div>
      <div className="button__volverGasto">
        <Link
          className="button__volver"
          to={"/dashboard/resumen-financiero/todos-gastos"}
        >
          Volver
        </Link>
      </div>
    </div>
  );
}

export default InsertarGasto;
