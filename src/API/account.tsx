const API_URL = process.env.API_URL || 'http://localhost:3000';

export async function userdata(token: string) {
    try {
        const response = await fetch(`${API_URL}/userdata`, {
            method: "POST",
            body: JSON.stringify({ token: token }),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error obtaining role:', error);
        throw error;
    }
}

export async function login(username: string, password: string) {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
}

export async function register(name: string, email: string, phone: string, username: string, password: string) {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                username: username,
                password: password
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.error('Error registering:', error);
        throw error;
    }
}
