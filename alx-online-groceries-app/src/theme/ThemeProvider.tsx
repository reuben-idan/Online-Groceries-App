import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { Theme, ThemeColors, darkNavigationTheme, defaultTheme, navigationTheme } from './index';
import { ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';

type ThemeMode = 'light' | 'dark' | 'system';

type ThemeContextType = {
  theme: Theme;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  colors: ThemeColors;
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
  children: React.ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');

  // Determine the current theme based on the selected mode and system preference
  const isDark = themeMode === 'system' 
    ? systemColorScheme === 'dark' 
    : themeMode === 'dark';

  // Theme colors based on the current theme mode
  const colors = isDark 
    ? {
        ...defaultTheme.colors,
        background: {
          ...defaultTheme.colors.background,
          default: defaultTheme.colors.background.dark,
        },
        text: {
          ...defaultTheme.colors.text,
          default: defaultTheme.colors.text.dark,
        },
        border: {
          ...defaultTheme.colors.border,
          default: defaultTheme.colors.border.dark,
        },
      }
    : {
        ...defaultTheme.colors,
        background: {
          ...defaultTheme.colors.background,
          default: defaultTheme.colors.background.light,
        },
        text: {
          ...defaultTheme.colors.text,
          default: defaultTheme.colors.text.light,
        },
        border: {
          ...defaultTheme.colors.border,
          default: defaultTheme.colors.border.light,
        },
      };

  // Toggle between light and dark theme
  const toggleTheme = () => {
    setThemeMode((prevMode) => 
      prevMode === 'light' ? 'dark' : prevMode === 'dark' ? 'system' : 'light'
    );
  };

  // Create the theme object with the current colors
  const theme: Theme = {
    ...defaultTheme,
    colors,
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeMode,
        setThemeMode,
        colors,
        isDark,
        toggleTheme,
      }}
    >
      <NavigationThemeProvider
        value={isDark ? darkNavigationTheme : navigationTheme}
      >
        {children}
      </NavigationThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeProvider;
