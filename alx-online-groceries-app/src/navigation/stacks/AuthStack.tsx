import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingScreen } from '../../screens/Auth/OnboardingScreen';
import { LoginScreen } from '../../screens/Auth/LoginScreen';
import { SignUpScreen } from '../../screens/Auth/SignUpScreen';
import { ForgotPasswordScreen } from '../../screens/Auth/ForgotPasswordScreen';
import { RootStackParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AuthStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen 
        name="Onboarding" 
        component={OnboardingScreen} 
        options={{
          animationTypeForReplace: 'push',
        }}
      />
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{
          headerShown: true,
          title: 'Sign In',
          headerTransparent: true,
          headerTintColor: '#000',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen 
        name="SignUp" 
        component={SignUpScreen}
        options={{
          headerShown: true,
          title: 'Create Account',
          headerTransparent: true,
          headerTintColor: '#000',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen 
        name="ForgotPassword" 
        component={ForgotPasswordScreen}
        options={{
          headerShown: true,
          title: 'Reset Password',
          headerTransparent: true,
          headerTintColor: '#000',
          headerBackTitle: 'Back',
        }}
      />
    </Stack.Navigator>
  );
};
