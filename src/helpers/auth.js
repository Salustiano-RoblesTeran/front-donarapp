export const authRegister = async (fundationData) => {
    try {
        const response = await fetch("http://localhost:3000/api/auth/sign-up", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            
            body: JSON.stringify(fundationData),
        });
        console.log(fundationData)

        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error('Hubo un error al registrar el usuario:', error.message);
    }
};

export const authLogin = async (fundationData) => {
    try {
        const response = await fetch("http://localhost:3000/api/auth/sign-in", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fundationData)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Hubo un error al registrar el usuario:', error.message);
    }
}