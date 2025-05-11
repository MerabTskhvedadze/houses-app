import { Card, CardContent, Typography, Button } from '@mui/material';
import { House } from '@/app/types';

interface FeaturedHouseCardProps {
  house: House;
}

export default function FeaturedHouseCard({ house }: FeaturedHouseCardProps) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {house.name}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Price: €{house.price.toLocaleString()}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Type: {house.type}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Area: {house.area}
        </Typography>
        <Button size='small'>View Details</Button>
      </CardContent>
    </Card>
  );
}
