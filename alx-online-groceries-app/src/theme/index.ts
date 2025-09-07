import { Dimensions } from 'react-native';
import { DefaultTheme } from '@react-navigation/native';

// Screen dimensions
const { width, height } = Dimensions.get('window');

// Theme colors
export const colors = {
  // Primary colors
  primary: {
    50: '#E8F8F6',
    100: '#D1F1ED',
    200: '#A3E3DB',
    300: '#75D5C9',
    400: '#47C7B7',
    500: '#2A9D8F',
    600: '#207A6F',
    700: '#18574F',
    800: '#0F342F',
    900: '#071110',
  },
  // Secondary colors
  secondary: {
    50: '#E8ECEE',
    100: '#D1D9DD',
    200: '#A3B3BC',
    300: '#758D9A',
    400: '#476779',
    500: '#264653',
    600: '#1E3842',
    700: '#162A31',
    800: '#0F1C21',
    900: '#070E10',
  },
  // Accent colors
  accent: {
    50: '#FDF9ED',
    100: '#FBF3DB',
    200: '#F7E7B7',
    300: '#F3DB93',
    400: '#EFCF6F',
    500: '#E9C46A',
    600: '#E3B63E',
    700: '#D4A21E',
    800: '#A27C17',
    900: '#6F5610',
  },
  // Semantic colors
  success: '#2A9D8F',
  error: '#E76F51',
  warning: '#F4A261',
  info: '#4CC9F0',
  // Neutral colors
  neutral: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  // Background colors
  background: {
    light: '#FFFFFF',
    dark: '#111827',
  },
  // Text colors
  text: {
    light: '#1F2937',
    dark: '#F9FAFB',
  },
  // Border colors
  border: {
    light: '#E5E7EB',
    dark: '#374151',
  },
};

// Typography
export const typography = {
  fontFamily: {
    sans: 'Inter',
    serif: 'Merriweather',
    mono: 'Roboto Mono',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  letterSpacing: {
    tighter: -0.8,
    tight: -0.4,
    normal: 0,
    wide: 0.4,
    wider: 0.8,
    widest: 1.6,
  },
};

// Spacing
export const spacing = {
  '0': 0,
  '0.5': 2,
  '1': 4,
  '1.5': 6,
  '2': 8,
  '2.5': 10,
  '3': 12,
  '3.5': 14,
  '4': 16,
  '5': 20,
  '6': 24,
  '7': 28,
  '8': 32,
  '9': 36,
  '10': 40,
  '11': 44,
  '12': 48,
  '14': 56,
  '16': 64,
  '20': 80,
  '24': 96,
  '28': 112,
  '32': 128,
};

// Border radius
export const borderRadius = {
  none: 0,
  sm: 4,
  DEFAULT: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
  full: 9999,
};

// Shadows
export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2.22,
    elevation: 2,
  },
  DEFAULT: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
    elevation: 6,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 12,
  },
  '2xl': {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 16,
  },
  inner: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 2,
  },
  none: {
    shadowColor: 'transparent',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
};

// Screen dimensions
export const dimensions = {
  width,
  height,
};

// Navigation theme
export const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary[500],
    background: colors.background.light,
    card: colors.background.light,
    text: colors.text.light,
    border: colors.border.light,
    notification: colors.accent[500],
  },
};

// Dark theme
export const darkNavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary[400],
    background: colors.background.dark,
    card: colors.neutral[800],
    text: colors.text.dark,
    border: colors.border.dark,
    notification: colors.accent[400],
  },
};

// Theme type
export type ThemeColors = typeof colors;
export type ThemeTypography = typeof typography;
export type ThemeSpacing = typeof spacing;
export type ThemeBorderRadius = typeof borderRadius;
export type ThemeShadows = typeof shadows;

export interface Theme {
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
  borderRadius: ThemeBorderRadius;
  shadows: ThemeShadows;
  dimensions: typeof dimensions;
}

// Default theme
export const defaultTheme: Theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  dimensions,
};

// Export theme as default for styled-components
export const theme = defaultTheme;

export default theme;
