/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLoadScript, GoogleMap, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { useOneViajeRuta } from '../../../../../../hooks/useOneViajeRuta';

// Bibliotecas de API de Google Maps
const bibliotecas = ["places"];

// Estilo  del mapa
const estiloContenedorMapa = {
  width: "800px",
  height: "600px",
  borderRadius: "10px",
  zIndex: "-1" 
};

// Centro inicial del mapa
const centroMapa = {
  lat: 0,
  lng: 0,
};

// Opciones del mapa
const opcionesMapa = {
  disableDefaultUI: true,
  zoomControl: true,
};

function RutaMapa() {

  // Clave de Google Maps
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API;

  const [idUsuario, setIdUsuario] = useState("3");

  // Estado para almacenar las direcciones de la ruta
  const [directions, setDirections] = useState(null);

  // Carga de la API de Google Maps 
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries: bibliotecas,
  });

  // Obtención del ID del viaje para hacer la ruta
  const params = useParams();
  const id = params.id;

  const ruta = useOneViajeRuta(id);

  // Función para formatear la fecha de la ruta
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  // Efecto para obtener las direcciones de la ruta cuando la ruta y la API están cargadas
  useEffect(() => {
    // Si hay una ruta y la API de Google Maps está cargada
    if (ruta && isLoaded) {
      // Creamos un servicio de direcciones
      const directionsService = new window.google.maps.DirectionsService();
      // Obtenemos las direcciones de la ruta
      directionsService.route(
        {
          origin: ruta.origen_viaje,
          destination: ruta.destino_viaje,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        // Callback para manejar el resultado de la obtención de direcciones
        (result, status) => {
          // Si las direcciones se obtienen correctamente, las almacenamos
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error(`error al obtener direcciones ${result}`);
          }
        }
      );
    }
  }, [ruta, isLoaded]);

  // Manejo de errores de carga de la API de Google Maps
  if (loadError) return <div>Error al cargar el mapa</div>;

  // Muestra un mensaje mientras se carga la API de Google Maps
  if (!isLoaded) return <div>Cargando el Mapa</div>;

  // Variable para almacenar la distancia de la ruta
  let distancia = null;
  
  // Si hay direcciones disponibles, extraemos la distancia
  if (directions) {
    distancia = directions.routes[0].legs[0].distance.text;
  }

  return (
    <div>
      {ruta && (
        <div key={ruta.id_viaje}>
          <p>Origen: {ruta.origen_viaje}</p>
          <p>Destino: {ruta.destino_viaje}</p>
          <p>Distancia: {distancia}</p>
          <p>Fecha viaje: {formatDate(ruta.fecha_viaje)}</p>
          <p>Hora viaje: {ruta.hora_viaje}</p>
        </div>
      )}
      {/* Componente de GoogleMap para mostrar el mapa */}
      <GoogleMap
        mapContainerStyle={estiloContenedorMapa}
        zoom={10}
        center={centroMapa}
        options={opcionesMapa}
      > 
        {/* Mostramos las direcciones de la ruta */}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </div>
  )
}

export default RutaMapa;
