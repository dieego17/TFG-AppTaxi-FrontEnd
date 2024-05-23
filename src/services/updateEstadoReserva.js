export const updateEstadoViaje = (reservaId, nuevoEstado) => {
    const ApiUrl = import.meta.env.VITE_REACT_URL_API;

    return fetch(`${ApiUrl}/reservas/${reservaId}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
            estado_reserva: nuevoEstado,
        }),
    })

    .then((response) => response.json())
    .then((data) => data);
};
