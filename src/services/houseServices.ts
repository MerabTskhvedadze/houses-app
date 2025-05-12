import { House } from '@/app/types';

export async function fetchHouses(): Promise<House[]> {
  try {
    const response = await fetch('/data/houses.json');
    if (!response.ok) {
      throw new Error('Failed to fetch houses');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching houses:', error);
    return [];
  }
}
