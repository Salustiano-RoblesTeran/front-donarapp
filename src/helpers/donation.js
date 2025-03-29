export const createDonation = async (donation) => {
    try {
        const response = await fetch("http://localhost:3000/api/payments/donate", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(donation),
        })
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Hubo un error al realizar una donacion:', error.message);
    }
}

export const getTransactions = async (foundationId) => {
    try {
        const response = await fetch(`http://localhost:3000/api/payments/transaction/${foundationId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Hubo un error al traer las transacciones.', error);
    }
}