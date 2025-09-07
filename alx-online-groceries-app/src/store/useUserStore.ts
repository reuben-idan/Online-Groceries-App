import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
};

type Address = {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  isDefault: boolean;
};

type Order = {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  total: number;
  deliveryAddress: Address;
  paymentMethod: string;
};

type UserState = {
  user: User | null;
  addresses: Address[];
  orders: Order[];
  favorites: string[]; // Array of product IDs
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, updates: Partial<Address>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  addToFavorites: (productId: string) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  addOrder: (order: Omit<Order, 'id' | 'date' | 'status'>) => string;
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      addresses: [],
      orders: [],
      favorites: [],
      isAuthenticated: false,
      
      login: (userData) => 
        set({ user: userData, isAuthenticated: true }),
      
      logout: () => 
        set({ user: null, isAuthenticated: false }),
      
      addAddress: (address) =>
        set((state) => ({
          addresses: [
            ...state.addresses,
            {
              ...address,
              id: `addr_${Date.now()}`,
              isDefault: state.addresses.length === 0 || address.isDefault,
            },
          ],
        })),
      
      updateAddress: (id, updates) =>
        set((state) => ({
          addresses: state.addresses.map((addr) =>
            addr.id === id ? { ...addr, ...updates } : addr
          ),
        })),
      
      removeAddress: (id) =>
        set((state) => ({
          addresses: state.addresses.filter((addr) => addr.id !== id),
        })),
      
      setDefaultAddress: (id) =>
        set((state) => ({
          addresses: state.addresses.map((addr) => ({
            ...addr,
            isDefault: addr.id === id,
          })),
        })),
      
      addToFavorites: (productId) =>
        set((state) => ({
          favorites: [...new Set([...state.favorites, productId])],
        })),
      
      removeFromFavorites: (productId) =>
        set((state) => ({
          favorites: state.favorites.filter((id) => id !== productId),
        })),
      
      isFavorite: (productId) => get().favorites.includes(productId),
      
      addOrder: (order) => {
        const newOrder = {
          ...order,
          id: `order_${Date.now()}`,
          date: new Date().toISOString(),
          status: 'pending' as const,
        };
        
        set((state) => ({
          orders: [newOrder, ...state.orders],
        }));
        
        return newOrder.id;
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        addresses: state.addresses,
        orders: state.orders,
        favorites: state.favorites,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Selectors
export const useUser = () => useUserStore((state) => state.user);
export const useAddresses = () => useUserStore((state) => state.addresses);
export const useDefaultAddress = () => 
  useUserStore((state) => state.addresses.find((addr) => addr.isDefault));
export const useOrders = () => useUserStore((state) => state.orders);
export const useFavorites = () => useUserStore((state) => state.favorites);
export const useIsFavorite = (productId: string) => 
  useUserStore((state) => state.favorites.includes(productId));
