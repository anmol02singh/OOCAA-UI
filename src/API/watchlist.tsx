import { SearchParams } from "../types.tsx";

const API_URL = process.env.API_URL || 'http://localhost:3000';

export type TcaRange = [number, number];

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

export const subscribeToCriteria = async (
    userId: string,
    searchParams?: SearchParams[],
    tcaRange?: TcaRange,
    extraFilters?: {
        missDistanceValue?: number;
        missDistanceOperator?: 'lte' | 'gte' | 'eq';
        collisionProbabilityValue?: number;
        collisionProbabilityOperator?: 'lte' | 'gte' | 'eq';
        operatorOrganization?: string;
    }
) => {
    try {
        const response = await fetch(`${API_URL}/cdm-data/subscribe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({  
                userId,
                searchParams,
                tcaRange,
                ...extraFilters,
            }),
        });
        if (!response.ok) {
            throw new Error('Failed to subscribe to criteria');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error subscribing to criteria:', error);
        throw error;
    }
};

export const deleteFilters = async (filterId: string) => {
    try {
        const response = await fetch(`${API_URL}/cdm-data/delete-filters/${filterId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (!response.ok) {
            throw new Error('Failed to delete filters');
        }
        return await response.json();
    } catch (error) {
        console.error('Error deleting filters:', error);
        throw error;
    }
}