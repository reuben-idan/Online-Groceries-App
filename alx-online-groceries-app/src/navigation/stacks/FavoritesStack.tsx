import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FavoritesScreen } from '../../screens/Favorites/FavoritesScreen';
import { RecentlyViewedScreen } from '../../screens/Favorites/RecentlyViewedScreen';
import { FavoritesStackParamList } from '../types';

const Stack = createNativeStackNavigator<FavoritesStackParamList>();

export const FavoritesStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        animation: 'slide_from_right',
        headerBackTitle: 'Back',
      }}
    >
      <Stack.Screen 
        name="Favorites" 
        component={FavoritesScreen} 
        options={{
          title: 'My Favorites',
          headerLargeTitle: true,
          headerLargeTitleShadowVisible: false,
        }}
      />
      <Stack.Screen 
        name="RecentlyViewed" 
        component={RecentlyViewedScreen}
        options={{
          title: 'Recently Viewed',
          headerLargeTitle: true,
          headerLargeTitleShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};
