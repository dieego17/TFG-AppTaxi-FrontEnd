/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGastos } from '../../../../hooks/useGastos';
import { deleteGasto } from '../../../../services/deleteGasto';

function AllGastos() {
  const gastos = useGastos();

  // Estado para almacenar el gasto seleccionado
  const [gastoSeleccionado, setGastoSeleccionado] = useState(null);

  // Función para eliminar una gasto
  const handleDelete = async () => {
    if (!gastoSeleccionado) return;

    const deleted = await deleteGasto(gastoSeleccionado.id_gasto);
    if (deleted) {
      window.location.reload();
    }
  };

  // Formatear la fecha
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const handleEliminarClick = (gasto) => {
    setGastoSeleccionado(gasto);
  };

  return (
    <div>
      <h2>Todos los Gastos</h2>
      {gastos && gastos.length > 0 ? (
        <table className='table'>
          <thead className='table__thead'>
            <tr className='table__tr'>
              <th className='table__th'>Descripción</th>
              <th className='table__th'>Gasto Total</th>
              <th className='table__th'>Fecha</th>
              <th className='table__th'>Acciones</th>
            </tr>
          </thead>
          <tbody className='table__tbody'>
            {gastos.map((gasto) => (
              <tr className='table__tr' key={gasto.id_gasto}>
                <td className='table__td'>{gasto.descripcion_gasto}</td>
                <td className='table__td'>{gasto.gasto_total}€</td>
                <td className='table__td'>{formatDate(gasto.fecha_gasto)}</td>
                <td className='table__td'>
                  <button
                    type='button'
                    className='btn'
                    data-bs-toggle='modal'
                    data-bs-target='#exampleModal'
                    onClick={() => handleEliminarClick(gasto)}
                  >
                    <i className='fa-solid fa-trash-can icon__basura'></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No existen gastos.</p>
      )}
      <div className='modal fade' id='exampleModal' tabIndex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='exampleModalLabel'>
                Gasto seleccionado: {gastoSeleccionado && gastoSeleccionado.descripcion_gasto}
              </h1>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div className='modal-body'>¿Deseas eliminar el gasto seleccionado?</div>
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
      <Link to={'/dashboard/resumen-financiero'}>Volver</Link>
      <Link to='/dashboard/gastos/nuevo' className='btn btn--nueva'>
        Nuevo Gasto
      </Link>
    </div>
  );
}

export default AllGastos;
