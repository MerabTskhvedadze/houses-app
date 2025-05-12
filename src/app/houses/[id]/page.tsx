'use client';
import { useRouter, useParams } from 'next/navigation';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { fetchHouses } from '@/services/houseServices';
import { House } from '@/app/types';
import { useEffect, useState } from 'react';

export default function HouseDetails() {
  const router = useRouter();
  const params = useParams();
  const [house, setHouse] = useState<House | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHouse = async () => {
      try {
        const houses = await fetchHouses();
        const foundHouse = houses.find((h) => h.id === Number(params.id));
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
    <div>
      <Button onClick={() => router.back()} sx={{ mb: 2 }}>
        Back to List
      </Button>

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
            Area: {house.area}
          </Typography>
          <Typography variant='body1'>{house.description}</Typography>
        </CardContent>
      </Card>
    </div>
  );
}
