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

export async function updateGeneralUserData(
    token: string,
    newName?: string | undefined,
    // newUsername: string | undefined,
    newEmail?: string | undefined,
    newPhone?: string | undefined,
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
    token: string,
    newImage: string,
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

export async function removeProfileImage(token: string) {
    try {
        const response = await fetch(`${API_URL}/removeProfileImage`, {
            method: "DELETE",
            body: JSON.stringify({
                token: token
            }),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error removing user profile image:', error);
        throw error;
    }
}
export async function changePassword(token: string, currentPassword: string, newPassword: string) {
    try {
        const response = await fetch(`${API_URL}/change-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: token,
                currentPassword: currentPassword,
                newPassword: newPassword
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        return await response.json();
    } catch (error) {
        console.error('Password change failed:', error);
        throw error;
    }
}
export async function changeUsername(
    token: string,
    newUsername: string
){
    try {
        const response = await fetch(`${API_URL}/change-username`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token,
                newUsername
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Username change failed');
        }

        return {
            success: true,
            message: data.message,
            token: data.token
        };
    } catch (error) {
        console.error('Username change failed:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Username change failed'
        };
    }
}