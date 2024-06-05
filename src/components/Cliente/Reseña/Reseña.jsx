/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./reseña.css";
import { createTestimonio } from "../../../services/createTestimonio";

function Reseña() {
  // Estados para los campos y los mensajes de error
  const [puntuacion, setPuntuacion] = useState(0);
  const [mensaje, setMensaje] = useState("");
  const [errorMensaje, setErrorMensaje] = useState("");
  const [errorPuntuacion, setErrorPuntuacion] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);

  // ID del usuario
  const token = localStorage.getItem("token");
  const idUsuario = token ? JSON.parse(atob(token.split(".")[1])).id_usuario : "";

  // Función para manejar el cambio en el campo de reseña
  const handleChange = (e) => {
    setMensaje(e.target.value);
    validarMensaje(e.target.value); 
  };

  // Función para manejar el click en las estrellas
  const handleClick = (valor) => {
    setPuntuacion(valor);
    validarPuntuacion(valor); 
  };

  // Función para validar el campo de reseña
  const validarMensaje = (value) => {
    if (value.trim() === "") {
      setErrorMensaje("Por favor, escribe tu reseña");
      return false;
    } else if (value.length < 10) {
      setErrorMensaje("La reseña debe tener al menos 10 caracteres");
      return false;
    } else {
      setErrorMensaje("");
      return true;
    }
  };

  // Función para validar el campo de puntuación
  const validarPuntuacion = (valor) => {
    if (valor === 0) {
      setErrorPuntuacion("Por favor, selecciona una puntuación");
      return false;
    } else {
      setErrorPuntuacion("");
      return true;
    }
  };

  // Función para enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isMensajeValid = validarMensaje(mensaje);
    const isPuntuacionValid = validarPuntuacion(puntuacion);

    if (!isMensajeValid || !isPuntuacionValid) {
      return;
    }

    await createTestimonio(idUsuario, mensaje, puntuacion);
    setSuccessAlert(true);
    setMensaje("");
    setPuntuacion(0);
  };

  return (
    <div className="container__reseña">
      {
        successAlert && (
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
      <h1 className="h1__reseña">Valoranos <i className="fa-regular fa-thumbs-up"></i></h1>
      <form onSubmit={handleSubmit} action="" className="form__reseña">
        <div className="container__reseñaInputs">
          <label className="label__reseña" htmlFor="puntuacion">Puntuación</label>
          <div className="stars">
            {[...Array(5)].map((star, i) => {
              const valor = i + 1;
              return (
                <span key={i} onClick={() => handleClick(valor)}>
                  <i
                    className={`fa-solid fa-star ${
                      valor <= puntuacion ? "selected" : ""
                    }`}
                  ></i>
                </span>
              );
            })}
          </div>
          {errorPuntuacion && <p className="error">{errorPuntuacion}</p>}
        </div>
        <div className="container__reseñaInputs">
          <label className="label__reseña" htmlFor="reseña">Escribe tu reseña</label>
          <textarea
            placeholder="Escribe tu reseña aquí..."
            className="textarea__reseña"
            onChange={handleChange}
            value={mensaje}
            name="reseña"
            id="reseña"
            cols="30"
            rows="10"
          ></textarea>
          {errorMensaje && <p className="error">{errorMensaje}</p>}
        </div>
        <div className="container__reseñaInputs">
          <button className="button__reseña">Publicar</button>
        </div>
      </form>
    </div>
  );
}

export default Reseña;
