/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './reseña.css';
import { createTestimonio } from '../../../services/createTestimonio';

function Reseña() {
    // Estado para la puntuación
    const [puntuacion, setPuntuacion] = useState(0);
    const [mensaje, setMensaje] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    // ID del usuario
    const token = localStorage.getItem('token');

    const idUsuario = token ? JSON.parse(atob(token.split('.')[1])).id_usuario : '';

    // Función para manejar el click en las estrellas
    const handleClick = (valor) => {
        setPuntuacion(valor);
    };

    const handleChange = (e) => {
        setMensaje(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (puntuacion === 0 || mensaje === '') {
            setError(true); // Establecer el estado error como true si hay errores
            return;
        }

        // Llamar a la función para crear el testimonio
        createTestimonio(idUsuario, mensaje, puntuacion);
        setSuccess(true);
    };

    return (
        <div className='container__reseña'>
            <h1>Reseña</h1>
            {
                success ? 
                <div className="alert alert-success" role="alert">
                    Reseña enviada correctamente
                </div>
                : 
                null
            }
            {
                error ? 
                <div className="alert alert-danger" role="alert">
                    Debes completar todos los campos
                </div>
                : 
                null
            }
            <form onSubmit={handleSubmit} action="" className='form__reseña'>
                <label htmlFor="reseña">Escribe tu reseña</label>
                <textarea onChange={handleChange} name="reseña" id="reseña" cols="30" rows="10"></textarea>
                <label htmlFor="puntuacion">Puntuación</label>
                <div className="stars">
                    {/* Contenedor de estrellas */}
                    {[...Array(5)].map((star, i) => {
                        const valor = i + 1;
                        return (
                            <span key={i} onClick={() => handleClick(valor)}>
                                <i className={`fa-solid fa-star ${valor <= puntuacion ? 'selected' : ''}`}></i>
                            </span>
                        );
                    })}
                </div>
                <button>Enviar</button>
            </form>
        </div>
    );
}

export default Reseña;
