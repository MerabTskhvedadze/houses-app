import { House } from '@/app/types';
const API_URL = '/data/houses.json';

export async function fetchHouses(): Promise<House[]> {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Network response failed');
    const data: House[] = await response.json();
    return data.sort((a, b) => a.price - b.price); // Sort by price by default
  } catch (error) {
    console.error('Error fetching houses:', error);
    return [];
  }
}

export async function searchHouses(query: string): Promise<House[]> {
  const allHouses = await fetchHouses();
  const lowerQuery = query.toLowerCase();

  return allHouses.filter(
    (house) =>
      house.name.toLowerCase().includes(lowerQuery) ||
      house.area.toLowerCase().includes(lowerQuery) ||
      house.type.toLowerCase().includes(lowerQuery)
  );
}

export async function fetchFeaturedHouses(): Promise<House[]> {
  const allHouses = await fetchHouses();
  const featuredHouses = allHouses.slice(0, 14).map((house) => ({ ...house }));
  return featuredHouses;
}

export async function fetchHouseById(id: number): Promise<House | undefined> {
  const houses = await fetchHouses();
  return houses.find((house) => house.id === id);
}

export function getUniqueLocations(houses: House[]): string[] {
  const locations = new Set<string>();
  houses.forEach((house) => locations.add(house.area));
  return Array.from(locations).sort();
}
