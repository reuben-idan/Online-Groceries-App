import { Ionicons, MaterialIcons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { MainTabParamList } from './types';

export const SCREEN_NAMES = {
  // Auth
  ONBOARDING: 'Onboarding',
  LOGIN: 'Login',
  SIGN_UP: 'SignUp',
  FORGOT_PASSWORD: 'ForgotPassword',
  
  // Main Tabs
  MAIN_TABS: 'MainTabs',
  HOME_TAB: 'HomeTab',
  CATEGORIES_TAB: 'CategoriesTab',
  CART_TAB: 'CartTab',
  FAVORITES_TAB: 'FavoritesTab',
  PROFILE_TAB: 'ProfileTab',
  
  // Shared Screens
  PRODUCT_DETAILS: 'ProductDetails',
  SEARCH: 'Search',
  CHECKOUT: 'Checkout',
  ORDER_CONFIRMATION: 'OrderConfirmation',
  NOT_FOUND: 'NotFound',
} as const;

export const TAB_ICONS: Record<keyof MainTabParamList, { 
  name: string; 
  type: 'ionicons' | 'material' | 'font-awesome' | 'material-community';
}> = {
  HomeTab: { name: 'home-outline', type: 'ionicons' },
  CategoriesTab: { name: 'grid', type: 'ionicons' },
  CartTab: { name: 'shopping-cart', type: 'font-awesome' },
  FavoritesTab: { name: 'heart-outline', type: 'ionicons' },
  ProfileTab: { name: 'person-outline', type: 'ionicons' },
};

export const getTabBarIcon = (routeName: keyof MainTabParamList, focused: boolean, color: string, size: number) => {
  const { name, type } = TAB_ICONS[routeName];
  const activeName = name.replace('-outline', '');
  
  switch (type) {
    case 'ionicons':
      return (
        <Ionicons 
          name={focused ? activeName : name} 
          size={size} 
          color={color} 
        />
      );
    case 'material':
      return (
        <MaterialIcons 
          name={focused ? activeName : name} 
          size={size} 
          color={color} 
        />
      );
    case 'font-awesome':
      return (
        <FontAwesome5 
          name={focused ? activeName : name} 
          size={size} 
          color={color} 
          solid={focused}
        />
      );
    case 'material-community':
      return (
        <MaterialCommunityIcons 
          name={focused ? activeName : name} 
          size={size} 
          color={color} 
        />
      );
    default:
      return null;
  }
};

export const TAB_BAR_LABELS: Record<keyof MainTabParamList, string> = {
  HomeTab: 'Home',
  CategoriesTab: 'Categories',
  CartTab: 'Cart',
  FavoritesTab: 'Favorites',
  ProfileTab: 'Profile',
};

export const NAVIGATION_THEME = {
  dark: false,
  colors: {
    primary: '#2A9D8F',
    background: '#FFFFFF',
    card: '#FFFFFF',
    text: '#2D3436',
    border: '#E0E0E0',
    notification: '#FF7675',
    // Custom colors
    tabBarActiveTint: '#2A9D8F',
    tabBarInactiveTint: '#95A5A6',
    tabBarBackground: '#FFFFFF',
    headerBackground: '#FFFFFF',
    headerTint: '#2D3436',
  },
};
