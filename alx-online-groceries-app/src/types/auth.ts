// User type definition
export interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  avatar: string | null;
  token: string;
  refreshToken: string;
  // Additional user properties can be added here
  address?: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  preferences?: {
    notifications: boolean;
    theme: 'light' | 'dark' | 'system';
    language: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

// Auth state type
export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// Auth context type
export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id' | 'token' | 'refreshToken'>) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<boolean>;
  resetPassword: (email: string) => Promise<boolean>;
}

// Login response type
export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

// API error response type
export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
  validationErrors?: Record<string, string[]>;
}

// Form data types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
  token: string;
}

// Auth action types for reducer (if using useReducer)
export type AuthAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  | { type: 'SET_LOADING'; payload: boolean };

// Social login providers
export type SocialProvider = 'google' | 'facebook' | 'apple';

// Auth provider configuration
export interface AuthProviderConfig {
  clientId: string;
  scopes?: string[];
  redirectUrl?: string;
}

// Auth providers configuration
export interface AuthProvidersConfig {
  google?: AuthProviderConfig;
  facebook?: AuthProviderConfig;
  apple?: {
    clientId: string;
    serviceId: string;
    redirectUri: string;
    scopes?: string[];
  };
}
