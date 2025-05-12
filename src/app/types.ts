export interface House {
  id: number;
  name: string;
  price: number;
  type: 'apartment' | 'villa' | 'house';
  area: string;
  description: string;
  bedrooms: number;
  size: number;
  imageUrl?: string;
}

export type HouseFilters = {
  priceRange: [number, number];
  type: 'all' | House['type'];
  area: 'all' | string;
};

export interface SearchComponentProps {
  initialValue?: string;
  placeholder?: string;
  onSearch: (searchValue: string) => void;
  debounceDelay?: number;
  showClearButton?: boolean;
}
