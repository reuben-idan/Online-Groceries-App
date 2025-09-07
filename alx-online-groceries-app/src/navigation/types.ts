import { NavigatorScreenParams } from '@react-navigation/native';
import { Product, Category } from '@/types/product';

export type RootStackParamList = {
  // Auth Stack
  Onboarding: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  
  // Main Tabs
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  
  // Shared Screens
  ProductDetails: { 
    productId: string; 
    title?: string;
    product?: Product; // Optional pre-fetched product data
  };
  Search: { 
    query?: string;
    categoryId?: string;
    initialFilters?: SearchFilters;
  };
  Checkout: { 
    cartId?: string;
    step?: 'shipping' | 'payment' | 'review';
  };
  OrderConfirmation: { 
    orderId: string;
    orderNumber?: string;
  };
  NotFound: undefined;
  WebView: { 
    url: string; 
    title: string;
  };
};

export type MainTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  CategoriesTab: NavigatorScreenParams<CategoriesStackParamList>;
  CartTab: NavigatorScreenParams<CartStackParamList>;
  FavoritesTab: NavigatorScreenParams<FavoritesStackParamList>;
  ProfileTab: NavigatorScreenParams<ProfileStackParamList>;
};

export type HomeStackParamList = {
  Home: undefined;
  FeaturedProducts: { 
    categoryId?: string;
    title?: string;
  };
  Deals: {
    promotionId?: string;
  };
  ProductDetails: { 
    productId: string; 
    title?: string;
  };
};

export type CategoriesStackParamList = {
  Categories: undefined;
  Category: { 
    categoryId: string; 
    title: string;
    category?: Category;
  };
  Subcategory: { 
    subcategoryId: string; 
    title: string;
    parentCategoryId?: string;
  };
  ProductList: {
    title: string;
    filters?: ProductListFilters;
    sortBy?: string;
  };
};

export type CartStackParamList = {
  Cart: {
    autoCheckout?: boolean;
  };
  Checkout: { 
    cartId?: string;
    step?: 'shipping' | 'payment' | 'review';
  };
  PaymentMethods: {
    onSelect?: (paymentMethod: PaymentMethod) => void;
  };
  AddPaymentMethod: {
    onSuccess?: (paymentMethod: PaymentMethod) => void;
  };
  OrderSuccess: { 
    orderId: string;
    orderNumber: string;
  };
};

export type FavoritesStackParamList = {
  Favorites: undefined;
  ProductDetails: { 
    productId: string; 
    title?: string;
  };
};

export type ProfileStackParamList = {
  Profile: undefined;
  Orders: {
    status?: 'all' | 'pending' | 'processing' | 'completed' | 'cancelled';
  };
  OrderDetails: { 
    orderId: string;
    orderNumber?: string;
  };
  Addresses: {
    selectMode?: boolean;
    onSelect?: (address: Address) => void;
  };
  AddAddress: { 
    addressId?: string;
    onSave?: (address: Address) => void;
  };
  Settings: undefined;
  HelpCenter: undefined;
  About: undefined;
};

// Additional type definitions
export interface SearchFilters {
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  inStock?: boolean;
  categoryIds?: string[];
  sortBy?: 'price_asc' | 'price_desc' | 'rating' | 'newest' | 'bestselling';
}

export interface ProductListFilters extends SearchFilters {
  categoryId?: string;
  tag?: string;
  onSale?: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'apple_pay' | 'google_pay';
  last4?: string;
  brand?: string;
  isDefault: boolean;
  expires?: string;
}

export interface Address {
  id: string;
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
  isDefault: boolean;
}

// This type allows us to access the navigation prop type
// in any component that uses useNavigation hook
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
