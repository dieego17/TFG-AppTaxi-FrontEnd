/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useTaxistas } from "../../../hooks/useTaxistas";
import "./reservarViaje.css";
import { reservaViaje } from "../../../services/reservaViaje";
import MapaCliente from "./MapaCliente/MapaCliente";

function ReservarViaje() {
  const [origen, setOrigen] = useState("");
  const [errorOrigen, setErrorOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [errorDestino, setErrorDestino] = useState("");
  const [fecha, setFecha] = useState("");
  const [errorFecha, setErrorFecha] = useState("");
  const [hora, setHora] = useState("");
  const [errorHora, setErrorHora] = useState("");
  const [distancia, setDistancia] = useState(null);
  const [metodoPago, setMetodoPago] = useState("");
  const [errorMetodoPago, setErrorMetodoPago] = useState("");
  const [precioTotal, setPrecioTotal] = useState(0);
  const [error, setError] = useState(null);
  const [taxistaSeleccionado, setTaxistaSeleccionado] = useState("");
  const [errorTaxista, setErrorTaxista] = useState("");
  const [isDistanceCalculated, setIsDistanceCalculated] = useState(false);
  const [success, setSuccess] = useState(false);

  // Nuevo estado para controlar la visualización del mapa
  const [mostrarMapa, setMostrarMapa] = useState(false);

  // Coger el id del usuario del token
  const token = localStorage.getItem("token");
  const idUsuario = token
    ? JSON.parse(atob(token.split(".")[1])).id_usuario
    : "";

  const taxistas = useTaxistas();

  const validateOrigen = (origen) => {
    if (!origen) {
      setErrorOrigen("Introduce una direccion de origen.");
      return false;
    } else {
      setErrorOrigen("");
      return true;
    }
  };

  const validateDestino = (destino) => {
    if (!destino) {
      setErrorDestino("Introduce una direccion de destino.");
      return false;
    } else {
      setErrorDestino("");
      return true;
    }
  };

  const validateFecha = (fecha) => {
    if (!fecha) {
      setErrorFecha("Por favor, selecciona una fecha.");
      return false;
    } else {
      setErrorFecha("");
      return true;
    }
  };

  const validateHora = (hora) => {
    if (!hora) {
      setErrorHora("Por favor, selecciona una hora.");

      return false;
    } else {
      setErrorHora("");
      return true;
    }
  };

  const validateTaxista = (taxistaSeleccionado) => {
    if (!taxistaSeleccionado) {
      setErrorTaxista("Por favor, selecciona un taxista.");
      return false;
    } else {
      setErrorTaxista("");
      return true;
    }
  };

  const validateMetodoPago = (metodoPago) => {
    if (!metodoPago) {
      setErrorMetodoPago("Por favor, selecciona un pago.");
      return false;
    } else {
      setErrorMetodoPago("");
      return true;
    }
  };

  const handleOrigenChange = (e) => {
    const origen = e.target.value;
    setOrigen(origen);
    validateOrigen(origen);
  };

  const handleDestinoChange = (e) => {
    const destino = e.target.value;
    setDestino(destino);
    validateDestino(destino);
  };

  const handleFechaChange = (e) => {
    const fecha = e.target.value;
    setFecha(fecha);
    validateFecha(fecha);
  };

  const handleHoraChange = (e) => {
    const hora = e.target.value;
    setHora(hora);
    validateHora(hora);
  };

  const handleTaxistaChange = (e) => {
    const taxistaSeleccionado = e.target.value;
    setTaxistaSeleccionado(taxistaSeleccionado);
    validateTaxista(taxistaSeleccionado);
  };

  const handlePagoChange = (e) => {
    const metodoPago = e.target.value;
    setMetodoPago(metodoPago);
    validateMetodoPago(metodoPago);
  };

  const handleBuscarDistancia = async () => {
    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API;

    if (
      !validateOrigen(origen) ||
      !validateDestino(destino) ||
      !validateFecha(fecha) ||
      !validateHora(hora) ||
      !validateTaxista(taxistaSeleccionado) ||
      !validateMetodoPago(metodoPago)
    ) {
      return;
    }

    try {
      const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origen}&destinations=${destino}&key=${API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "OK") {
        const distanciaEnMetros = data.rows[0].elements[0].distance.value;
        const distanciaEnKilometros = distanciaEnMetros / 1000;
        setDistancia(distanciaEnKilometros);
        setError(null);
        calcularPrecioTotal(distanciaEnKilometros);
        setIsDistanceCalculated(true);
        // Después de calcular la distancia, mostrar el mapa
        setMostrarMapa(true);
      } else {
        setError(
          "Hubo un problema al buscar la distancia. Por favor, intenta de nuevo."
        );
      }
    } catch (error) {
      setError(
        "Hubo un problema al buscar la distancia. Por favor, intenta de nuevo."
      );
    }
  };

  const calcularPrecioTotal = (distancia) => {
    const precioPorKilometro = 1;
    let precio;

    if (distancia < 5) {
      precio = 4 + (distancia + 1) * precioPorKilometro;
    } else {
      precio = distancia * precioPorKilometro;
    }

    // Redondeo el precio a dos decimales
    precio = parseFloat(precio.toFixed(2));

    const calcularIva = (precio) => {
      const resta = (precio * 0.1).toFixed(1);
      return parseFloat(resta) + precio;
    };

    // Añadir IVA
    const precioConIva = calcularIva(precio);

    setPrecioTotal(precioConIva);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const datosFormulario = {
      id_taxista: taxistaSeleccionado,
      origen_viaje: origen,
      destino_viaje: destino,
      fecha_viaje: fecha,
      hora_viaje: hora,
      precioTotal_viaje: precioTotal,
      metodo_pago: metodoPago,
    };

    await reservaViaje(datosFormulario, idUsuario);
  };

  return (
    <div className="container__crear--reservas container">
      <h2 className="h2__reservasViaje">Reservar un viaje</h2>
      <div className="container__contenido container">
      <form className="container__form" onSubmit={handleSubmit}>
          {error && (
            <div
              className="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              {error}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          )}
          {
            // Mostrar alerta de éxito
            success && (
              <div className="container__body">
                <div className="notificacion__container">
                  <div className="notificacion__body">
                    <i className="notificacion__icon fa-regular fa-circle-check"></i>
                    <p className="texto__success--grande">
                      Viaje resergado correctamente.
                    </p>
                  </div>
                  <div className="notifiacion__progress"></div>
                </div>
              </div>
            )
          }
          <div className="container__input">
            <div className="d-flex justify-content-between ">
              <label className="label__reservar" htmlFor="origen">
                Origen
              </label>
              {errorOrigen && <p className="error__input">{errorOrigen}</p>}
            </div>
            <input
              className="input__reservas"
              type="text"
              id="origen"
              name="origen"
              placeholder="Calle Ejemplo, 123, 45678, Ciudad, País"
              value={origen}
              onChange={handleOrigenChange}
            />
          </div>
          <div className="container__input">
            <div className="d-flex justify-content-between">
              <label className="label__reservar" htmlFor="destino">
                Destino
              </label>
              {errorDestino && <p className="error__input">{errorDestino}</p>}
            </div>
            <input
              className="input__reservas"
              type="text"
              id="destino"
              placeholder="Calle Ejemplo, 123, 45678, Ciudad, País"
              name="destino"
              value={destino}
              onChange={handleDestinoChange}
            />
          </div>
          <div className="contaainer__inputs">
            <div className="container__input">
              <div className="d-flex justify-content-between">
                <label className="label__reservar" htmlFor="fecha">
                  Fecha
                </label>
                {errorFecha && <p className="error__input">{errorFecha}</p>}
              </div>
              <input
                className="input__reservas"
                type="date"
                id="fecha"
                name="fecha"
                value={fecha}
                onChange={handleFechaChange}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className="container__input">
              <div className="d-flex justify-content-between">
                <label htmlFor="hora" className="label__reservar">
                  Hora
                </label>
                {errorHora && <p className="error__input">{errorHora}</p>}
              </div>
              <input
                className="input__reservas"
                type="time"
                id="hora"
                name="hora"
                value={hora}
                onChange={handleHoraChange}
              />
            </div>
          </div>
          <div className="contaainer__inputs">
            <div className="container__input">
              <label className="label__reservar" htmlFor="metodoPago">
                Selecciona método de pago
              </label>
              <select
                className="input__reservas"
                name="metodoPago"
                id="metodoPago"
                value={metodoPago}
                onChange={handlePagoChange}
              >
                <option value="">Selecciona un pago</option>
                <option value="Pago en efectivo">Efectivo</option>
                <option value="Pago con tarjeta">Tarjeta</option>
              </select>
              {errorMetodoPago && (
                <p className="error__input">{errorMetodoPago}</p>
              )}
            </div>
            <div className="container__input">
              <label className="label__reservar" htmlFor="taxistas">
                Elige tu conductor
              </label>
              <select
                className="input__reservas"
                name="taxistas"
                id="taxistas"
                value={taxistaSeleccionado}
                onChange={handleTaxistaChange}
              >
                <option value="">Selecciona un taxista</option>
                {taxistas.map((taxista) => (
                  <option key={taxista.id_usuario} value={taxista.id_usuario}>
                    {taxista.nombre} {taxista.apellidos}
                  </option>
                ))}
              </select>
              {errorTaxista && <p className="error__input">{errorTaxista}</p>}
            </div>
          </div>
        <div className="container__inputsButton">
          <div className="container__button">
            <button
              className="button__precio"
              type="button"
              onClick={handleBuscarDistancia}
            >
              Calcular Precio
            </button>
            <button
              className="button__reservas"
              type="submit"
              disabled={!isDistanceCalculated}
            >
              Reservar
            </button>
          </div>
        </div>
      </form>
      <div className="container__mapa">
        {isDistanceCalculated && (
          <p className="text__precio">
            <strong className="strong__pecio">El precio del viaje sería:</strong>{" "}
            {precioTotal}€
          </p>
        )}
        {mostrarMapa ? (
          <div style={{ marginTop: "20px" }}>
            <MapaCliente origen={origen} destino={destino} />
          </div>
        ) :
          (
            <div className="container__mapaVacio">
                <iframe className="iframe__mapa" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2998348.288015742!2d-4.834991499999999!3d39.5050541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2ses!4v1717325567651!5m2!1ses!2ses" width="600" height="450" style={{ border: "0" }} allowfullscreen="" loading="lazy"></iframe>
            </div>
          )
        }
      </div>
      </div>
    </div>
  );
}

export default ReservarViaje;
