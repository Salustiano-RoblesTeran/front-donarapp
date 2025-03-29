const token = localStorage.getItem('x-token');

export const authRegister = async (foundationData) => {
    try {
        const response = await fetch("http://localhost:3000/api/auth/sign-up", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            
            body: JSON.stringify(foundationData),
        });

        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error('Hubo un error al registrar el usuario:', error.message);
    }
};

export const authLogin = async (foundationData) => {
    try {
        const response = await fetch("http://localhost:3000/api/auth/sign-in", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(foundationData)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Hubo un error al registrar el usuario:', error.message);
    }
}

export const isAuthenticate = async () => {

    if (!token) {
        return; 
    }

    try {
        const response = await fetch("http://localhost:3000/api/auth/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-token': token,
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`); // Lanzar error si la respuesta no es ok
        }

        const data = await response.json(); // Obtener los datos de la respuesta
        return data;
    } catch (error) {
        console.error('Hubo un error al traer usuario:', error.message);
    }
}