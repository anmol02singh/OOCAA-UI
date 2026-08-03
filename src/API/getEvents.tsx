const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const getEvents = async () => {
    try {
        const response = await fetch(`${API_URL}/cdm-data/getAllEvents`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
};