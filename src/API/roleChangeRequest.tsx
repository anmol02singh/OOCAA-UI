import { RoleChangeRequest } from "../types";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const createRoleChangeRequest = async (token: string, creationTime: string, newRole: number) => {
    try {
        const response = await fetch(`${API_URL}/create-role-change-request`, {
            method: "POST",
            body: JSON.stringify({
                token: token,
                creationTime: creationTime,
                newRole: newRole
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        if (response.status === 500) {
            window.location.href = '/login';
        } else if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.error('Error creating role change request:', error);
        throw error;
    }
}

export const getRoleChangeRequests = async (
    token: string,
    creationTime?: string,
    username?: string,
    name?: string,
    role?: number,
    newRole?: number,
) => {
    try {
        const response = await fetch(`${API_URL}/get-role-change-requests`, {
            method: "PUT",
            body: JSON.stringify({
                token: token,                
                creationTime: creationTime,
                username: username,
                name: name,
                role: role,
                newRole: newRole,
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
                const roleChangeRequests: RoleChangeRequest[] = [];
                for (const item of Object.values(json) as RoleChangeRequest[]) {
                    let newRoleString = ''
                    if (item.newRole === undefined) continue;
                    const newRoleNum: number = parseFloat(item.newRole);
                    switch (newRoleNum) {
                        case 0: {
                            newRoleString = "Admin"
                            break;
                        }
                        case 1: {
                            newRoleString = "Level 1 Operator"
                            break;
                        }
                        case 2: {
                            newRoleString = "Level 2 Operator"
                            break;
                        }
                    }

                    const roleChangeRequest: RoleChangeRequest = {
                        _id: item._id,
                        accountId: item.accountId,
                        creationTime: item.creationTime,
                        newRole: newRoleString,
                        newRoleNum: newRoleNum,                        
                    };
                    roleChangeRequests.push(roleChangeRequest);
                }
                return roleChangeRequests;
            });
    } catch (error) {
        console.error('Error getting role change requests:', error);
        throw error;
    }
}

export const deleteRoleChangeRequest = async (token: string, _id: string) => {
    try {
        const response = await fetch(`${API_URL}/delete-role-change-request`, {
            method: "DELETE",
            body: JSON.stringify({
                token: token,
                _id: _id
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
        console.error('Error deleting role change request:', error);
        throw error;
    }
}