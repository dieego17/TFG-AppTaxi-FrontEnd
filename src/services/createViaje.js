export const createViaje = async (idUsuario, datosFormulario) => {
    const ApiUrl = import.meta.env.VITE_REACT_URL_API

    const res = await fetch(`${ApiUrl}/viajes/${idUsuario}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosFormulario),
    });

    // Verificar si la petición fue exitosa
    if (res.status === 200) {
        console.log('Reserva creada');
    } else {
        console.log('Error al crear la reserva');
    }
};