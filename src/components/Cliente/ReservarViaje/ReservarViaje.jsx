/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
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
  const [taxistaSeleccionado, setTaxistaSeleccionado] = useState("");
  const [errorTaxista, setErrorTaxista] = useState("");
  const [isDistanceCalculated, setIsDistanceCalculated] = useState(false);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  // Nuevo estado para actualizar el mapa
  const [mapKey, setMapKey] = useState(0);

  // Nuevo estado para controlar la visualización del mapa
  const [mostrarMapa, setMostrarMapa] = useState(false);

  // Coger el id del usuario del token
  const token = localStorage.getItem("token");
  const idUsuario = token
    ? JSON.parse(atob(token.split(".")[1])).id_usuario
    : "";

  const taxistas = useTaxistas();

  const validateOrigen = (origen) => {

    const primeraLetraOrigen = origen.charAt(0).toUpperCase();
    const primeraLetraDestino = destino.charAt(0).toUpperCase();

    if (!origen) {
      setErrorOrigen("Introduce una direccion de origen.");
      return false;
    } else if (primeraLetraOrigen === primeraLetraDestino) {
      setErrorOrigen("El origen y el destino no pueden ser iguales.");
      return false;
    } else if (origen != destino) {
      setErrorOrigen("");
      return true;
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
  
    const API_KEY = import.meta.env.VITE_OPENROUTESERVICE_APIKEY;
  
    const geocodeAddress = async (address) => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
        );
        const data = await response.json();
        if (data && data.length > 0) {
          return {
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon),
          };
        } else {
          console.warn("No se encontró la dirección:", address);
          return null;
        }
      } catch (error) {
        console.error("Error en la geocodificación:", error);
        return null;
      }
    };
  
    try {
      const origenCoords = await geocodeAddress(`${origen}, España`);
      const destinoCoords = await geocodeAddress(`${destino}, España`);
  
      if (origenCoords && destinoCoords) {
        const response = await fetch(
          "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: API_KEY,
            },
            body: JSON.stringify({
              coordinates: [
                [origenCoords.lng, origenCoords.lat],
                [destinoCoords.lng, destinoCoords.lat],
              ],
            }),
          }
        );
  
        const data = await response.json();
        if (data && data.features && data.features.length > 0) {
          const distanciaKm =
            data.features[0].properties.summary.distance / 1000;
          setDistancia(distanciaKm);
          setError(false);
          calcularPrecioTotal(distanciaKm);
          setIsDistanceCalculated(true);
          setMostrarMapa(true);
          setMapKey((prevKey) => prevKey + 1);
        } else {
          setError(
            "Hubo un problema al calcular la distancia. Por favor, intenta de nuevo."
          );
        }
      } else {
        setError("No se pudieron geocodificar las direcciones.");
      }
    } catch (error) {
      console.error("Error al calcular la distancia:", error);
      setError("Hubo un problema al calcular la distancia. Por favor, intenta de nuevo.");
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
    console.log(precioConIva);

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

    const res = await reservaViaje(datosFormulario, idUsuario);

    if (res.status === 201) {
      setSuccess(true);
      setError(false);
    } else {
      setError("El taxista ya tiene un viaje en la misma fecha y hora");
      setSuccess(false);
    }
  };

  return (
    <div className="container__crear--reservas container">
      <h2 className="h2__reservasViaje">Reservar un viaje</h2>
      <div className="container__contenido container">
        <form className="container__form" onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-danger" role="alert">
              <i className="fa-solid fa-xmark"></i>
              {error}
            </div>
          )}
          {success && (
            <div className="container__body">
              <div className="notificacion__container">
                <div className="notificacion__body">
                  <i className="notificacion__icon fa-regular fa-circle-check"></i>
                  <p className="texto__success--grande">
                    Viaje reservado correctamente.
                  </p>
                </div>
                <div className="notifiacion__progress"></div>
              </div>
            </div>
          )}
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
              <strong className="strong__pecio">
                El precio del viaje sería:
              </strong>{" "}
              {precioTotal}€
            </p>
          )}
          {mostrarMapa ? (
            <div className="container__mapaMaps">
              <MapaCliente key={mapKey} origen={origen} destino={destino} />
            </div>
          ) : (
            <div className="container__mapaVacio">
              <iframe
                className="iframe__mapa"
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2998348.288015742!2d-4.834991499999999!3d39.5050541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2ses!4v1717325567651!5m2!1ses!2ses"
                width="600"
                height="450"
                style={{ border: "0" }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReservarViaje;
