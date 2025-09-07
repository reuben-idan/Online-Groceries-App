import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartScreen } from '../../screens/Cart/CartScreen';
import { CheckoutScreen } from '../../screens/Checkout/CheckoutScreen';
import { PaymentMethodsScreen } from '../../screens/Checkout/PaymentMethodsScreen';
import { AddPaymentMethodScreen } from '../../screens/Checkout/AddPaymentMethodScreen';
import { OrderSuccessScreen } from '../../screens/Orders/OrderSuccessScreen';
import { CartStackParamList } from '../types';

const Stack = createNativeStackNavigator<CartStackParamList>();

export const CartStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        animation: 'slide_from_right',
        headerBackTitle: 'Back',
      }}
    >
      <Stack.Screen 
        name="Cart" 
        component={CartScreen} 
        options={{
          title: 'My Cart',
          headerLargeTitle: true,
          headerLargeTitleShadowVisible: false,
        }}
      />
      <Stack.Screen 
        name="Checkout" 
        component={CheckoutScreen}
        options={{
          title: 'Checkout',
          headerBackTitle: 'Cart',
        }}
      />
      <Stack.Screen 
        name="PaymentMethods" 
        component={PaymentMethodsScreen}
        options={{
          title: 'Payment Methods',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen 
        name="AddPaymentMethod" 
        component={AddPaymentMethodScreen}
        options={{
          title: 'Add Payment Method',
          presentation: 'modal',
        }}
      />
      <Stack.Screen 
        name="OrderSuccess" 
        component={OrderSuccessScreen}
        options={{
          title: 'Order Confirmed',
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};
