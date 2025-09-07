import React from 'react';
import { Text as RNText, StyleSheet, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { TextProps, TextVariant, Theme } from './types';

// Temporary theme implementation until we have the theme provider set up
const defaultTheme = {
  colors: {
    primary: '#2A9D8F',
    secondary: '#264653',
    accent: '#E9C46A',
    success: '#2A9D8F',
    error: '#E76F51',
    warning: '#F4A261',
    info: '#3A86FF',
    text: {
      primary: '#000000',
      secondary: '#6B7280',
      disabled: '#9CA3AF',
      hint: '#6B7280',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F9FAFB',
    },
    common: {
      black: '#000000',
      white: '#FFFFFF',
    },
    border: '#E5E7EB',
  },
  typography: {
    h1: { fontSize: 32, fontWeight: 'bold', lineHeight: 40 },
    h2: { fontSize: 28, fontWeight: 'bold', lineHeight: 36 },
    h3: { fontSize: 24, fontWeight: '600', lineHeight: 32 },
    h4: { fontSize: 20, fontWeight: '600', lineHeight: 28 },
    h5: { fontSize: 18, fontWeight: '600', lineHeight: 26 },
    h6: { fontSize: 16, fontWeight: '600', lineHeight: 24 },
    subtitle1: { fontSize: 16, fontWeight: '500', lineHeight: 24 },
    subtitle2: { fontSize: 14, fontWeight: '500', lineHeight: 22 },
    body1: { fontSize: 16, lineHeight: 24 },
    body2: { fontSize: 14, lineHeight: 22 },
    button: { fontSize: 14, fontWeight: '500', lineHeight: 20, textTransform: 'uppercase' },
    caption: { fontSize: 12, lineHeight: 18 },
    overline: { fontSize: 10, lineHeight: 16, textTransform: 'uppercase' },
  },
  spacing: (value: number = 1) => value * 4,
  borderRadius: {
    none: 0,
    sm: 2,
    md: 4,
    lg: 8,
    full: 9999,
  },
  shadows: {
    none: {},
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 4,
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 10,
      elevation: 6,
    },
  },
} as const;

type ThemeType = typeof defaultTheme;

// Helper function to get text variant style
const getTextVariantStyle = (variant: TextVariant, theme: ThemeType): TextStyle => {
  // Type assertion to access theme.typography with a string index
  const typography = theme.typography as Record<string, TextStyle>;
  return typography[variant] || theme.typography.body1;
};

const Text: React.FC<TextProps> = ({
  variant = 'body1',
  children,
  color,
  bold = false,
  italic = false,
  underline = false,
  center = false,
  style,
  numberOfLines,
  selectable = false,
  onPress,
  testID,
  ...rest
}) => {
  // TODO: Get theme from theme provider
  const theme = defaultTheme;
  
  // Get the base text style based on the variant
  const variantStyle = getTextVariantStyle(variant, theme);
  
  // Get the color from theme or use the provided color
  const textColor = color ? 
    (theme.colors[color as keyof typeof theme.colors] as string) || color : 
    theme.colors.text.primary;
  
  // Build the text style
  const textStyle: TextStyle = {
    ...variantStyle,
    color: textColor,
    fontWeight: bold ? 'bold' : variantStyle.fontWeight,
    fontStyle: italic ? 'italic' : 'normal',
    textDecorationLine: underline ? 'underline' : 'none',
    textAlign: center ? 'center' : 'left',
  };

  // If the text is pressable, wrap it in a TouchableOpacity
  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7} testID={testID}>
        <RNText
          style={[textStyle, style]}
          numberOfLines={numberOfLines}
          selectable={selectable}
          {...rest}
        >
          {children}
        </RNText>
      </TouchableOpacity>
    );
  }

  return (
    <RNText
      style={[textStyle, style]}
      numberOfLines={numberOfLines}
      selectable={selectable}
      testID={testID}
      {...rest}
    >
      {children}
    </RNText>
  );
};

// Create a style sheet for memoization
const styles = StyleSheet.create({
  text: {
    // Base text styles are applied through the variant styles
  },
});

// Export the component and its types
export { Text };
export type { TextProps, TextVariant, Theme } from './types';

export default Text;
