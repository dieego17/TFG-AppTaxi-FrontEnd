/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLoadScript, GoogleMap, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { useOneViajeRuta } from '../../../../../../hooks/useOneViajeRuta';
import distance from '../../../../../../assets/images/distance.png';
import './ruta.css';

const bibliotecas = ["places"];

const opcionesMapa = {
  disableDefaultUI: true,
  zoomControl: true,
};

function RutaMapa() {
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API;
  const token = localStorage.getItem("token");
  const idUsuario = token ? JSON.parse(atob(token.split(".")[1])).id_usuario : "";

  const [directions, setDirections] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const mapRef = useRef(null);

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
  }, [ruta, isLoaded]);

  if (loadError) return <div>Error al cargar el mapa</div>;
  if (!isLoaded) return <div>Cargando el Mapa</div>;

  let distancia = null;
  if (directions) {
    distancia = directions.routes[0].legs[0].distance.text;
  }

  return (
    <div className='container__ruta container'>
      {ruta && ruta.reserva && (
        <div className='container__info' key={ruta.id_viaje}>
          <h1>Ruta Viaje</h1>
          <table className='ruta__table'>
            <tbody>
              <tr>
                <td className='td__title'><i className="fa-regular fa-compass icono__ruta"></i>Origen: </td>
                <td className='td__info'>{ruta.origen_viaje}</td>
              </tr>
              <tr>
                <td className='td__title'><i className="fa-solid fa-location-dot icono__ruta"></i>Destino: </td>
                <td className='td__info'>{ruta.destino_viaje}</td>
              </tr>
              <tr>
                <td className='td__title'><img className='icono__ruta' src={distance} alt="" />Distancia: </td>
                <td className='td__info'>{distancia}</td>
              </tr>
              <tr>
                <td className='td__title'><i className="fa-regular fa-calendar-days icono__ruta"></i>Fecha: </td>
                <td className='td__info'>{formatDate(ruta.fecha_viaje)}</td>
              </tr>
              <tr>
                <td className='td__title'><i className="fa-regular fa-clock icono__ruta"></i>Hora: </td>
                <td className='td__info'>{ruta.hora_viaje}</td>
              </tr>
            </tbody>
          </table>
          <div className='container__buttonVolver'>
            <Link className='button__volver' to={`/dashboard/clientes/viajes-detalle/${ruta.reserva.id_cliente}`}>
              Volver
            </Link>
          </div>
        </div>
      )}
      <div className='container__mapa'>
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%', borderRadius: '30px', boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)', zIndex: '-1'}}
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

export default RutaMapa;
