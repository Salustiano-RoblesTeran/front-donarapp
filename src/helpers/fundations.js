export const getFundations = async (userData) => {
    try {
        const response = await fetch("http://localhost:3000/api/fundations/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Hubo un error al registrar el usuario:', error.message);
    }
}

export const getFundation = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/api/fundations/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Hubo un error al registrar el usuario:', error.message);
    }
}

export const getCategories = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/fundations/categories", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Hubo un error al obtener las categorías:', error.message);
    }
}


export const getFundationsCategories = async (category) => {
    try {
        const response = await fetch(`http://localhost:3000/api/fundations/filter?category=${category}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Hubo un error al obtener las categorías:', error.message);
    }
}