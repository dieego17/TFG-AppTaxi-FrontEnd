export const cambiarContraseña = async (correo_electronico, contraseña) => {
    const ApiUrl = import.meta.env.VITE_REACT_URL_API;

    try {
        const response = await fetch(`${ApiUrl}/usuarios/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                correo_electronico,
                contraseña,
            }),
        });

        if (!response.ok) {
            throw new Error('Error al cambiar la contraseña');
        }

        return response.json();
    } catch (error) {
        throw new Error('Error al cambiar la contraseña: ' + error.message);
    }
};
