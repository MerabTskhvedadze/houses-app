export interface House {
  id: number;
  name: string;
  price: number;
  type: 'apartment' | 'villa' | 'house';
  area: string;
  description: string;
}
