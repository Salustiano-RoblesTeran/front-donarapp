export const getFoundations = async (userData) => {
    try {
        const response = await fetch("http://localhost:3000/api/foundations/", {
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

export const getFoundation = async (foundationId) => {
    try {
        const response = await fetch(`http://localhost:3000/api/foundations/${foundationId}`, {
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
        const response = await fetch("http://localhost:3000/api/foundations/categories", {
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


export const getFoundationsCategories = async (category) => {
    try {
        const response = await fetch(`http://localhost:3000/api/foundations/filter?category=${category}`, {
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