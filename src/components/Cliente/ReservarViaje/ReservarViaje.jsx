/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useTaxistas } from '../../../hooks/useTaxistas';

function ReservarViaje() {
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [distancia, setDistancia] = useState(null);
  const [precioTotal, setPrecioTotal] = useState(0);
  const [error, setError] = useState(null);
  const [taxistaSeleccionado, setTaxistaSeleccionado] = useState('');
  const [recibirFactura, setRecibirFactura] = useState('No');
  const [idUsuario, setIdUsuario] = useState(1);
  const [isDistanceCalculated, setIsDistanceCalculated] = useState(false);

  const taxistas = useTaxistas();

  const handleBuscarDistancia = async () => {
    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API;

    try {
      const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origen}&destinations=${destino}&key=${API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.status === 'OK') {
        const distanciaEnMetros = data.rows[0].elements[0].distance.value;
        const distanciaEnKilometros = distanciaEnMetros / 1000;
        setDistancia(distanciaEnKilometros);
        setError(null);
        calcularPrecioTotal(distanciaEnKilometros);
        setIsDistanceCalculated(true);
      } else {
        setError('Hubo un problema al buscar la distancia. Por favor, intenta de nuevo.');
      }
    } catch (error) {
      setError('Hubo un problema al buscar la distancia. Por favor, intenta de nuevo.');
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
      factura_viaje: recibirFactura 
    };

    console.log('Datos del formulario:', datosFormulario);

    fetch(`http://localhost:3000/appTaxio/v1/viajes/${idUsuario}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosFormulario),
    })
    .then(response => response.json())
    .then(data => console.log('Respuesta del servidor:', data))
    .catch(error => console.error('Error al enviar los datos:', error));
  };

  return (
    <div>
      <h2>Reservar un viaje</h2>
      <form className='d-flex flex-column' onSubmit={handleSubmit}>
        <label htmlFor='origen'>Origen:</label>
        <input
          type='text'
          id='origen'
          name='origen'
          value={origen}
          onChange={(e) => setOrigen(e.target.value)}
        />
        <label htmlFor='destino'>Destino:</label>
        <input
          type='text'
          id='destino'
          name='destino'
          value={destino}
          onChange={(e) => setDestino(e.target.value)}
        />
        <label htmlFor='fecha'>Fecha:</label>
        <input
          type='date'
          id='fecha'
          name='fecha'
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
        <label htmlFor='hora'>Hora:</label>
        <input
          type='time'
          id='hora'
          name='hora'
          value={hora}
          onChange={(e) => setHora(e.target.value)}
        />
        <label htmlFor="taxistas">Elige tu conductor</label>
        <select 
          name="taxistas" 
          id="taxistas"
          value={taxistaSeleccionado}
          onChange={(e) => setTaxistaSeleccionado(e.target.value)}
        >
          <option value="">Selecciona un taxista</option>
          {taxistas.map(taxista => (
            console.log(taxista),
            <option key={taxista.id_usuario} value={taxista.id_usuario}>{taxista.nombre} {taxista.apellidos}</option>
          ))}
        </select>
        <label htmlFor="factura">Recibir Factura</label>
        <select 
          id="factura" 
          value={recibirFactura}
          onChange={(e) => setRecibirFactura(e.target.value)}
        >
          <option value="Si">Sí</option>
          <option value="No">No</option>
        </select>

        <button type="button" onClick={handleBuscarDistancia}>Calcular Precio</button>
        <button type="submit" disabled={!isDistanceCalculated}>Reservar</button>
      </form>
      {error && <p>{error}</p>}
      {distancia !== null && <p>Distancia: {distancia} kilómetros</p>}
      {precioTotal !== 0 && <p>Precio Total: {precioTotal} euros</p>}
    </div>
  );
}

export default ReservarViaje;
