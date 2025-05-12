'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { fetchFeaturedHouses, searchHouses } from '@/services/houseServices';
import FeaturedHouseCard from '@/components/FeaturedHouseCard';
import SearchComponent from '@/components/Search';
import { House } from './types';
import Loading from '@/components/Loading';

export default function Home() {
  const [featuredHouses, setFeaturedHouses] = useState<House[]>([]);
  const [searchResults, setSearchResults] = useState<House[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadFeaturedHouses = async () => {
      setIsLoading(true);

      try {
        const houses = await fetchFeaturedHouses();
        setFeaturedHouses(houses);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading featured houses:', error);
      }
    };

    loadFeaturedHouses();
  }, []);

  const handleSearch = async (searchValue: string) => {
    setSearchValue(searchValue);

    const houses = await searchHouses(searchValue);
    setSearchResults(houses);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box display={'flex'} flexDirection={'column'} gap={2} p={2}>
      <Stack flexDirection={'row'} gap={1} alignItems={'center'}>
        <SearchComponent
          onSearch={handleSearch}
          placeholder='Search products...'
          debounceDelay={500}
        />

        <Link href='/houses'>
          <Button variant='contained' color='primary'>
            View All Houses
          </Button>
        </Link>
      </Stack>

      <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
        {!searchValue ? (
          featuredHouses.map((house) => (
            <Grid key={house.id} size={{ xs: 2, sm: 4, md: 4 }}>
              <FeaturedHouseCard house={house} />
            </Grid>
          ))
        ) : searchResults.length !== 0 ? (
          searchResults.map((house) => (
            <Grid key={house.id} size={{ xs: 2, sm: 4, md: 4 }}>
              <FeaturedHouseCard house={house} />
            </Grid>
          ))
        ) : (
          <Typography variant='h5'>
            Properties not found for "{searchValue}"
          </Typography>
        )}
      </Grid>
    </Box>
  );
}
