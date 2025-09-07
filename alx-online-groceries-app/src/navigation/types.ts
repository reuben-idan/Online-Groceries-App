import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  // Auth Stack
  Onboarding: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  
  // Main Tabs
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  
  // Shared Screens
  ProductDetails: { productId: string; title?: string };
  Search: { query?: string };
  Checkout: { cartId?: string };
  OrderConfirmation: { orderId: string };
  NotFound: undefined;
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
  FeaturedProducts: { categoryId?: string };
  Deals: undefined;
};

export type CategoriesStackParamList = {
  Categories: undefined;
  Category: { categoryId: string; title: string };
  Subcategory: { subcategoryId: string; title: string };
};

export type CartStackParamList = {
  Cart: undefined;
  Checkout: { cartId?: string };
  PaymentMethods: undefined;
  AddPaymentMethod: undefined;
  OrderSuccess: { orderId: string };
};

export type FavoritesStackParamList = {
  Favorites: undefined;
  RecentlyViewed: undefined;
};

export type ProfileStackParamList = {
  Profile: undefined;
  Orders: undefined;
  OrderDetails: { orderId: string };
  Addresses: undefined;
  AddAddress: { addressId?: string };
  Settings: undefined;
  HelpCenter: undefined;
  About: undefined;
};

// This type allows us to access the navigation prop type
// in any component that uses useNavigation hook
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
