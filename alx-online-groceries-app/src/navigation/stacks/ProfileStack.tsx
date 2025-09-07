import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileScreen } from '../../screens/Profile/ProfileScreen';
import { OrdersScreen } from '../../screens/Orders/OrdersScreen';
import { OrderDetailsScreen } from '../../screens/Orders/OrderDetailsScreen';
import { AddressesScreen } from '../../screens/Profile/AddressesScreen';
import { AddAddressScreen } from '../../screens/Profile/AddAddressScreen';
import { SettingsScreen } from '../../screens/Settings/SettingsScreen';
import { HelpCenterScreen } from '../../screens/Help/HelpCenterScreen';
import { AboutScreen } from '../../screens/About/AboutScreen';
import { ProfileStackParamList } from '../types';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        animation: 'slide_from_right',
        headerBackTitle: 'Back',
      }}
    >
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          title: 'My Profile',
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="Orders" 
        component={OrdersScreen}
        options={{
          title: 'My Orders',
          headerLargeTitle: true,
          headerLargeTitleShadowVisible: false,
        }}
      />
      <Stack.Screen 
        name="OrderDetails" 
        component={OrderDetailsScreen}
        options={({ route }) => ({
          title: `Order #${route.params?.orderId?.substring(0, 8) || 'Details'}`,
        })}
      />
      <Stack.Screen 
        name="Addresses" 
        component={AddressesScreen}
        options={{
          title: 'My Addresses',
        }}
      />
      <Stack.Screen 
        name="AddAddress" 
        component={AddAddressScreen}
        options={{
          title: 'Add New Address',
          presentation: 'modal',
        }}
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          title: 'Settings',
        }}
      />
      <Stack.Screen 
        name="HelpCenter" 
        component={HelpCenterScreen}
        options={{
          title: 'Help Center',
        }}
      />
      <Stack.Screen 
        name="About" 
        component={AboutScreen}
        options={{
          title: 'About Us',
        }}
      />
    </Stack.Navigator>
  );
};
