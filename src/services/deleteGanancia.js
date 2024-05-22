export const deleteGanancia = async (id) => {
  const ApiUrl = import.meta.env.VITE_REACT_URL_API;

  const response = await fetch(`${ApiUrl}/ganancias/${id}`, {
    method: "DELETE",
  });

  if (response.status === 200) {
    console.log("Ganancia eliminada");
    return true;
  } else {
    console.log("Error al eliminar la ganancia");
    return false;
  }
};
