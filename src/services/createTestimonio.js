export const createTestimonio = async (idUsuario, mensaje, puntuacion) => {
  const ApiUrl = import.meta.env.VITE_REACT_URL_API;

  const res = await fetch(`${ApiUrl}/testimonios/${idUsuario}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mensaje_testimonio: mensaje,
      clasificacion_testimonio: puntuacion,
    }),
  });

  // Verificar si la petición fue exitosa
  if (res.status === 200) {
    console.log("Reseña creada");
  } else {
    console.log("Error al crear la reseña");
  }
};
