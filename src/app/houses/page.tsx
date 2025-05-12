'use client';
import { useState, useEffect } from 'react';
import HouseTable from '@/components/HouseTable';
import Filters from '@/components/Filters';
import { fetchHouses } from '@/services/houseServices';
import { House, HouseFilters } from '@/app/types';

export default function HousesPage() {
  const [houses, setHouses] = useState<House[]>([]);
  const [filteredHouses, setFilteredHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<HouseFilters>({
    priceRange: [0, 1000000],
    type: 'all',
    area: 'all',
  });

  useEffect(() => {
    const loadHouses = async () => {
      try {
        const data = await fetchHouses();
        setHouses(data);
        setFilteredHouses(data);
      } catch (error) {
        console.error('Error loading houses:', error);
      } finally {
        setLoading(false);
      }
    };
    loadHouses();
  }, []);

  useEffect(() => {
    const filtered = houses.filter((house) => {
      const priceMatch =
        house.price >= filters.priceRange[0] &&
        house.price <= filters.priceRange[1];
      const typeMatch = filters.type === 'all' || house.type === filters.type;
      const areaMatch = filters.area === 'all' || house.area === filters.area;
      return priceMatch && typeMatch && areaMatch;
    });
    setFilteredHouses(filtered);
  }, [filters, houses]);

  if (loading) {
    return <div>Loading houses...</div>;
  }

  return (
    <div>
      <h1>House Listings</h1>
      <Filters filters={filters} setFilters={setFilters} />
      <HouseTable houses={filteredHouses} />
    </div>
  );
}
