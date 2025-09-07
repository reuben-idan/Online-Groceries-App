import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle, TouchableOpacityProps } from 'react-native';
import { defaultTheme as theme } from '../../../theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text' | 'danger';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  style,
  textStyle,
  ...rest
}) => {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.borderRadius.md,
      paddingHorizontal: size === 'small' ? 12 : size === 'large' ? 24 : 16,
      paddingVertical: size === 'small' ? 8 : size === 'large' ? 16 : 12,
      opacity: disabled ? 0.6 : 1,
      width: fullWidth ? '100%' : undefined,
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: theme.colors.primary[500],
        };
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: theme.colors.secondary[500],
        };
      case 'outline':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: theme.colors.primary[500],
        };
      case 'danger':
        return {
          ...baseStyle,
          backgroundColor: theme.colors.error,
        };
      case 'text':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          paddingHorizontal: 8,
          paddingVertical: 8,
        };
      default:
        return baseStyle;
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      textAlign: 'center',
      fontWeight: '600',
      fontSize: size === 'small' ? 14 : size === 'large' ? 18 : 16,
    };

    switch (variant) {
      case 'primary':
      case 'danger':
        return {
          ...baseStyle,
          color: theme.colors.white,
        };
      case 'secondary':
        return {
          ...baseStyle,
          color: theme.colors.white,
        };
      case 'outline':
      case 'text':
        return {
          ...baseStyle,
          color: theme.colors.primary[500],
        };
      default:
        return baseStyle;
    }
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator 
          size={size === 'small' ? 'small' : 'large'} 
          color={variant === 'primary' || variant === 'danger' ? theme.colors.white : theme.colors.primary[500]} 
        />
      ) : (
        <>
          {leftIcon && <>{leftIcon} </>}
          <Text style={[getTextStyle(), textStyle]}>{title}</Text>
          {rightIcon && <>{' '}{rightIcon}</>}
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;
