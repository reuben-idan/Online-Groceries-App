import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persist';
import { QueryClient } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
    },
  },
});

// Create a persister
const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
  key: 'REACT_QUERY_OFFLINE_CACHE',
});

export { queryClient, asyncStoragePersister };

// Mock API functions - Replace with actual API calls
export const fetchProducts = async (params = {}) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock data
  return Array(10).fill(0).map((_, i) => ({
    id: `product_${i + 1}`,
    name: `Product ${i + 1}`,
    description: `This is a sample product description for product ${i + 1}`,
    price: Math.floor(Math.random() * 100) + 10,
    originalPrice: Math.floor(Math.random() * 50) + 100,
    rating: (Math.random() * 5).toFixed(1),
    reviewCount: Math.floor(Math.random() * 1000),
    inStock: Math.random() > 0.2,
    images: [
      'https://via.placeholder.com/400x400',
      'https://via.placeholder.com/400x400/cccccc',
      'https://via.placeholder.com/400x400/999999',
    ],
    category: ['Category 1', 'Category 2', 'Category 3'][Math.floor(Math.random() * 3)],
    tags: ['New', 'Popular', 'Sale'][Math.floor(Math.random() * 3)],
  }));
};

export const fetchProductById = async (id: string) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Mock data
  return {
    id,
    name: `Product ${id.split('_')[1]}`,
    description: `Detailed description for product ${id.split('_')[1]}. This is a high-quality product with amazing features.`,
    price: Math.floor(Math.random() * 100) + 10,
    originalPrice: Math.floor(Math.random() * 50) + 100,
    rating: (Math.random() * 5).toFixed(1),
    reviewCount: Math.floor(Math.random() * 1000),
    inStock: true,
    images: [
      'https://via.placeholder.com/800x800',
      'https://via.placeholder.com/800x800/cccccc',
      'https://via.placeholder.com/800x800/999999',
    ],
    category: 'Category ' + (Math.floor(Math.random() * 3) + 1),
    tags: ['New', 'Popular', 'Sale'].slice(0, Math.floor(Math.random() * 3) + 1),
    details: {
      brand: 'Brand Name',
      weight: '500g',
      dimensions: '10 x 10 x 5 cm',
      color: 'Black',
      material: 'Plastic',
      warranty: '1 Year',
    },
    specifications: [
      { name: 'Feature 1', value: 'Value 1' },
      { name: 'Feature 2', value: 'Value 2' },
      { name: 'Feature 3', value: 'Value 3' },
    ],
  };
};

export const fetchCategories = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Mock data
  return [
    { id: '1', name: 'Fruits', icon: '🍎', count: 24 },
    { id: '2', name: 'Vegetables', icon: '🥦', count: 18 },
    { id: '3', name: 'Dairy', icon: '🥛', count: 15 },
    { id: '4', name: 'Bakery', icon: '🍞', count: 12 },
    { id: '5', name: 'Meat', icon: '🥩', count: 20 },
    { id: '6', name: 'Beverages', icon: '🥤', count: 30 },
  ];
};

export const fetchPromotions = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Mock data
  return [
    {
      id: '1',
      title: 'Special Offer',
      description: 'Get 20% off on all products',
      image: 'https://via.placeholder.com/800x400',
      code: 'SAVE20',
      expiry: '2023-12-31',
    },
    {
      id: '2',
      title: 'Free Delivery',
      description: 'Free delivery on orders over $50',
      image: 'https://via.placeholder.com/800x400/cccccc',
      code: 'FREEDEL',
      expiry: '2023-12-31',
    },
  ];
};
