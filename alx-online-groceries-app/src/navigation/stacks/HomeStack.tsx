import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../../screens/Home/HomeScreen';
import { FeaturedProductsScreen } from '../../screens/Home/FeaturedProductsScreen';
import { DealsScreen } from '../../screens/Home/DealsScreen';
import { HomeStackParamList } from '../types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          headerShown: true,
          headerTitle: 'Grocery App',
          // Add headerRight for search icon, etc.
        }}
      />
      <Stack.Screen 
        name="FeaturedProducts" 
        component={FeaturedProductsScreen} 
        options={{
          headerShown: true,
          title: 'Featured Products',
        }}
      />
      <Stack.Screen 
        name="Deals" 
        component={DealsScreen} 
        options={{
          headerShown: true,
          title: 'Today\'s Deals',
        }}
      />
    </Stack.Navigator>
  );
};
