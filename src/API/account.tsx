import { formatPhoneNumber } from "../pages/Profile/ProfileUtilities";

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
        
        return await response.json()
            .then(json => {
                if(!json || Object.keys(json).length < 1) return json;
                
                let roleString = ''
                switch(json.role) {
                    case 0: {
                        roleString = "Admin"
                        break;
                    }
                    case 1: {
                        roleString = "Level 1 Operator"
                        break;
                    }
                    case 2: {
                        roleString = "Level 2 Operator"
                        break;
                    }
                }
                
                return {
                    name: json.name,
                    username: json.username,
                    role: roleString,
                    roleNum: json.role,
                    email: json.email,
                    phoneNumber: json.phoneNumber,
                    profileImage: json.profileImage
                }
            });
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

export async function getAccounts(
    token: string,
    name?: string,
    username?: string,
    role?: number,
    email?: string,
    phoneNumber?: string,
) {
    try {
        const response = await fetch(`${API_URL}/getAccounts`, {
            method: "POST",
            body: JSON.stringify({
                token: token,
                name: name,
                username: username,
                role: role,
                email: email,
                phoneNumber: phoneNumber,
            }),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        
        return await response.json()
            .then(json => {
                json.ForEach(account => {
                    if(!json || Object.keys(json).length < 1) return json;
                
                let roleString = ''
                switch(account.role) {
                    case 0: {
                        roleString = "Admin"
                        break;
                    }
                    case 1: {
                        roleString = "Level 1 Operator"
                        break;
                    }
                    case 2: {
                        roleString = "Level 2 Operator"
                        break;
                    }
                }
                
                return {
                    name: account.name,
                    username: account.username,
                    role: roleString,
                    roleNum: account.role,
                    email: account.email,
                    phoneNumber: formatPhoneNumber(JSON.stringify(account.phoneNumber)).phoneNumber,
                    profileImage: account.profileImage,
                }
                })
            });
    } catch (error) {
        console.error('Error obtaining role:', error);
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
