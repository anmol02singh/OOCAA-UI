const API_URL = process.env.API_URL || 'http://localhost:3000';

export const fetchUserWatchlist = async (userId: string) => {
    try {
        const response = await fetch(`${API_URL}/cdm-data/watchlist/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch user watchlist');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user watchlist:', error);
        throw error;
    }
};

export const subsribeToEvent = async (eventId: string, userId: string) => {
    try {
        const response = await fetch(`${API_URL}/cdm-data/subscribe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ eventId, userId }),
        });
        if (!response.ok) {
            throw new Error('Failed to subscribe to event');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error subscribing to event:', error);
        throw error;
    }
};