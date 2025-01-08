export interface SearchParams {
    criteria: string;
    value: string;
  }
  
  export const fetchCDMs = async (searchParams, tcaRange) => {
    try {
      const response = await fetch('http://localhost:3000/cdm-data/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ searchParams, tcaRange }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch CDMs');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching CDMs:', error);
      throw error;
    }
  };
  