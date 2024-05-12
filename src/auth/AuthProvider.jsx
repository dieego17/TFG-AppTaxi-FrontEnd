/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// Importaciones de React y funciones necesarias para crear y usar contextos
import { createContext, useContext, useState, useEffect } from 'react';
import React from 'react';


// Crear el contexto de autenticación
const AuthContext = createContext({
    isAuth: false,
    getAccessToken: () => {},
    saveUser: (json) => {},
    getRefreshToken: () => {},
    getUser: () => ({})
});

export const useAuth = () => useContext(AuthContext);

// Componente proveedor de autenticación
function AuthProvider({ children }) {

  const ApiUrl = import.meta.env.VITE_REACT_URL_API


    // Estados locales para el proveedor de autenticación
    const [isAuth, setIsAuth] = useState(false);
    const [accessToken, setAccessToken] = useState('');
    const [user, setUser] = useState({});

    // Efecto para verificar la autenticación al cargar el componente
    useEffect(() => {
        checkAuth();
    }, []);

    // Función para solicitar un nuevo token de acceso
    async function requestNewToken(token) {
        // Hacer una petición al backend para obtener un nuevo token de acceso
        const response = await fetch(`${ApiUrl}/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        if (response.ok) {
            const json = await response.json();
            if (json.body.accessToken) {
                return json.body.accessToken;
            } else {
                return null;
            }
        }
    }

    // Función para obtener la información del usuario
    async function getUserInfo(token) {
        // Hacer una petición al backend para obtener la información del usuario
        const response = await fetch(`${ApiUrl}/usuarios`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        if (response.ok) {
            const json = await response.json();
            return json;
        } else {
            return null;
        }
    }

    // Función para verificar la autenticación
    async function checkAuth() {
        if (accessToken) {
            // El usuario está autenticado
        } else {
            // El usuario no está autenticado
            // Obtener el token de actualización de localStorage
            const token = getRefreshToken();
            if (token) {
                // Solicitar un nuevo token de acceso
                const newAccessToken = await requestNewToken(token);
                if (newAccessToken) {
                    // Obtener la información del usuario con el nuevo token de acceso
                    const userInfo = await getUserInfo(newAccessToken);
                    if (userInfo) {
                        // Guardar la información de la sesión
                        saveSessionInfo(userInfo, newAccessToken, token);
                    }
                }
            }
        }
    }

    // Función para guardar la información de la sesión
    function saveSessionInfo(userInfo, accessToken, refreshToken) {
        setAccessToken(accessToken);
        setUser(userInfo);
        localStorage.setItem('token', JSON.stringify(refreshToken));
        setIsAuth(true);
    }

    // Función para obtener el token de acceso
    function getAccessToken() {
        return accessToken;
    }

    // Función para obtener el token de actualización
    function getRefreshToken() {
        const tokenData = localStorage.getItem('Token');
        if (tokenData) {
            const token = JSON.parse(tokenData);
            return token;
        }
        return null;
    }

    // Función para guardar el usuario
    function saveUser(json) {
        saveSessionInfo(json.body.usuario, json.body.accessToken, json.body.refreshToken);
    }

    // Función para obtener la información del usuario
    function getUser() {
        return user;
    }

    // Devolver el proveedor de autenticación con el contexto y sus valores
    return (
        <AuthContext.Provider value={{ isAuth, getAccessToken, saveUser, getRefreshToken, getUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
