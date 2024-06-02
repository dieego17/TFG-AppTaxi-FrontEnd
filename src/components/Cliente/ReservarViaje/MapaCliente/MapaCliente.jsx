/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { useLoadScript, GoogleMap, DirectionsRenderer } from '@react-google-maps/api';

const bibliotecas = ["places"];

const opcionesMapa = {
  disableDefaultUI: true,
  zoomControl: true
};

function MapaCliente({origen, destino}) {
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API;

  const [directions, setDirections] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const mapRef = useRef(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries: bibliotecas,
  });


  useEffect(() => {
    if (isLoaded && origen && destino) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: origen,
          destination: destino,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);

            const bounds = new window.google.maps.LatLngBounds();
            result.routes[0].overview_path.forEach(point => {
              bounds.extend(point);
            });

            mapRef.current.fitBounds(bounds);
          } else {
            console.error(`Error al obtener direcciones: ${result}`);
          }
        }
      );
    }
  }, [isLoaded]);

  if (loadError) return <div>Error al cargar el mapa</div>;
  if (!isLoaded) return <div>Cargando el Mapa</div>;

  let distancia = null;
  if (directions) {
    distancia = directions.routes[0].legs[0].distance.text;
  }

  return (
    <div className='container__ruta container'>
      <div className='container__mapa'>
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '400px', borderRadius: '30px', boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)', zIndex: '-1'}}
          center={mapCenter}
          options={opcionesMapa}
          onLoad={map => mapRef.current = map}
        >
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </div>
    </div>
  );
}

export default MapaCliente;

