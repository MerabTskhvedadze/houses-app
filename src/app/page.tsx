import Image from 'next/image';
import FeaturedHouseCard from '@/components/featuredHouseCard';

export default function Home() {
  return (
    <div>
      <FeaturedHouseCard
        house={{
          name: 'Beautiful House',
          price: 500000,
          type: 'Villa',
          area: '200 m²',
        }}
      />
    </div>
  );
}
