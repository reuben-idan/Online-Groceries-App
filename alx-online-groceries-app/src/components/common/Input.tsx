import React, { useState } from 'react';
import { View, TextInput, TextInputProps, Text, StyleSheet, ViewStyle, TextStyle, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { defaultTheme as theme } from '../../../theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  showPasswordToggle?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  secureTextEntry = false,
  showPasswordToggle = false,
  ...rest
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleFocus = (e: any) => {
    setIsFocused(true);
    if (rest.onFocus) {
      rest.onFocus(e);
    }
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    if (rest.onBlur) {
      rest.onBlur(e);
    }
  };

  const getBorderColor = () => {
    if (error) return theme.colors.error;
    if (isFocused) return theme.colors.primary[500];
    return theme.colors.gray[300];
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <View 
        style={[
          styles.inputContainer, 
          { 
            borderColor: getBorderColor(),
            backgroundColor: rest.editable === false ? theme.colors.gray[100] : theme.colors.white,
          }
        ]}
      >
        {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
        <TextInput
          style={[
            styles.input,
            { 
              paddingLeft: leftIcon ? 10 : 16,
              paddingRight: (rightIcon || (showPasswordToggle && secureTextEntry)) ? 10 : 16,
              color: rest.editable === false ? theme.colors.gray[500] : theme.colors.gray[900],
            },
            inputStyle,
          ]}
          placeholderTextColor={theme.colors.gray[500]}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />
        {showPasswordToggle && secureTextEntry ? (
          <TouchableOpacity 
            onPress={togglePasswordVisibility}
            style={styles.iconContainer}
            activeOpacity={0.7}
          >
            <Ionicons 
              name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'} 
              size={20} 
              color={theme.colors.gray[500]} 
            />
          </TouchableOpacity>
        ) : rightIcon ? (
          <View style={styles.iconContainer}>{rightIcon}</View>
        ) : null}
      </View>
      {error && <Text style={[styles.error, errorStyle]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: theme.colors.gray[700],
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.white,
    height: 48,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: theme.colors.gray[900],
  },
  iconContainer: {
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: theme.colors.error,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default Input;
