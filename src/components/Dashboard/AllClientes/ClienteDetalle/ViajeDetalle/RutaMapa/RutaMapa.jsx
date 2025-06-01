/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useOneViajeRuta } from "../../../../../../hooks/useOneViajeRuta";
import distanceIcon from "../../../../../../assets/images/distance.png";
import "./ruta.css";

function RutaMapa() {
  const params = useParams();
  const id = params.id;

  const ruta = useOneViajeRuta(id);

  const [origenCoords, setOrigenCoords] = useState(null);
  const [destinoCoords, setDestinoCoords] = useState(null);
  const [rutaCoords, setRutaCoords] = useState([]);
  const [distancia, setDistancia] = useState(null);

  const API_KEY = import.meta.env.VITE_OPENROUTESERVICE_APIKEY;

  const formatDate = (date) => new Date(date).toLocaleDateString();

  const geocodeAddress = async (address) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address
        )}`
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
  

  useEffect(() => {
    const obtenerDatos = async () => {
      if (ruta && ruta.origen_viaje && ruta.destino_viaje) {
        const origen = await geocodeAddress(`${ruta.origen_viaje}, España`);
        const destino = await geocodeAddress(`${ruta.destino_viaje}, España`);

        setOrigenCoords(origen);
        setDestinoCoords(destino);

        console.log("Coordenadas origen:", origen);
        console.log("Coordenadas destino:", destino);

        if (origen && destino) {
          try {
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
                    [origen.lng, origen.lat],
                    [destino.lng, destino.lat],
                  ],
                }),
              }
            );

            const data = await response.json();
            console.log("Respuesta completa OpenRouteService:", data);

            if (data && data.features && data.features.length > 0) {
              const coordinates = data.features[0].geometry.coordinates.map(
                (coord) => [coord[1], coord[0]]
              );
              setRutaCoords(coordinates);

              const distanciaKm =
                data.features[0].properties.summary.distance / 1000;
              setDistancia(`${distanciaKm.toFixed(2)} km`);
            } else {
              console.error("No se encontraron rutas en la respuesta:", data);
            }
          } catch (error) {
            console.error("Error en la petición a OpenRouteService:", error);
          }
        }
      }
    };

    obtenerDatos();
  }, [ruta, API_KEY]);

  const centroMapa = origenCoords || { lat: 40.4168, lng: -3.7038 }; // por defecto, Madrid

  return (
    <div className="container__ruta container">
      {ruta && ruta.reserva && (
        <div className="container__info">
          <h1 className="h1__allClientes">Ruta Viaje</h1>
          <table className="ruta__table">
            <tbody>
              <tr>
                <td className="td__title">
                  <i className="fa-regular fa-compass icono__ruta"></i>Origen:{" "}
                </td>
                <td className="td__info">{ruta.origen_viaje}</td>
              </tr>
              <tr>
                <td className="td__title">
                  <i className="fa-solid fa-location-dot icono__ruta"></i>
                  Destino:{" "}
                </td>
                <td className="td__info">{ruta.destino_viaje}</td>
              </tr>
              <tr>
                <td className="td__title">
                  <img className="icono__ruta" src={distanceIcon} alt="" />
                  Distancia:{" "}
                </td>
                <td className="td__info">{distancia || "Calculando..."}</td>
              </tr>
              <tr>
                <td className="td__title">
                  <i className="fa-regular fa-calendar-days icono__ruta"></i>
                  Fecha:{" "}
                </td>
                <td className="td__info">{formatDate(ruta.fecha_viaje)}</td>
              </tr>
              <tr>
                <td className="td__title">
                  <i className="fa-regular fa-clock icono__ruta"></i>Hora:{" "}
                </td>
                <td className="td__info">{ruta.hora_viaje}</td>
              </tr>
            </tbody>
          </table>
          <div className="container__buttonVolver">
            <Link
              className="button__volver"
              to={`/dashboard/clientes/viajes-detalle/${ruta.reserva.id_cliente}`}
            >
              Volver
            </Link>
          </div>
        </div>
      )}
      <div className="container__mapa">
        {origenCoords && destinoCoords && (
          <MapContainer
            center={centroMapa}
            zoom={7}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "30px",
              boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
            }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={origenCoords}>
              <Popup>Origen: {ruta.origen_viaje}</Popup>
            </Marker>
            <Marker position={destinoCoords}>
              <Popup>Destino: {ruta.destino_viaje}</Popup>
            </Marker>
            {rutaCoords.length > 0 && (
              <Polyline positions={rutaCoords} color="blue" />
            )}
          </MapContainer>
        )}
      </div>
    </div>
  );
}

export default RutaMapa;
