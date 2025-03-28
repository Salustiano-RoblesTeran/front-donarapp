const token = localStorage.getItem('x-token');

export const getFundation = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/dashboard', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-token': token
            }
        })
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Hubo un error al traer las transacciones.', error);
    }
}