Pimport React, { ReactNode } from 'react';
import { Text as RNText, StyleSheet, TextStyle, TextProps as RNTextProps } from 'react-native';
import { defaultTheme as theme } from '../../../theme';

type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption' | 'button' | 'overline';
type TextWeight = 'normal' | 'medium' | 'semiBold' | 'bold' | 'extraBold';
type TextColor = 'primary' | 'secondary' | 'text' | 'error' | 'success' | 'warning' | 'info' | 'white' | 'black' | 'gray' | 'lightGray' | 'darkGray' | string;

export interface TextProps extends RNTextProps {
  variant?: TextVariant;
  weight?: TextWeight;
  color?: TextColor;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  children: ReactNode;
  style?: TextStyle | TextStyle[];
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  underline?: boolean;
  strikethrough?: boolean;
  italic?: boolean;
}

const Text: React.FC<TextProps> = ({
  variant = 'body1',
  weight = 'normal',
  color = 'text',
  align = 'auto',
  children,
  style,
  numberOfLines,
  ellipsizeMode,
  underline = false,
  strikethrough = false,
  italic = false,
  ...rest
}) => {
  const getFontSize = (): number => {
    switch (variant) {
      case 'h1': return 32;
      case 'h2': return 28;
      case 'h3': return 24;
      case 'h4': return 20;
      case 'h5': return 18;
      case 'h6': return 16;
      case 'body1': return 16;
      case 'body2': return 14;
      case 'caption': return 12;
      case 'button': return 14;
      case 'overline': return 10;
      default: return 16;
    }
  };

  const getLineHeight = (): number => {
    return getFontSize() * 1.5;
  };

  const getFontFamily = (): string => {
    switch (weight) {
      case 'normal': return 'Inter-Regular';
      case 'medium': return 'Inter-Medium';
      case 'semiBold': return 'Inter-SemiBold';
      case 'bold': return 'Inter-Bold';
      case 'extraBold': return 'Inter-ExtraBold';
      default: return 'Inter-Regular';
    }
  };

  const getTextColor = (): string => {
    if (color in theme.colors) {
      // @ts-ignore - We know the color exists in the theme
      return theme.colors[color];
    }
    return color;
  };

  const textStyles = StyleSheet.flatten([
    {
      fontSize: getFontSize(),
      lineHeight: getLineHeight(),
      fontFamily: getFontFamily(),
      color: getTextColor(),
      textAlign: align,
      textDecorationLine: underline ? 'underline' : strikethrough ? 'line-through' : 'none',
      fontStyle: italic ? 'italic' : 'normal',
      // @ts-ignore - This is a valid style
      textTransform: variant === 'button' || variant === 'overline' ? 'uppercase' : 'none',
      letterSpacing: variant === 'overline' ? 1.5 : 0,
    },
    style,
  ]);

  return (
    <RNText
      style={textStyles}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      {...rest}
    >
      {children}
    </RNText>
  );
};

export default Text;
