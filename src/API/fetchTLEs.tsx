const API_URL = process.env.API_URL || 'http://localhost:3000';

export const fetchTLEs = async (objectDesignators: string[], tca: string) => {
  try {
    const response = await fetch(`${API_URL}/cdm-data/fetchTLEs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({
        objectDesignators,
        tca,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch TLEs: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching TLEs:', error);
    throw error;
  }
};
