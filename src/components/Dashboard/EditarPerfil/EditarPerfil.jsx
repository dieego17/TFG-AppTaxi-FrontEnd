/* eslint-disable no-unused-vars */
import React from 'react'
import './editar.css'

function EditarPerfil() {

  

  return (
    <div className='container__editar'>
      <h1>Editar Perfil</h1>
      <form action="" className='form__editar'>
        <label htmlFor="email">Correo electronico</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">Contraseña</label>
        <input type="password" name="password" id="password" />
        <label htmlFor="password">Confirmar contraseña</label>
        <input type="password" name="password" id="password" />
        <label htmlFor="vehiculo">Vehiculo</label>
        <input type="text" name="vehiculo" id="vehiculo" />
        <button>Guardar cambios</button>
      </form>
    </div>
  )
}

export default EditarPerfil