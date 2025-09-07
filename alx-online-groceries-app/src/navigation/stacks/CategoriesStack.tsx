import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CategoriesScreen } from '../../screens/Categories/CategoriesScreen';
import { CategoryScreen } from '../../screens/Categories/CategoryScreen';
import { SubcategoryScreen } from '../../screens/Categories/SubcategoryScreen';
import { CategoriesStackParamList } from '../types';

const Stack = createNativeStackNavigator<CategoriesStackParamList>();

export const CategoriesStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        animation: 'slide_from_right',
        headerBackTitle: 'Back',
      }}
    >
      <Stack.Screen 
        name="Categories" 
        component={CategoriesScreen} 
        options={{
          title: 'Categories',
          headerLargeTitle: true,
          headerLargeTitleShadowVisible: false,
        }}
      />
      <Stack.Screen 
        name="Category" 
        component={CategoryScreen}
        options={({ route }) => ({
          title: route.params?.title || 'Category',
        })}
      />
      <Stack.Screen 
        name="Subcategory" 
        component={SubcategoryScreen}
        options={({ route }) => ({
          title: route.params?.title || 'Products',
        })}
      />
    </Stack.Navigator>
  );
};
