/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MapaCliente({ origen, destino }) {
  const [origenCoords, setOrigenCoords] = useState(null);
  const [destinoCoords, setDestinoCoords] = useState(null);
  const [rutaCoords, setRutaCoords] = useState([]);
  const [distancia, setDistancia] = useState(null);

  const API_KEY = import.meta.env.VITE_OPENROUTESERVICE_APIKEY;

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
      if (origen && destino) {
        const origenData = await geocodeAddress(`${origen}, España`);
        const destinoData = await geocodeAddress(`${destino}, España`);

        setOrigenCoords(origenData);
        setDestinoCoords(destinoData);

        if (origenData && destinoData) {
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
                    [origenData.lng, origenData.lat],
                    [destinoData.lng, destinoData.lat],
                  ],
                }),
              }
            );

            const data = await response.json();
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
  }, [origen, destino, API_KEY]);

  const centroMapa = origenCoords || { lat: 40.4168, lng: -3.7038 }; // por defecto Madrid

  return (
    <div className="container__ruta container">
      <div className="container__mapa">
        {origenCoords && destinoCoords && (
          <MapContainer
            center={centroMapa}
            zoom={7}
            style={{
              width: "100%",
              height: "400px",
              borderRadius: "30px",
              boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
              zIndex: "-1",
            }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={origenCoords}>
              <Popup>Origen: {origen}</Popup>
            </Marker>
            <Marker position={destinoCoords}>
              <Popup>Destino: {destino}</Popup>
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

export default MapaCliente;