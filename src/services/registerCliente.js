export const registerCliente = async (data) => {

    const ApiUrl = import.meta.env.VITE_REACT_URL_API

    const res = await fetch(`${ApiUrl}/register/cliente`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    return res.json();

}