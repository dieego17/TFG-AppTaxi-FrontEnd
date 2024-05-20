export const updateEstadoViaje = (viajeId, nuevoEstado) => {
    const ApiUrl = import.meta.env.VITE_REACT_URL_API;

    return fetch(`${ApiUrl}/viajes/${viajeId}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
            estado_viaje: nuevoEstado,
        }),
    })

    .then((response) => response.json())
    .then((data) => data);
};
