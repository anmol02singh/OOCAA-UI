const API_URL = process.env.API_URL || 'http://localhost:3000';

export async function userdata(token) {
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
        console.error('Error logging in:', error);
        throw error;
    }
}

export async function register(name, email, phone, username, password) {
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

export async function updateGeneralUserData(
    token,
    newName,
    // newUsername,
    newEmail,
    newPhone
) {
    try {
        const response = await fetch(`${API_URL}/updateGeneralUserData`, {
            method: "PUT",
            body: JSON.stringify({
                token: token,
                newName: newName,
                // newUsername: newUsername,
                newEmail: newEmail,
                newPhone: newPhone
            }),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating user account:', error);
        throw error;
    }
}

export async function updateProfileImage(
    token,
    newImage,
) {
    try {
        const response = await fetch(`${API_URL}/updateProfileImage`, {
            method: "PUT",
            body: JSON.stringify({
                token: token,
                newImage: newImage 
            }),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating user profile image:', error);
        throw error;
    }
}
