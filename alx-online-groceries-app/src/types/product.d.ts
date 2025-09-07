import { ImageSourcePropType } from 'react-native';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  images: string[];
  category: string;
  tags?: string[];
  details: {
    [key: string]: string | number | boolean;
  };
  specifications?: Array<{
    name: string;
    value: string;
  }>;
}

export interface CartItem extends Omit<Product, 'images' | 'details' | 'specifications'> {
  quantity: number;
  image: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count?: number;
}

export interface Deal {
  id: string;
  title: string;
  description: string;
  image: string;
  code?: string;
  expiry?: string;
}
