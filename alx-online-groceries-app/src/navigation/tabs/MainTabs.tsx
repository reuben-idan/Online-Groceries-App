import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getTabBarIcon, NAVIGATION_THEME } from '../constants';
import { HomeStackNavigator } from '../stacks/HomeStack';
import { CategoriesStackNavigator } from '../stacks/CategoriesStack';
import { CartStackNavigator } from '../stacks/CartStack';
import { FavoritesStackNavigator } from '../stacks/FavoritesStack';
import { ProfileStackNavigator } from '../stacks/ProfileStack';
import { MainTabParamList } from '../types';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) =>
          getTabBarIcon(route.name, focused, color, size),
        tabBarActiveTintColor: NAVIGATION_THEME.colors.tabBarActiveTint,
        tabBarInactiveTintColor: NAVIGATION_THEME.colors.tabBarInactiveTint,
        tabBarStyle: {
          backgroundColor: NAVIGATION_THEME.colors.tabBarBackground,
          borderTopWidth: 1,
          borderTopColor: NAVIGATION_THEME.colors.border,
          paddingTop: 8,
          paddingBottom: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 4,
          fontFamily: 'Inter-Medium',
        },
        tabBarItemStyle: {
          padding: 4,
        },
      })}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeStackNavigator} 
        options={{ title: 'Home' }}
      />
      <Tab.Screen 
        name="CategoriesTab" 
        component={CategoriesStackNavigator}
        options={{ title: 'Categories' }}
      />
      <Tab.Screen 
        name="CartTab" 
        component={CartStackNavigator}
        options={{ 
          title: 'Cart',
          // Uncomment to show badge
          // tabBarBadge: cartItemsCount > 0 ? cartItemsCount : undefined,
        }}
      />
      <Tab.Screen 
        name="FavoritesTab" 
        component={FavoritesStackNavigator}
        options={{ title: 'Favorites' }}
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileStackNavigator}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
};
