import { Card, CardContent, Typography, Button, Tooltip } from '@mui/material';
import { House } from '@/app/types';
import Link from 'next/link';

interface FeaturedHouseCardProps {
  house: House;
}

export default function FeaturedHouseCard({ house }: FeaturedHouseCardProps) {
  return (
    <Card>
      <CardContent>
        <Tooltip title={house.name} arrow>
          <Typography
            gutterBottom
            variant='h5'
            noWrap
            sx={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              width: '100%',
            }}
          >
            {house.name}
          </Typography>
        </Tooltip>
        <Typography variant='body2' color='text.secondary'>
          Price: €{house.price.toLocaleString()}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Type: {house.type}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Area: {house.area}
        </Typography>
        <Link href={`/houses/${house.id}`}>
          <Button size='small'>View Details</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
