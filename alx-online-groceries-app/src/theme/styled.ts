import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import { useTheme } from './ThemeProvider';

// Styled View component with theme support
export const StyledView = styled(
  ({ className = '', children, ...props }) => {
    const { theme } = useTheme();
    return (
      <View className={className} {...props}>
        {children}
      </View>
    );
  },
  {
    props: {
      className: 'string',
    },
  }
);

// Styled Text component with theme support
export const StyledText = styled(
  ({ 
    className = '', 
    variant = 'body', 
    weight = 'normal',
    color = 'text',
    children, 
    ...props 
  }) => {
    const { theme } = useTheme();
    const baseClasses = 'text-base';
    
    // Handle variant classes
    const variantClasses = {
      h1: 'text-4xl font-bold',
      h2: 'text-3xl font-bold',
      h3: 'text-2xl font-semibold',
      h4: 'text-xl font-semibold',
      h5: 'text-lg font-medium',
      h6: 'text-base font-medium',
      subtitle1: 'text-lg',
      subtitle2: 'text-base font-medium',
      body1: 'text-base',
      body2: 'text-sm',
      caption: 'text-xs',
      overline: 'text-xs uppercase tracking-wider',
      button: 'text-base font-medium uppercase',
    };

    // Handle weight classes
    const weightClasses = {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    };

    // Handle color classes
    const colorClasses = {
      primary: 'text-primary-500 dark:text-primary-400',
      secondary: 'text-secondary-500 dark:text-secondary-400',
      accent: 'text-accent-500 dark:text-accent-400',
      success: 'text-success',
      error: 'text-error',
      warning: 'text-warning',
      info: 'text-info',
      text: 'text-neutral-900 dark:text-neutral-50',
      muted: 'text-neutral-500 dark:text-neutral-400',
    };

    const combinedClasses = [
      baseClasses,
      variantClasses[variant] || '',
      weightClasses[weight] || '',
      colorClasses[color] || '',
      className,
    ].join(' ').trim();

    return (
      <Text className={combinedClasses} {...props}>
        {children}
      </Text>
    );
  },
  {
    props: {
      variant: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'caption', 'overline', 'button'],
      weight: ['light', 'normal', 'medium', 'semibold', 'bold'],
      color: ['primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info', 'text', 'muted'],
      className: 'string',
    },
  }
);

// Styled TextInput component with theme support
export const StyledTextInput = styled(
  ({ 
    className = '', 
    variant = 'outlined',
    size = 'medium',
    fullWidth = false,
    error = false,
    ...props 
  }) => {
    const { theme } = useTheme();
    
    const baseClasses = 'border rounded-lg px-4 py-2 text-base';
    
    // Handle variant classes
    const variantClasses = {
      outlined: 'border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800',
      filled: 'border-transparent bg-neutral-100 dark:bg-neutral-700',
      underlined: 'border-b-2 border-neutral-300 dark:border-neutral-600 bg-transparent px-0',
    };
    
    // Handle size classes
    const sizeClasses = {
      small: 'py-1 text-sm',
      medium: 'py-2 text-base',
      large: 'py-3 text-lg',
    };
    
    // Handle error state
    const errorClasses = error ? 'border-error-500 dark:border-error-400' : '';
    
    // Handle full width
    const widthClass = fullWidth ? 'w-full' : '';
    
    const combinedClasses = [
      baseClasses,
      variantClasses[variant] || '',
      sizeClasses[size] || '',
      errorClasses,
      widthClass,
      'text-neutral-900 dark:text-white',
      'placeholder-neutral-400 dark:placeholder-neutral-500',
      'focus:border-primary-500 focus:dark:border-primary-400',
      'focus:ring-2 focus:ring-primary-200 focus:dark:ring-primary-800',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      className,
    ].join(' ').trim();
    
    return (
      <TextInput
        className={combinedClasses}
        placeholderTextColor={theme.colors.neutral[400]}
        {...props}
      />
    );
  },
  {
    props: {
      variant: ['outlined', 'filled', 'underlined'],
      size: ['small', 'medium', 'large'],
      fullWidth: 'boolean',
      error: 'boolean',
      className: 'string',
    },
  }
);

