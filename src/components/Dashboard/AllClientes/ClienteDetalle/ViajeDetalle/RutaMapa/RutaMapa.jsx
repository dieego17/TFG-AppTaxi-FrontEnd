/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLoadScript, GoogleMap, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { useOneViajeRuta } from '../../../../../../hooks/useOneViajeRuta';

const bibliotecas = ["places"];

const estiloContenedorMapa = {
  width: "800px",
  height: "600px",
  borderRadius: "10px",
  zIndex: "-1"
};

const centroMapa = {
  lat: 0,
  lng: 0,
};

const opcionesMapa = {
  disableDefaultUI: true,
  zoomControl: true,
};

function RutaMapa() {
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API;

  const [idUsuario, setIdUsuario] = useState("3");
  const [directions, setDirections] = useState(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries: bibliotecas,
  });

  const params = useParams();
  const id = params.id;

  const ruta = useOneViajeRuta(id);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  useEffect(() => {
    if (ruta && isLoaded && ruta.origen_viaje && ruta.destino_viaje) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: ruta.origen_viaje,
          destination: ruta.destino_viaje,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error(`Error al obtener direcciones: ${result}`);
          }
        }
      );
    }
  }, [ruta, isLoaded]);

  if (loadError) return <div>Error al cargar el mapa</div>;
  if (!isLoaded) return <div>Cargando el Mapa</div>;

  let distancia = null;
  if (directions) {
    distancia = directions.routes[0].legs[0].distance.text;
  }

  return (
    <div>
      {ruta && ruta.reserva && (
        <div key={ruta.id_viaje}>
          <Link to={`/dashboard/clientes/viajes-detalle/${ruta.reserva.id_cliente}`}>
            Volver
          </Link>
          <p>Origen: {ruta.origen_viaje}</p>
          <p>Destino: {ruta.destino_viaje}</p>
          <p>Distancia: {distancia}</p>
          <p>Fecha viaje: {formatDate(ruta.fecha_viaje)}</p>
          <p>Hora viaje: {ruta.hora_viaje}</p>
        </div>
      )}
      <GoogleMap
        mapContainerStyle={estiloContenedorMapa}
        zoom={10}
        center={centroMapa}
        options={opcionesMapa}
      >
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </div>
  );
}

export default RutaMapa;
