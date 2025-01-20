const API_URL = process.env.API_URL || 'http://localhost:3000';

export async function login(username, password) {
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
        console.error('Error fetching CDM data:', error);
        throw error;
    }
}
