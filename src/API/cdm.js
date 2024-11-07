const API_URL = process.env.API_URL || 'http://localhost:3000';

export async function fetchAllCDMData() {
    try {
        const response = await fetch(`${API_URL}/cdm-data`);
        
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching CDM data:', error);
        throw error;
    }
}
