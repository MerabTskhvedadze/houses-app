import FeaturedHouseCard from '@/components/FeaturedHouseCard';
import Link from 'next/link';
import { Button } from '@mui/material';

export default function Home() {
  return (
    <div>
      <FeaturedHouseCard
        house={{
          id: 1,
          name: 'Beautiful House',
          price: 500000,
          type: 'villa',
          area: '200 m²',
          description:
            'A luxurious villa with modern amenities and a spacious garden.',
        }}
      />
      <Link href='/houses'>
        <Button variant='contained'>See all houses</Button>
      </Link>
    </div>
  );
}
