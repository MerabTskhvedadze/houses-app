export interface House {
  id: number;
  name: string;
  price: number;
  type: 'apartment' | 'villa' | 'house';
  area: string;
  description: string;
}

export type HouseFilters = {
  priceRange: [number, number];
  type: 'all' | House['type'];
  area: 'all' | string;
};
