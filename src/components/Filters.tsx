'use client';
import { House } from '@/app/types';
import {
  Checkbox,
  FormControlLabel,
  Typography,
  Slider,
  Button,
  Box,
  Stack,
} from '@mui/material';
import { useState, useEffect } from 'react';

interface FiltersProps {
  houses: House[];
  onFilterChange: (filters: {
    locations: string[];
    priceRange: [number, number];
    types: string[];
    bedrooms: number | 'any';
  }) => void;
}

export default function Filters({ houses, onFilterChange }: FiltersProps) {
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2500000]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [bedrooms, setBedrooms] = useState<number | 'any'>('any');

  // Get unique locations and property types
  const locations = [...new Set(houses.map((house) => house.area))].sort();
  const propertyTypes = [...new Set(houses.map((house) => house.type))].sort();

  useEffect(() => {
    onFilterChange({
      locations: selectedLocations,
      priceRange,
      types: selectedTypes,
      bedrooms,
    });
  }, [selectedLocations, priceRange, selectedTypes, bedrooms]);

  const handleLocationToggle = (location: string) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((l) => l !== location)
        : [...prev, location]
    );
  };

  return (
    <Box
      sx={{
        p: 2,
        bgcolor: 'background.paper',
        borderRadius: 1,
        boxShadow: 1,
      }}
    >
      {/* Location Filter */}
      <Stack spacing={2}>
        <Box>
          <Typography variant='h6' gutterBottom>
            Locations
          </Typography>
          <Box
            sx={{
              display: 'flex',
              overflowX: 'auto',
              gap: 2,
              py: 1,
            }}
          >
            {locations.map((location) => (
              <FormControlLabel
                key={location}
                control={
                  <Checkbox
                    checked={selectedLocations.includes(location)}
                    onChange={() => handleLocationToggle(location)}
                  />
                }
                label={location}
              />
            ))}
          </Box>
        </Box>
      </Stack>

      {/* Price Range Filter */}
      <Box>
        <Typography variant='h6' gutterBottom>
          Price Range (€)
        </Typography>
        <Slider
          value={priceRange}
          onChange={(_, newValue) =>
            setPriceRange(newValue as [number, number])
          }
          valueLabelDisplay='auto'
          min={0}
          max={2500000}
          step={50000}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            color: 'text.secondary',
            typography: 'caption',
          }}
        >
          <span>€{priceRange[0].toLocaleString()}</span>
          <span>€{priceRange[1].toLocaleString()}</span>
        </Box>
      </Box>

      {/* Property Type Filter */}
      <Box>
        <Typography variant='h6' gutterBottom>
          Property Types
        </Typography>
        <Stack direction='row' spacing={1} flexWrap='wrap'>
          {propertyTypes.map((type) => (
            <Button
              key={type}
              variant={selectedTypes.includes(type) ? 'contained' : 'outlined'}
              onClick={() =>
                setSelectedTypes((prev) =>
                  prev.includes(type)
                    ? prev.filter((t) => t !== type)
                    : [...prev, type]
                )
              }
            >
              {type}
            </Button>
          ))}
        </Stack>
      </Box>

      {/* Bedrooms Filter */}
      <Box>
        <Typography variant='h6' gutterBottom>
          Bedrooms
        </Typography>
        <Stack direction='row' spacing={1} flexWrap='wrap'>
          <Button
            variant={bedrooms === 'any' ? 'contained' : 'outlined'}
            onClick={() => setBedrooms('any')}
          >
            Any
          </Button>
          {[1, 2, 3, 4, 5].map((num) => (
            <Button
              key={num}
              variant={bedrooms === num ? 'contained' : 'outlined'}
              onClick={() => setBedrooms(num)}
            >
              {num}+
            </Button>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
