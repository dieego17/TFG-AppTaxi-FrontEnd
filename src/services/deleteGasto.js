export const deleteGasto = async (id) => {
  const ApiUrl = import.meta.env.VITE_REACT_URL_API;

  const response = await fetch(`${ApiUrl}/perdidas/${id}`, {
    method: "DELETE",
  });

  if (response.status === 200) {
    console.log("Gasto eliminada");
    return true;
  } else {
    console.log("Error al eliminar la gasto");
    return false;
  }
};
