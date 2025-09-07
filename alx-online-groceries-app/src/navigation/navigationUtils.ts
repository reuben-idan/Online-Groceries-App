import { CommonActions } from '@react-navigation/native';
import { RootStackParamList } from './types';

/**
 * Reset navigation to a specific screen, clearing the navigation stack
 */
export const resetToScreen = (
  navigation: any,
  screen: keyof RootStackParamList,
  params?: any
) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: screen, params }],
    })
  );
};

/**
 * Navigate to a screen with parameters
 */
export const navigate = (
  navigation: any,
  screen: keyof RootStackParamList,
  params?: any
) => {
  navigation.navigate(screen, params);
};

/**
 * Go back to the previous screen
 */
export const goBack = (navigation: any) => {
  if (navigation.canGoBack()) {
    navigation.goBack();
  }
};

/**
 * Navigate to the home screen
 */
export const navigateToHome = (navigation: any) => {
  navigation.navigate('MainTabs', {
    screen: 'HomeTab',
    params: {
      screen: 'Home',
    },
  });
};

/**
 * Navigate to the cart screen
 */
export const navigateToCart = (navigation: any) => {
  navigation.navigate('MainTabs', {
    screen: 'CartTab',
    params: {
      screen: 'Cart',
    },
  });
};

/**
 * Navigate to the product details screen
 */
export const navigateToProductDetails = (
  navigation: any,
  productId: string,
  title?: string
) => {
  navigation.navigate('ProductDetails', {
    productId,
    title,
  });
};

/**
 * Navigate to the checkout screen
 */
export const navigateToCheckout = (navigation: any, cartId?: string) => {
  navigation.navigate('Checkout', { cartId });
};

/**
 * Navigate to the order confirmation screen
 */
export const navigateToOrderConfirmation = (navigation: any, orderId: string) => {
  navigation.navigate('OrderConfirmation', { orderId });
};

/**
 * Get the active route state from navigation state
 */
export const getActiveRouteState = (state: any): any => {
  if (!state) {
    return null;
  }

  const route = state.routes[state.index];

  if (route.state) {
    return getActiveRouteState(route.state);
  }

  return route;
};
