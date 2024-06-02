export const reservaViaje = async (datosFormulario, idUsuario) => {
    const ApiUrl = import.meta.env.VITE_REACT_URL_API

    const res = await fetch(`${ApiUrl}/viajes/${idUsuario}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosFormulario),
    });

    return res;
};