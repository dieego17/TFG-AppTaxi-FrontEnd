export const registerTaxista = async (data) => {

    const ApiUrl = import.meta.env.VITE_REACT_URL_API

    const res = await fetch(`${ApiUrl}/register/taxista`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    return res.json();

}