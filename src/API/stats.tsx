const API_URL = process.env.API_URL || 'http://localhost:3000';

export const cdmCount = async () => {  
    try {
        const response = await fetch(`${API_URL}/cdm-data/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch CDMs');
        }
        const data = await response.json();
        return data.length;
    } catch (error) {
        console.error('Error fetching CDMs:', error);
        throw error;
    }
};

export const closestMiss = async () => {  
    try {
        const response = await fetch(`${API_URL}/cdm-data/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch CDMs');
        }
        const data = await response.json();
        var closestMissDistance = Infinity;
        var closestMissCDM = "N/A";
        for (var cdm of data) {
            if (cdm.missDistance < closestMissDistance) {
                closestMissDistance = cdm.missDistance;
                closestMissCDM = cdm.messageId;
            }
        }
        return [closestMissDistance, closestMissCDM];
    } catch (error) {
        console.error('Error fetching CDMs:', error);
        throw error;
    }
};

export const largestCollisionProbability = async () => {  
    try {
        const response = await fetch(`${API_URL}/cdm-data/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch CDMs');
        }
        const data = await response.json();
        var largestP = 0;
        var largestP_CDM = "N/A";
        for (var cdm of data) {
            if (cdm.collisionProbability > largestP) {
                largestP = cdm.collisionProbability;
                largestP_CDM = cdm.messageId;
            }
        }
        return [largestP, largestP_CDM];
    } catch (error) {
        console.error('Error fetching CDMs:', error);
        throw error;
    }
};

export const eventCount = async () => {  
    try {
        const response = await fetch(`${API_URL}/cdm-data/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch CDMs');
        }
        const data = await response.json();
        const events = new Set(data.filter(cdm => 'event' in cdm).map(cdm => cdm.event.eventName));
        return events.size;
    } catch (error) {
        console.error('Error fetching CDMs:', error);
        throw error;
    }
};

export const objectCount = async () => {  
    try {
        const response = await fetch(`${API_URL}/cdm-data/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch CDMs');
        }
        const data = await response.json();
        const objects1 = new Set(data.filter(cdm => 'object1' in cdm).map(cdm => cdm.object1.object));
        const objects2 = new Set(data.filter(cdm => 'object2' in cdm).map(cdm => cdm.object2.object));
        return objects1.union(objects2).size;
    } catch (error) {
        console.error('Error fetching CDMs:', error);
        throw error;
    }
};
