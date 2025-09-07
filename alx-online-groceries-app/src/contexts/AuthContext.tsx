import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { AuthContextType, User, AuthState } from '../types/auth';

// Default context value
const defaultAuthContext: AuthContextType = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  updateUser: async () => {},
  resetPassword: async () => {},
};

// Create context with default value
const AuthContext = createContext<AuthContextType>(defaultAuthContext);

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Auth provider props
type AuthProviderProps = {
  children: ReactNode;
};

// Auth provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // Load user data from secure storage on initial render
  useEffect(() => {
    const loadUser = async () => {
      try {
        // Simulate loading user data from secure storage
        const userJson = await SecureStore.getItemAsync('user');
        if (userJson) {
          const user = JSON.parse(userJson);
          setState({
            user,
            isLoading: false,
            isAuthenticated: true,
          });
        } else {
          setState(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error('Failed to load user data', error);
        setState(prev => ({ ...prev, isLoading: false }));
      }
    };

    loadUser();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // TODO: Replace with actual API call
      console.log('Logging in with:', { email, password });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const mockUser: User = {
        id: '1',
        email,
        fullName: 'John Doe',
        phone: '+1234567890',
        avatar: null,
        token: 'mock-jwt-token',
        refreshToken: 'mock-refresh-token',
      };

      // Save user data to secure storage
      await SecureStore.setItemAsync('user', JSON.stringify(mockUser));
      
      setState({
        user: mockUser,
        isLoading: false,
        isAuthenticated: true,
      });
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login Error', 'Failed to log in. Please check your credentials and try again.');
      return false;
    }
  };

  // Register function
  const register = async (userData: Omit<User, 'id' | 'token' | 'refreshToken'>): Promise<boolean> => {
    try {
      // TODO: Replace with actual API call
      console.log('Registering user:', userData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const mockUser: User = {
        id: '1',
        ...userData,
        token: 'mock-jwt-token',
        refreshToken: 'mock-refresh-token',
      };

      // Save user data to secure storage
      await SecureStore.setItemAsync('user', JSON.stringify(mockUser));
      
      setState({
        user: mockUser,
        isLoading: false,
        isAuthenticated: true,
      });
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Registration Error', 'Failed to register. Please try again.');
      return false;
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      // TODO: Call logout API if needed
      
      // Clear user data from secure storage
      await SecureStore.deleteItemAsync('user');
      
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  // Update user profile
  const updateUser = async (userData: Partial<User>): Promise<boolean> => {
    try {
      if (!state.user) return false;
      
      // TODO: Replace with actual API call
      console.log('Updating user:', userData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedUser = { ...state.user, ...userData };
      
      // Save updated user data to secure storage
      await SecureStore.setItemAsync('user', JSON.stringify(updatedUser));
      
      setState(prev => ({
        ...prev,
        user: updatedUser,
      }));
      
      return true;
    } catch (error) {
      console.error('Update user error:', error);
      Alert.alert('Update Error', 'Failed to update profile. Please try again.');
      return false;
    }
  };

  // Reset password
  const resetPassword = async (email: string): Promise<boolean> => {
    try {
      // TODO: Replace with actual API call
      console.log('Resetting password for:', email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return true;
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isLoading: state.isLoading,
        isAuthenticated: state.isAuthenticated,
        login,
        register,
        logout,
        updateUser,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Higher Order Component for protecting routes
export const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const WithAuth: React.FC<P> = (props) => {
    const { isAuthenticated, isLoading } = useAuth();

    // Show loading indicator while checking auth state
    if (isLoading) {
      return <Text>Loading...</Text>; // Replace with your loading component
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      // Using navigation directly in a component without hooks can cause issues
      // In a real app, you would use React Navigation's useNavigation hook
      // or handle redirection in the component that uses this HOC
      return <Text>Redirecting to login...</Text>;
    }

    // Render the wrapped component if authenticated
    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};
