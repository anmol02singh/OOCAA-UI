const API_URL = process.env.API_URL || 'http://localhost:3000';

export const fetchCDMs = async (eventId: string) => {  
    try {
        const response = await fetch(`${API_URL}/cdm-data/by-event/${eventId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

    if (!response.ok) {
        throw new Error('Failed to fetch CDMs for event');
    }
    const data = await response.json();
    return data;
    } catch (error) {
        console.error('Error fetching CDMs for event:', error);
        throw error;
    }
};

export const fetchCounts = async () => {
    try {
        const response = await fetch(`${API_URL}/cdm-data/getCounts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch counts');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching counts:', error);
        throw error;
    }
}