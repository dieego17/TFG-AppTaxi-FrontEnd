/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useTaxistas } from "../../../hooks/useTaxistas";
import "./reservarViaje.css";

function ReservarViaje() {
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [distancia, setDistancia] = useState(null);
  const [metodoPago, setMetodoPago] = useState("");
  const [precioTotal, setPrecioTotal] = useState(0);
  const [error, setError] = useState(null);
  const [taxistaSeleccionado, setTaxistaSeleccionado] = useState("");
  const [isDistanceCalculated, setIsDistanceCalculated] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showTarjetaForm, setShowTarjetaForm] = useState(false); // Nuevo estado para mostrar el formulario de tarjeta

  // Coger el id del usuario del token
  const token = localStorage.getItem("token");
  const idUsuario = token ? JSON.parse(atob(token.split(".")[1])).id_usuario : "";

  const taxistas = useTaxistas();

  const handleBuscarDistancia = async () => {
    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API;

    // Validar origen y destino
    if (!origen || !destino) {
      setError("Por favor, completa los campos de origen y destino.");
      return;
    }

    // Validar fecha y hora
    if (!fecha || !hora) {
      setError("Por favor, selecciona una fecha y hora.");
      return;
    }

    // Validar taxista seleccionado
    if (!taxistaSeleccionado) {
      setError("Por favor, selecciona un taxista.");
      return;
    }

    if (!metodoPago) {
      setError("Por favor, selecciona un método de pago.");
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

    setPrecioTotal(precio);
  };

  const handleSubmit = (event) => {
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

    fetch(`http://localhost:3000/appTaxio/v1/viajes/${idUsuario}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosFormulario),
    })
      .then((response) => response.json())
      .then((data) => console.log("Respuesta del servidor:", data))
      .then(() => setSuccess(true))
      .catch((error) => console.error("Error al enviar los datos:", error));
  };

  const handleMetodoPagoChange = (e) => {
    const selectedMetodoPago = e.target.value;
    setMetodoPago(selectedMetodoPago);
    if (selectedMetodoPago === "Pagado con tarjeta") {
      setShowTarjetaForm(true);
    } else {
      setShowTarjetaForm(false);
    }
  };

  return (
    <div className="container__crear--reservas">
      <h2>Reservar un viaje</h2>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {success && (
        <div className="alert alert-success" role="alert">
          Viaje reservado correctamente
        </div>
      )}
      {isDistanceCalculated && (
        <div className="alert alert-info" role="alert">
          El precio del viaje sería: {precioTotal}€
        </div>
      )}
      <form className="d-flex flex-column" onSubmit={handleSubmit}>
        <label htmlFor="origen">Origen:</label>
        <input
          type="text"
          id="origen"
          name="origen"
          value={origen}
          onChange={(e) => setOrigen(e.target.value)}
        />
        <label htmlFor="destino">Destino:</label>
        <input
          type="text"
          id="destino"
          name="destino"
          value={destino}
          onChange={(e) => setDestino(e.target.value)}
        />
        <label htmlFor="fecha">Fecha:</label>
        <input
          type="date"
          id="fecha"
          name="fecha"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
        />

        <label htmlFor="hora">Hora:</label>
        <input
          type="time"
          id="hora"
          name="hora"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
        />
        <label htmlFor="metodoPago">Selecciona método de pago:</label>
        <select
          name="metodoPago"
          id="metodoPago"
          value={metodoPago}
          onChange={handleMetodoPagoChange}
        >
          <option value="">Selecciona un método de pago</option>
          <option value="Pago en efectivo">Efectivo</option>
          <option value="Pago con tarjeta">Tarjeta</option>
        </select>
        
        <label htmlFor="taxistas">Elige tu conductor</label>
        <select
          name="taxistas"
          id="taxistas"
          value={taxistaSeleccionado}
          onChange={(e) => setTaxistaSeleccionado(e.target.value)}
        >
          <option value="">Selecciona un taxista</option>
          {taxistas.map((taxista) => (
            <option key={taxista.id_usuario} value={taxista.id_usuario}>
              {taxista.nombre} {taxista.apellidos}
            </option>
          ))}
        </select>

        <button type="button" onClick={handleBuscarDistancia}>
          Calcular Precio
        </button>
        <button type="submit" disabled={!isDistanceCalculated}>
          Reservar
        </button>
      </form>
    </div>
  );
}

export default ReservarViaje;
