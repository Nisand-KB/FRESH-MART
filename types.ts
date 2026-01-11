
export type Language = 'en' | 'ta';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  description: string;
  unit: string;
}

export type Category = 'All' | 'Fruits' | 'Vegetables' | 'Dairy' | 'Bakery' | 'Pantry' | 'Meat';

export interface CartItem extends Product {
  quantity: number;
}

export interface CustomerDetails {
  mobile: string;
  email: string;
  address: string;
  location?: {
    lat: number;
    lng: number;
  };
}
