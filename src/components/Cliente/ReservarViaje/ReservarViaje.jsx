/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

function ReservarViaje() {
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [distancia, setDistancia] = useState(null);
  const [precioTotal, setPrecioTotal] = useState(0);
  const [error, setError] = useState(null);

  // Función para buscar la distancia entre dos ubicaciones
  const handleBuscarDistancia = async () => {

    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API 

    try {
      const apiKey = API_KEY
      // Validar que los campos de origen y destino no estén vacíos 
      const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origen}&destinations=${destino}&key=${apiKey}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.status === 'OK') {
        // Obtener la distancia en metros y convertirla a kilómetros
        const distanciaEnMetros = data.rows[0].elements[0].distance.value;
        const distanciaEnKilometros = distanciaEnMetros / 1000;
        setDistancia(distanciaEnKilometros);
        setError(null);
        // Calcular el precio total basado en la distancia
        calcularPrecioTotal(distanciaEnKilometros);
      } else {
        setError('Hubo un problema al buscar la distancia. Por favor, intenta de nuevo.');
      }
    } catch (error) {
      setError('Hubo un problema al buscar la distancia. Por favor, intenta de nuevo.');
    }
  };

  const calcularPrecioTotal = (distancia) => {
    // Precio por kilómetro en euros
    const precioPorKilometro = 1; 
    let precio;
  
    // Si la distancia es menor a 5 km, sumar 4€ al precio total
    if (distancia < 5) {
      precio = 4 + (distancia + 1) * precioPorKilometro;
    } else {
      // Calcular el precio total basado en la distancia
      precio = distancia * precioPorKilometro;
    }
    
    setPrecioTotal(precio);
  };

  return (
    <div>
      <h2>Reservar un viaje</h2>
      <form className='d-flex flex-column' onSubmit={(e) => e.preventDefault()}>
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
        <label htmlFor='precioTotal'>Precio Total:</label>
        <input
          type='hidden'
          id='precioTotal'
          name='precioTotal'
          value={precioTotal}
          readOnly
        />
        <button onClick={handleBuscarDistancia}>Buscar</button>
      </form>
      {error && <p>{error}</p>}
      {distancia !== null && <p>Distancia: {distancia} kilómetros</p>}
      {precioTotal !== 0 && <p>Precio Total: {precioTotal} euros</p>}
    </div>
  );
}

export default ReservarViaje;
