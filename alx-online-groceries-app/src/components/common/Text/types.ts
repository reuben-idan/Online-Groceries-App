import { TextStyle, TextProps as RNTextProps, ViewStyle } from 'react-native';

export type FontWeight = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

export interface TypographyVariant extends TextStyle {
  fontFamily?: string;
  fontWeight?: FontWeight;
  fontSize: number;
  lineHeight: number;
  letterSpacing?: number;
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
}

export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    success: string;
    error: string;
    warning: string;
    info: string;
    text: {
      primary: string;
      secondary: string;
      disabled: string;
      hint: string;
    };
    background: {
      default: string;
      paper: string;
    };
    common: {
      black: string;
      white: string;
    };
    border: string;
    [key: string]: any;
  };
  typography: {
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
    [key: string]: TypographyVariant;
  };
  spacing: ((value?: number) => number) & {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    none: number;
    sm: number;
    md: number;
    lg: number;
    full: number;
  };
  shadows: {
    none: ViewStyle;
    sm: ViewStyle;
    md: ViewStyle;
    lg: ViewStyle;
    xl: ViewStyle;
  };
  [key: string]: any;
}

export type TextVariant = keyof Theme['typography'];

export interface TextProps extends RNTextProps {
  /**
   * The variant of the text
   * @default 'body1'
   */
  variant?: TextVariant;
  /**
   * The text to display
   */
  children: React.ReactNode;
  /**
   * The color of the text
   * Can be a color from the theme or a direct color value
   */
  color?: string;
  /**
   * Whether the text should be bold
   * @default false
   */
  bold?: boolean;
  /**
   * Whether the text should be italic
   * @default false
   */
  italic?: boolean;
  /**
   * Whether the text should be underlined
   * @default false
   */
  underline?: boolean;
  /**
   * Whether the text should be centered
   * @default false
   */
  center?: boolean;
  /**
   * Custom style to apply to the text
   */
  style?: TextStyle;
  /**
   * Number of lines to show before truncating with an ellipsis
   */
  numberOfLines?: number;
  /**
   * Whether the text should be selectable
   * @default false
   */
  selectable?: boolean;
  /**
   * Whether the text should be pressable
   * @default false
   */
  onPress?: () => void;
  /**
   * Test ID for testing purposes
   */
  testID?: string;
}

export const getTextVariantStyle = (variant: TextVariant, theme: Theme): TextStyle => {
  return theme.typography[variant] || theme.typography.body1;
};
