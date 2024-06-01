export const cancelarViajeTaxista = (viajeId) => {
    const ApiUrl = import.meta.env.VITE_REACT_URL_API;

    return fetch(`${ApiUrl}/viajes/${viajeId}`, {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
        },
    })

    .then((response) => response.json())
    .then((data) => data);
};
