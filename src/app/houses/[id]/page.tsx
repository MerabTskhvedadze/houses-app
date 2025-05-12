'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { House } from '@/app/types';
import { useEffect, useState } from 'react';
import { fetchHouseById } from '@/services/houseServices';

export default function HouseDetails() {
  const params = useParams();
  const [house, setHouse] = useState<House | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHouse = async () => {
      try {
        const foundHouse = await fetchHouseById(Number(params.id));
        setHouse(foundHouse || null);
      } catch (error) {
        console.error('Error loading house:', error);
      } finally {
        setLoading(false);
      }
    };
    loadHouse();
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (!house) return <div>House not found</div>;

  return (
    <Box>
      <Link href='/houses'>
        <Button sx={{ mb: 2 }}>Back to List</Button>
      </Link>

      <Card>
        <CardContent>
          <Typography variant='h4' gutterBottom>
            {house.name}
          </Typography>
          <Typography variant='h6' gutterBottom>
            Price: €{house.price.toLocaleString()}
          </Typography>
          <Typography variant='body1' gutterBottom>
            Type: {house.type}
          </Typography>
          <Typography variant='body1' gutterBottom>
            Bedrooms: {house.bedrooms}
          </Typography>
          <Typography variant='body1' gutterBottom>
            Area: {house.area}
          </Typography>
          <Typography variant='body1'>{house.description}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
