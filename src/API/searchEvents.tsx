export interface SearchParams {
  criteria: string;
  value: string;
}

const API_URL = process.env.API_URL || "http://localhost:3000";

export const fetchEvents = async (
  searchParams?: SearchParams[],
  tcaRange?: [number, number],
  extraFilters?: {
    missDistanceValue?: number;
    missDistanceOperator?: "lte" | "gte" | "eq";
    collisionProbabilityValue?: number;
    collisionProbabilityOperator?: "lte" | "gte" | "eq";
    operatorOrganization?: string;
  }
) => {
  try {
    const response = await fetch(`${API_URL}/cdm-data/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        searchParams,
        tcaRange,
        ...extraFilters,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export const fetchLimitedEvents = async (
  searchParams?: SearchParams[],
  tcaRange?: [number, number],
  extraFilters?: {
    missDistanceValue?: number;
    missDistanceOperator?: "lte" | "gte" | "eq";
    collisionProbabilityValue?: number;
    collisionProbabilityOperator?: "lte" | "gte" | "eq";
    operatorOrganization?: string;
  }
) => {
  try {
    const response = await fetch(`${API_URL}/cdm-data/search-limited`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        searchParams,
        tcaRange,
        ...extraFilters,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};
