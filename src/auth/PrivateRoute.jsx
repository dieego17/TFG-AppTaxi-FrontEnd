/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ roles }) => {
    const token = localStorage.getItem('token');

    // Si no hay token, redirigir a la página de inicio de sesión
    if (!token) {
        return <Navigate to="/login" />;
    }

    const parseJwt = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                window.atob(base64)
                    .split('')
                    .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );
            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error("Failed to parse JWT", error);
            return null;
        }
    };

    const usuario = parseJwt(token);

    // Si el usuario no existe o no tiene el rol necesario, redirigir a la página de inicio de sesión
    if (!usuario || !roles.includes(usuario.rol)) {
        //borrar token
        localStorage.removeItem('token');
        return <Navigate to="/login" />;

    }

    return <Outlet />;
};

export default PrivateRoute;
