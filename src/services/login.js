export const login = async (data) => {

    function parseJwt (token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
      
        return JSON.parse(jsonPayload);
    }
      
    const ApiUrl = import.meta.env.VITE_REACT_URL_API

    const res = await fetch(`${ApiUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    // Verificar si la petición fue exitosa
    if (res.status === 200) {
        const data = await res.json();
        localStorage.setItem('token', data.token);
        const usuario = parseJwt(data.token);
        if (usuario.rol === 'cliente') {
            window.location.href = '/cliente';
        } else if (usuario.rol === 'admin') {
            window.location.href = '/dashboard';
        }
    } else {
        throw new Error('Error al iniciar sesión');
    }
}