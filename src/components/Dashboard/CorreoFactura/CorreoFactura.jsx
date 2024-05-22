/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import emailjs from 'emailjs-com';

function CorreoFactura() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('Mensaje predeterminado');
    const [pdfFile, setPdfFile] = useState(null);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleFileChange = (e) => {
        setPdfFile(e.target.files[0]);
    };

    const sendEmail = async () => {
        const templateParams = {
            to_email: email,
            message: message,
            pdf: pdfFile
        };

        try {
            await emailjs.send('servicio_id', 'plantilla_id', templateParams, 'user_id');
            alert('Correo enviado correctamente');
        } catch (error) {
            console.error('Error al enviar el correo:', error);
            alert('Error al enviar el correo');
        }
    };

    return (
        <div>
            <input type="email" placeholder="Correo electrónico" onChange={handleEmailChange} />
            <textarea value={message} onChange={handleMessageChange}></textarea>
            <input type="file" onChange={handleFileChange} />
            <button onClick={sendEmail}>Enviar correo</button>
        </div>
    );
}

export default CorreoFactura;
