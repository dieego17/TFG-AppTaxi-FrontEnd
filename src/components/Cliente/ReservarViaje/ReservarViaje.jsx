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
  const [recibirFactura, setRecibirFactura] = useState('');
  const [idUsuario, setIdUsuario] = useState(1);
  const [isDistanceCalculated, setIsDistanceCalculated] = useState(false);
  const [success, setSuccess] = useState(false);

  const taxistas = useTaxistas();

  const handleBuscarDistancia = async () => {
    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API;

     // Validar origen y destino
     if (!origen || !destino) {
      setError('Por favor, completa los campos de origen y destino.');
      return;
    }

    // Validar fecha y hora
    if (!fecha || !hora) {
      setError('Por favor, selecciona una fecha y hora.');
      return;
    }

    // Validar taxista seleccionado
    if (!taxistaSeleccionado) {
      setError('Por favor, selecciona un taxista.');
      return;
    }

    // Validar factura
    if (!recibirFactura) {
      setError('Por favor, selecciona si quiere factura.');
      return;
    }

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
      factura_viaje: recibirFactura 
    };

    fetch(`http://localhost:3000/appTaxio/v1/viajes/${idUsuario}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosFormulario),
    })
    .then(response => response.json())
    .then(data => console.log('Respuesta del servidor:', data))
    .then(() => setSuccess(true))
    .catch(error => console.error('Error al enviar los datos:', error));
  };

  return (
    <div>
      <h2>Reservar un viaje</h2>
      {
        // Mostrar mensaje de éxito si se ha creado la reserva
        // Mostrar mensaje de error si hay errores en el formulario
        error && 
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      }
      {
        success && 
        <div className="alert alert-success" role="alert">
          Viaje reservado correctamente
        </div>
      }
      {
        isDistanceCalculated && 
        <div className="alert alert-info" role="alert">
          El precio del viaje sería: {precioTotal}€
        </div>
      }
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
          min={new Date().toISOString().split('T')[0]} // Fecha de hoy
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
            <option key={taxista.id_usuario} value={taxista.id_usuario}>{taxista.nombre} {taxista.apellidos}</option>
          ))}
        </select>
        <label htmlFor="factura">Recibir Factura</label>
        <select 
          id="factura" 
          value={recibirFactura}
          onChange={(e) => setRecibirFactura(e.target.value)}
        >
          <option value="">Selecciona una opción</option>
          <option value="Si">Sí</option>
          <option value="No">No</option>
        </select>

        <button type="button" onClick={handleBuscarDistancia}>Calcular Precio</button>
        <button type="submit" disabled={!isDistanceCalculated}>Reservar</button>
      </form>
    </div>
  );
}

export default ReservarViaje;
