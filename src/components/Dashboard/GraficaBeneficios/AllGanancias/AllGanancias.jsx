/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGanancias } from '../../../../hooks/useGanancias';
import { deleteGanancia } from '../../../../services/deleteGanancia';

function AllGanancias() {
  const ganancias = useGanancias();

  // Estado para almacenar la ganancia seleccionada
  const [gananciaSeleccionada, setGananciaSeleccionada] = useState(null);

  // Función para eliminar una ganancia
  const handleDelete = async () => {
    if (!gananciaSeleccionada) return;

    const deleted = await deleteGanancia(gananciaSeleccionada.id_ganancia);
    if (deleted) {
      window.location.reload();
    }
  };

  const handleEliminarClick = (ganancia) => {
    setGananciaSeleccionada(ganancia);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div>
      <h2>Todas las Ganancias</h2>
      {ganancias && ganancias.length > 0 ? (
        <table className='table'>
          <thead className='table__thead'>
            <tr className='table__tr'>
              <th className='table__th'>Descripción</th>
              <th className='table__th'>Ganancia Total</th>
              <th className='table__th'>Fecha</th>
              <th className='tabñe__th'>Acciones</th>
            </tr>
          </thead>
          <tbody className='table__tbody'>
            {ganancias.map((ganancia) => (
              <tr className='table__tr' key={ganancia.id_ganancia}>
                <td className='table__td'>{ganancia.descripcion_ganancia}</td>
                <td className='table__td'>{ganancia.ganancia_total}€</td>
                <td className='table__td'>{formatDate(ganancia.fecha_ganancia)}</td>
                <td className='table__td'>
                  <button
                    type='button'
                    className='btn'
                    data-bs-toggle='modal'
                    data-bs-target='#exampleModal'
                    onClick={() => handleEliminarClick(ganancia)}
                  >
                    <i className='fa-solid fa-trash-can icon__basura'></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No existen ganancias.</p>
      )}
      <div className='modal fade' id='exampleModal' tabIndex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='exampleModalLabel'>
                Ganancia seleccionada: {gananciaSeleccionada && gananciaSeleccionada.descripcion_ganancia}
              </h1>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div className='modal-body'>¿Deseas eliminar la ganancia seleccionada?</div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
                Cancelar
              </button>
              <button type='button' className='btn btn-danger' data-bs-dismiss='modal' onClick={handleDelete}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>
      <Link className="button__volver" to={'/dashboard/resumen-financiero'}>
        Volver
      </Link>
      <Link to='/dashboard/resumen-financiero/añadir-ganancia' className='btn btn--nueva'>
        Nueva Ganancia
      </Link>
    </div>
  );
}

export default AllGanancias;
