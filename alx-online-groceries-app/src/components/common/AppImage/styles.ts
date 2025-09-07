import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface Styles {
  container: ViewStyle;
  image: ViewStyle;
  loadingContainer: ViewStyle;
  errorContainer: ViewStyle;
  errorText: TextStyle;
}

export const styles = StyleSheet.create<Styles>({
  container: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8d7da',
    padding: 12,
  },
  errorText: {
    color: '#721c24',
    textAlign: 'center',
    fontSize: 12,
  },
});

// Default theme values
export const DEFAULT_THEME = {
  loadingIndicatorColor: '#2A9D8F',
  fadeDuration: 300,
  loadingIndicatorSize: 'small' as const,
};
