import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NAVIGATION_THEME } from './constants';
import { AuthStackNavigator } from './stacks/AuthStack';
import { MainTabsNavigator } from './tabs/MainTabs';
import { RootStackParamList } from './types';

const RootStack = createNativeStackNavigator<RootStackParamList>();

// Create a custom theme that extends the default theme
const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...NAVIGATION_THEME.colors,
  },
};

export const AppNavigator = () => {
  // In a real app, you would check the user's authentication status here
  const isAuthenticated = true; // Replace with actual auth state

  return (
    <NavigationContainer theme={AppTheme}>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        {isAuthenticated ? (
          // Authenticated screens
          <>
            <RootStack.Screen name="MainTabs" component={MainTabsNavigator} />
            {/* Add modal screens here */}
          </>
        ) : (
          // Auth screens
          <RootStack.Screen 
            name="Auth" 
            component={AuthStackNavigator} 
            options={{ animationTypeForReplace: 'pop' }}
          />
        )}
        
        {/* Common screens that can be accessed from anywhere */}
        <RootStack.Group screenOptions={{ presentation: 'modal' }}>
          <RootStack.Screen name="ProductDetails" component={ProductDetailsScreen} />
          <RootStack.Screen name="Search" component={SearchScreen} />
        </RootStack.Group>
        
        <RootStack.Screen 
          name="NotFound" 
          component={NotFoundScreen} 
          options={{ title: 'Oops!' }} 
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

// Temporary placeholder components - replace with actual screens
const ProductDetailsScreen = () => null;
const SearchScreen = () => null;
const NotFoundScreen = () => null;
