const token = localStorage.getItem('x-token');

export const getFoundation = async () => {
    try {
        const response = await fetch('https://donarapp.onrender.com/api/dashboard', {
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