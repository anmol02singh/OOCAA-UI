export interface SearchParams {
    criteria: string;
    value: string;
  }
  
  const API_URL = process.env.API_URL || 'http://localhost:3000';

  export const fetchEvents = async (searchParams, tcaRange) => {
    try {
      const response = await fetch(`${API_URL}/cdm-data/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ searchParams, tcaRange }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch CDMs');
      }
  
      const data = await response.json();
      console.log("hello", data);
      return data;
    } catch (error) {
      console.error('Error fetching CDMs:', error);
      throw error;
    }
  };
  