// Styled Button component with theme support
export const StyledButton = styled(
  ({
    className = '',
    variant = 'contained',
    color = 'primary',
    size = 'medium',
    fullWidth = false,
    disabled = false,
    children,
    ...props
  }) => {
    const { theme } = useTheme();
    
    const baseClasses = 'rounded-lg items-center justify-center flex-row';
    
    // Handle variant classes
    const variantClasses = {
      contained: '',
      outlined: 'border bg-transparent',
      text: 'bg-transparent',
    };
    
    // Handle color classes for contained variant
    const containedColorClasses = {
      primary: 'bg-primary-500 dark:bg-primary-600',
      secondary: 'bg-secondary-500 dark:bg-secondary-600',
      accent: 'bg-accent-500 dark:bg-accent-600',
      success: 'bg-success-500 dark:bg-success-600',
      error: 'bg-error-500 dark:bg-error-600',
      warning: 'bg-warning-500 dark:bg-warning-600',
      info: 'bg-info-500 dark:bg-info-600',
    };
    
    // Handle color classes for outlined and text variants
    const textColorClasses = {
      primary: 'text-primary-600 dark:text-primary-400',
      secondary: 'text-secondary-600 dark:text-secondary-400',
      accent: 'text-accent-600 dark:text-accent-400',
      success: 'text-success-600 dark:text-success-400',
      error: 'text-error-600 dark:text-error-400',
      warning: 'text-warning-600 dark:text-warning-400',
      info: 'text-info-600 dark:text-info-400',
    };
    
    // Handle border color for outlined variant
    const borderColorClasses = {
      primary: 'border-primary-500 dark:border-primary-400',
      secondary: 'border-secondary-500 dark:border-secondary-400',
      accent: 'border-accent-500 dark:border-accent-400',
      success: 'border-success-500 dark:border-success-400',
      error: 'border-error-500 dark:border-error-400',
      warning: 'border-warning-500 dark:border-warning-400',
      info: 'border-info-500 dark:border-info-400',
    };
    
    // Handle size classes
    const sizeClasses = {
      small: 'px-3 py-1.5',
      medium: 'px-4 py-2',
      large: 'px-6 py-3',
    };
    
    // Handle full width
    const widthClass = fullWidth ? 'w-full' : '';
    
    // Handle disabled state
    const disabledClasses = disabled ? 'opacity-50' : '';
    
    // Determine button content color
    const textColor = variant === 'contained' 
      ? 'text-white' 
      : textColorClasses[color] || textColorClasses.primary;
    
    // Build button classes based on variant
    let buttonClasses = [baseClasses, sizeClasses[size], widthClass, disabledClasses];
    
    if (variant === 'contained') {
      buttonClasses.push(containedColorClasses[color] || containedColorClasses.primary);
    } else if (variant === 'outlined') {
      buttonClasses.push(
        variantClasses.outlined,
        borderColorClasses[color] || borderColorClasses.primary,
        'bg-transparent',
        textColor
      );
    } else if (variant === 'text') {
      buttonClasses.push(
        variantClasses.text,
        textColor
      );
    }
    
    buttonClasses.push(className);
    
    const combinedClasses = buttonClasses.join(' ').trim();
    
    return (
      <TouchableOpacity
        className={combinedClasses}
        disabled={disabled}
        activeOpacity={0.8}
        {...props}
      >
        {typeof children === 'string' ? (
          <StyledText 
            className={`${textColor} ${size === 'small' ? 'text-sm' : size === 'large' ? 'text-lg' : 'text-base'}`}
            weight="medium"
          >
            {children}
          </StyledText>
        ) : (
          children
        )}
      </TouchableOpacity>
    );
  },
  {
    props: {
      variant: ['contained', 'outlined', 'text'],
      color: ['primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'],
      size: ['small', 'medium', 'large'],
      fullWidth: 'boolean',
      disabled: 'boolean',
      className: 'string',
    },
  }
);

// Styled Card component
export const StyledCard = styled(
  ({ className = '', variant = 'elevated', children, ...props }) => {
    const { theme } = useTheme();
    
    const baseClasses = 'rounded-xl overflow-hidden';
    
    // Handle variant classes
    const variantClasses = {
      elevated: 'bg-white dark:bg-neutral-800 shadow-md',
      outlined: 'border border-neutral-200 dark:border-neutral-700',
      filled: 'bg-neutral-50 dark:bg-neutral-800/50',
    };
    
    const combinedClasses = [
      baseClasses,
      variantClasses[variant] || variantClasses.elevated,
      className,
    ].join(' ').trim();
    
    return (
      <View className={combinedClasses} {...props}>
        {children}
      </View>
    );
  },
  {
    props: {
      variant: ['elevated', 'outlined', 'filled'],
      className: 'string',
    },
  }
);

// Styled Divider component
export const StyledDivider = styled(
  ({ className = '', orientation = 'horizontal', color = 'border', ...props }) => {
    const { theme } = useTheme();
    
    const baseClasses = orientation === 'horizontal' 
      ? 'h-px w-full my-2' 
      : 'w-px h-full mx-2';
    
    const colorClasses = {
      default: 'bg-neutral-200 dark:bg-neutral-700',
      primary: 'bg-primary-200 dark:bg-primary-800',
      secondary: 'bg-secondary-200 dark:bg-secondary-800',
      accent: 'bg-accent-200 dark:bg-accent-800',
      success: 'bg-success-200 dark:bg-success-800',
      error: 'bg-error-200 dark:bg-error-800',
      warning: 'bg-warning-200 dark:bg-warning-800',
      info: 'bg-info-200 dark:bg-info-800',
    };
    
    const combinedClasses = [
      baseClasses,
      colorClasses[color] || colorClasses.default,
      className,
    ].join(' ').trim();
    
    return <View className={combinedClasses} {...props} />;
  },
  {
    props: {
      orientation: ['horizontal', 'vertical'],
      color: ['default', 'primary', 'secondary', 'accent', 'success', 'error', 'warning', 'info'],
      className: 'string',
    },
  }
);

// Styled ScrollView component with theme support
export const StyledScrollView = styled(
  ({ className = '', showsVerticalScrollIndicator = true, ...props }) => {
    const { theme } = useTheme();
    
    const baseClasses = 'flex-1';
    const scrollIndicatorClasses = showsVerticalScrollIndicator 
      ? 'scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-600 scrollbar-track-transparent'
      : 'scrollbar-hide';
    
    const combinedClasses = [
      baseClasses,
      scrollIndicatorClasses,
      className,
    ].join(' ').trim();
    
    return (
      <ScrollView
        className={combinedClasses}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        showsHorizontalScrollIndicator={false}
        {...props}
      />
    );
  },
  {
    props: {
      showsVerticalScrollIndicator: 'boolean',
      className: 'string',
    },
  }
);

// Export all components
export * from './ThemeProvider';
export { default as ThemeProvider } from './ThemeProvider';
export { useTheme } from './ThemeProvider';
