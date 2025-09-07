import { ViewStyle, TextStyle, ImageStyle } from 'react-native';

export type ColorValue = string;

export interface ColorPalette {
  50: ColorValue;
  100: ColorValue;
  200: ColorValue;
  300: ColorValue;
  400: ColorValue;
  500: ColorValue;
  600: ColorValue;
  700: ColorValue;
  800: ColorValue;
  900: ColorValue;
}

export interface ThemeColors {
  // Primary colors
  primary: ColorValue | ColorPalette;
  secondary: ColorValue | ColorPalette;
  accent: ColorValue | ColorPalette;
  
  // Status colors
  success: ColorValue;
  error: ColorValue;
  warning: ColorValue;
  info: ColorValue;
  
  // Text colors
  text: {
    primary: ColorValue;
    secondary: ColorValue;
    disabled: ColorValue;
    hint: ColorValue;
  };
  
  // Background colors
  background: {
    default: ColorValue;
    paper: ColorValue;
  };
  
  // Common colors
  common: {
    black: ColorValue;
    white: ColorValue;
  };
  
  // Border colors
  border: ColorValue;
  
  // Add any additional colors as needed
  [key: string]: any;
}

export interface TypographyVariant extends TextStyle {
  fontFamily?: string;
  fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  fontSize: number;
  lineHeight: number;
  letterSpacing?: number;
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
}

export interface Typography {
  h1: TypographyVariant;
  h2: TypographyVariant;
  h3: TypographyVariant;
  h4: TypographyVariant;
  h5: TypographyVariant;
  h6: TypographyVariant;
  subtitle1: TypographyVariant;
  subtitle2: TypographyVariant;
  body1: TypographyVariant;
  body2: TypographyVariant;
  button: TypographyVariant;
  caption: TypographyVariant;
  overline: TypographyVariant;
  
  // Add any additional typography variants as needed
  [key: string]: TypographyVariant;
}

export interface Spacing {
  (value?: number): number;
  (topBottom: number, rightLeft: number): string;
  (top: number, right: number, bottom: number, left: number): string;
  
  // Common spacing values
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  
  // Add any additional spacing values as needed
  [key: string]: any;
}

export interface BorderRadius {
  none: number;
  sm: number;
  md: number;
  lg: number;
  full: number;
  
  // Add any additional border radius values as needed
  [key: string]: any;
}

export interface Shadows {
  none: ViewStyle;
  sm: ViewStyle;
  md: ViewStyle;
  lg: ViewStyle;
  xl: ViewStyle;
  
  // Add any additional shadow values as needed
  [key: string]: ViewStyle;
}

export interface Theme {
  colors: ThemeColors;
  typography: Typography;
  spacing: Spacing;
  borderRadius: BorderRadius;
  shadows: Shadows;
  
  // Add any additional theme properties as needed
  [key: string]: any;
}

// This is a type that can be used to extend the default theme
export type ThemeOverride = Partial<Theme>;
