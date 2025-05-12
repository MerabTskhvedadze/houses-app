'use client';
import { useState, useEffect } from 'react';
import HouseTable from '@/components/HouseTable';
import Filters from '@/components/Filters';
import { fetchHouses } from '@/services/houseServices';
import { House } from '@/app/types';
import { Box, Button, Link, Stack, Typography } from '@mui/material';

export default function HousesPage() {
  const [allHouses, setAllHouses] = useState<House[]>([]);
  const [filteredHouses, setFilteredHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHouses = async () => {
      const data = await fetchHouses();
      setAllHouses(data);
      setFilteredHouses(data);
      setLoading(false);
    };
    loadHouses();
  }, []);

  const handleFilterChange = (filters: {
    locations: string[];
    priceRange: [number, number];
    types: string[];
    bedrooms: number | 'any';
  }) => {
    const filtered = allHouses.filter((house) => {
      // Location filter
      const locationMatch =
        filters.locations.length === 0 ||
        filters.locations.includes(house.area);

      // Price filter
      const priceMatch =
        house.price >= filters.priceRange[0] &&
        house.price <= filters.priceRange[1];

      // Type filter
      const typeMatch =
        filters.types.length === 0 || filters.types.includes(house.type);

      // Bedrooms filter
      const bedroomMatch =
        filters.bedrooms === 'any' || house.bedrooms >= filters.bedrooms;

      return locationMatch && priceMatch && typeMatch && bedroomMatch;
    });

    setFilteredHouses(filtered);
  };

  if (loading)
    return <div className='p-8 text-center'>Loading properties...</div>;

  return (
    <Box
      sx={{
        maxWidth: 'lg',
        margin: '0 auto',
        padding: { xs: 2, md: 3 },
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        sx={{ mb: 3 }}
      >
        <Typography variant='h4' gutterBottom>
          Greek Property Listings
        </Typography>

        <Link href='/'>
          <Button variant='contained'>Back to Home</Button>
        </Link>
      </Stack>

      {/* Content Section */}
      <Stack spacing={5}>
        <Box>
          <Filters houses={allHouses} onFilterChange={handleFilterChange} />
        </Box>

        <Box>
          <HouseTable houses={filteredHouses} />
          {filteredHouses.length === 0 && (
            <Box
              sx={{
                textAlign: 'center',
                py: 6,
                color: 'text.secondary',
              }}
            >
              No properties match your filters
            </Box>
          )}
        </Box>
      </Stack>
    </Box>
  );
}
