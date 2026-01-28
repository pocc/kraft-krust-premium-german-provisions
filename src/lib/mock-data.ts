export type ProductCategory = 'Liquid Bread' | 'Twisted Dough' | 'Cured Meats';
export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: number;
  image: string;
  specs: {
    label: string;
    value: string;
  }[];
  isNew?: boolean;
}
export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Edel-Pilsner Precision',
    category: 'Liquid Bread',
    description: 'A crisp, golden lager engineered for maximum refreshment using 500-year-old purity laws.',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&q=80&w=800',
    specs: [{ label: 'ABV', value: '4.9%' }, { label: 'Efficiency', value: 'High' }],
    isNew: true
  },
  {
    id: 'p2',
    name: 'Dunkel Draft 3000',
    category: 'Liquid Bread',
    description: 'Deep mahogany hues with roasted malt profiles. The heavy-duty choice for dark beer enthusiasts.',
    price: 5.25,
    image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&q=80&w=800',
    specs: [{ label: 'ABV', value: '5.5%' }, { label: 'Torque', value: 'Smooth' }]
  },
  {
    id: 'p3',
    name: 'Standard Issue Brezel',
    category: 'Twisted Dough',
    description: 'Lye-dipped and rock-salt encrusted. Aerodynamically twisted for optimal butter retention.',
    price: 3.00,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800',
    specs: [{ label: 'Weight', value: '150g' }, { label: 'Crunch', value: 'Tactile' }]
  },
  {
    id: 'p4',
    name: 'Giant Fest-Loop',
    category: 'Twisted Dough',
    description: 'Oversized dough engineering. Recommended for group deployments or extreme hunger levels.',
    price: 8.50,
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=800',
    specs: [{ label: 'Radius', value: '15cm' }, { label: 'Durability', value: '48h' }],
    isNew: true
  },
  {
    id: 'p5',
    name: 'Black Forest Salami',
    category: 'Cured Meats',
    description: 'Cold-smoked over pine wood. Dense, robust, and precision-sliced for consistent flavor delivery.',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&q=80&w=800',
    specs: [{ label: 'Curing', value: '6 Months' }, { label: 'Grade', value: 'A1' }]
  },
  {
    id: 'p6',
    name: 'Landjäger Tactical Snack',
    category: 'Cured Meats',
    description: 'Pressed, smoked, and air-dried. The ultimate portable fuel for hiking or industrial shifts.',
    price: 6.50,
    image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=800',
    specs: [{ label: 'Units', value: '2 per pack' }, { label: 'Type', value: 'Dry' }]
  }
];