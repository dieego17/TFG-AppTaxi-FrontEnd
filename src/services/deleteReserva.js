export const deleteReserva = (reservaId) => {
    const ApiUrl = import.meta.env.VITE_REACT_URL_API;

    return fetch(`${ApiUrl}/reservas/${reservaId}`, {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
        },
    })

    .then((response) => response.json())
    .then((data) => data);
};
