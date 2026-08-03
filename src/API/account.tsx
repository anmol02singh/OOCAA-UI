import { formatPhoneNumber } from "../pages/Profile/ProfileUtilities.tsx";
import { Account } from "../types.tsx";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export async function userdata(token: string) {
    try {
        const response = await fetch(`${API_URL}/userdata`, {
            method: "POST",
            body: JSON.stringify({ token: token }),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });
        if (response.status === 500) {
            window.location.href = '/login';
        } else if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        return await response.json()
            .then(json => {
                if (!json || Object.keys(json).length < 1) return json;

                let roleString = ''
                switch (json.role) {
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

                const account: Account = {
                    _id: json._id ?? '',
                    name: json.name ?? '',
                    username: json.username ?? '',
                    role: roleString ?? '',
                    roleNum: json.role ?? '',
                    email: json.email ?? '',
                    phoneNumber: json.phoneNumber ?? '',
                    profileImage: json.profileImage ?? '',
                };
                return account;
            });
    } catch (error) {
        console.error('Error obtaining role:', error);
        throw error;
    }
}

export async function login(usernameOrEmail: string, password: string) {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            body: JSON.stringify({
                usernameOrEmail: usernameOrEmail,
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
    _id?: string,
    name?: string,
    username?: string,
    role?: number,
    email?: string,
    phoneNumber?: string,
): Promise<Account[]> {
    try {
        const response = await fetch(`${API_URL}/getAccounts`, {
            method: "POST",
            body: JSON.stringify({
                token: token,
                _id: _id,
                name: name,
                username: username,
                role: role,
                email: email,
                phoneNumber: phoneNumber,
            }),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });
        if (response.status === 403) {
            window.location.href = '/';
        } else if (response.status === 500) {
            window.location.href = '/login';
        } else if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        return await response.json()
            .then(json => {
                if (!json || Object.keys(json).length < 1) return json;
                const accounts: Account[] = [];
                for(const item of Object.values(json) as Account[]){
                    let roleString = ''
                    if(item.role === undefined) continue;
                    const roleNum: number = parseFloat(item.role);
                    switch (roleNum) {
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

                    const account: Account = {
                        _id: item._id,
                        name: item.name,
                        username: item.username,
                        role: roleString,
                        roleNum: roleNum,
                        email: item.email,
                        phoneNumber: formatPhoneNumber(JSON.stringify(item.phoneNumber)).phoneNumber,
                    };
                    accounts.push(account);
                }
                return accounts;
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
        if (response.status === 500) {
            window.location.href = '/login';
        } else if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating user account:', error);
        throw error;
    }
}

export async function updateAccountsRole(
    token: string,
    usernames: string[],
    role: number,
) {
    try {
        const response = await fetch(`${API_URL}/updateAccountsRole`, {
            method: "PUT",
            body: JSON.stringify({
                token: token,
                usernames: usernames,
                role: role,
            }),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });
        if (response.status === 403) {
            window.location.href = '/';
        // } else if (response.status === 500) {
        //     window.location.href = '/login';
        } else if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating user accounts:', error);
        throw error;
    }
}

export async function deleteOwnAccount(
    token: string,
) {
    try {
        const response = await fetch(`${API_URL}/deleteOwnAccount`, {
            method: "DELETE",
            body: JSON.stringify({ token: token }),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error deleting own account:', error);
        throw error;
    }
}

export async function deleteAccounts(
    token: string,
    usernames: string[],
) {
    try {
        const response = await fetch(`${API_URL}/deleteAccounts`, {
            method: "DELETE",
            body: JSON.stringify({
                token: token,
                usernames: usernames,
            }),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });
        if (response.status === 403) {
            window.location.href = '/';
        } else if (response.status === 500) {
            window.location.href = '/login';
        } else if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error deleting user accounts:', error);
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
        if (response.status === 500) {
            window.location.href = '/login';
        } else if (!response.ok) {
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
        if (response.status === 500) {
            window.location.href = '/login';
        } else if (!response.ok) {
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