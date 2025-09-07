import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Image as RNImage,
  ImageProps as RNImageProps,
  View,
  ActivityIndicator,
  StyleSheet,
  ImageSourcePropType,
  StyleProp,
  ImageStyle,
  ImageResizeMode,
  ImageURISource,
  ViewStyle,
  Text,
  Platform,
  ImageLoadEventData,
  NativeSyntheticEvent,
} from 'react-native';

type ImageSource = ImageSourcePropType | string;

interface AppImageProps extends Omit<RNImageProps, 'source' | 'resizeMode'> {
  source: ImageSource;
  fallbackSource?: ImageSource;
  width?: number | string;
  height?: number | string;
  aspectRatio?: number;
  resizeMode?: ImageResizeMode;
  loadingIndicatorColor?: string;
  loadingIndicatorSize?: number | 'small' | 'large';
  showLoadingIndicator?: boolean;
  onError?: (error: any) => void;
  onLoadStart?: () => void;
  onLoadEnd?: () => void;
  onLoadSuccess?: (event: NativeSyntheticEvent<ImageLoadEventData>) => void;
  containerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  placeholder?: React.ReactNode;
  errorComponent?: React.ReactNode;
  fadeDuration?: number;
  progressiveRenderingEnabled?: boolean;
  cache?: 'default' | 'reload' | 'force-cache' | 'only-if-cached';
  blurRadius?: number;
  loadingIndicatorContainerStyle?: StyleProp<ViewStyle>;
  testID?: string;
}

const DEFAULT_LOADING_COLOR = '#2A9D8F';
const DEFAULT_FADE_DURATION = 300;

const AppImage: React.FC<AppImageProps> = ({
  source: sourceProp,
  fallbackSource: fallbackSourceProp,
  width,
  height,
  aspectRatio,
  resizeMode = 'cover',
  loadingIndicatorColor = DEFAULT_LOADING_COLOR,
  loadingIndicatorSize = 'small',
  showLoadingIndicator = true,
  style,
  containerStyle,
  imageStyle,
  placeholder,
  errorComponent,
  fadeDuration = DEFAULT_FADE_DURATION,
  progressiveRenderingEnabled = true,
  cache = 'default',
  blurRadius,
  loadingIndicatorContainerStyle,
  onError,
  onLoadStart: onLoadStartProp,
  onLoadEnd: onLoadEndProp,
  onLoadSuccess,
  testID,
  ...rest
}) => {
  const [currentSource, setCurrentSource] = useState<ImageSourcePropType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);

  // Normalize source and fallback source
  const source = useMemo<ImageSourcePropType | null>(() => {
    if (!sourceProp) return null;
    return typeof sourceProp === 'string' ? { uri: sourceProp, cache } : sourceProp;
  }, [sourceProp, cache]);

  const fallbackSource = useMemo<ImageSourcePropType | null>(() => {
    if (!fallbackSourceProp) return null;
    return typeof fallbackSourceProp === 'string' 
      ? { uri: fallbackSourceProp, cache } 
      : fallbackSourceProp;
  }, [fallbackSourceProp, cache]);

  // Handle image loading state and errors
  const processSource = useCallback(async () => {
    if (!source) {
      handleError(new Error('No image source provided'));
      return;
    }

    setIsLoading(true);
    setError(null);
    onLoadStartProp?.();

    try {
      // For remote images, we can check if they're valid
      const uri = (source as ImageURISource).uri;
      if (uri) {
        const isValid = await checkImageExists(uri);
        if (!isValid) {
          throw new Error(`Failed to load image: ${uri}`);
        }
      }
      
      setCurrentSource(source);
      // We'll set loading to false in onLoadEnd
    } catch (err) {
      handleError(err);
    }
  }, [source, onLoadStartProp]);

  // Check if image exists (for remote images)
  const checkImageExists = useCallback(async (uri: string): Promise<boolean> => {
    if (!uri) return false;
    
    if (uri.startsWith('http')) {
      try {
        const response = await fetch(uri, { method: 'HEAD' });
        return response.ok;
      } catch (err) {
        console.warn('Error checking image:', err);
        return false;
      }
    }
    
    return true; // Assume local resources exist
  }, []);

  // Handle image load errors
  const handleError = useCallback((err: any) => {
    console.error('Image failed to load:', err);
    const error = err instanceof Error ? err : new Error(String(err));
    setError(error);
    onError?.(error);
    
    // Try to use fallback if available
    if (fallbackSource && currentSource !== fallbackSource) {
      setCurrentSource(fallbackSource);
      setIsLoading(true); // Reset loading state for fallback
    }
  }, [fallbackSource, currentSource, onError]);

  // Handle image load success
  const handleLoad = useCallback((event: NativeSyntheticEvent<ImageLoadEventData>) => {
    const { width: imgWidth, height: imgHeight } = event.nativeEvent.source;
    setImageDimensions({ width: imgWidth, height: imgHeight });
    setIsLoading(false);
    onLoadSuccess?.(event);
    onLoadEndProp?.();
  }, [onLoadSuccess, onLoadEndProp]);

  // Handle image load end (success or failure)
  const handleLoadEnd = useCallback(() => {
    setIsLoading(false);
    onLoadEndProp?.();
  }, [onLoadEndProp]);

  // Process source when component mounts or source changes
  useEffect(() => {
    processSource();
    
    // Cleanup function
    return () => {
      // Cancel any ongoing image loading if needed
    };
  }, [processSource]);

  // Calculate styles
  const containerStyles = useMemo<StyleProp<ViewStyle>>(() => ({
    width,
    height,
    aspectRatio,
    ...(containerStyle as object),
  }), [width, height, aspectRatio, containerStyle]);

  const imageStyles = useMemo<StyleProp<ImageStyle>>(() => ({
    width: '100%',
    height: '100%',
    ...(imageStyle as object),
  }), [imageStyle]);

  const loadingContainerStyles = useMemo<StyleProp<ViewStyle>>(() => ({
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    ...(loadingIndicatorContainerStyle as object),
  }), [loadingIndicatorContainerStyle]);

  // Render loading indicator
  const renderLoadingIndicator = useCallback(() => {
    if (!isLoading || !showLoadingIndicator) return null;
    
    return (
      <View style={loadingContainerStyles} testID={`${testID}-loading`}>
        {placeholder || (
          <ActivityIndicator
            size={loadingIndicatorSize}
            color={loadingIndicatorColor}
            testID="image-loading-indicator"
          />
        )}
      </View>
    );
  }, [isLoading, showLoadingIndicator, loadingContainerStyles, placeholder, loadingIndicatorSize, loadingIndicatorColor, testID]);

  // Render error state
  const renderError = useCallback(() => {
    if (!error || (fallbackSource && currentSource === fallbackSource)) return null;
    
    return (
      <View style={styles.errorContainer} testID={`${testID}-error`}>
        {errorComponent || (
          <Text style={styles.errorText}>
            {error.message || 'Failed to load image'}
          </Text>
        )}
      </View>
    );
  }, [error, fallbackSource, currentSource, errorComponent, testID]);

  // If we have no source and no fallback, render nothing or placeholder
  if (!source && !fallbackSource) {
    return placeholder ? <View style={containerStyles}>{placeholder}</View> : null;
  }

  // If we have an error and no fallback or already using fallback
  if (error && (!fallbackSource || currentSource === fallbackSource)) {
    return (
      <View style={[containerStyles, styles.errorContainer]} testID={testID}>
        {errorComponent || (
          <Text style={styles.errorText}>
            {error.message || 'Failed to load image'}
          </Text>
        )}
      </View>
    );
  }

  return (
    <View style={[styles.container, containerStyles]} testID={testID}>
      {currentSource && (
        <RNImage
          source={currentSource}
          style={[styles.image, imageStyles]}
          resizeMode={resizeMode}
          onError={({ nativeEvent: { error } }) => handleError(error)}
          onLoadStart={onLoadStartProp}
          onLoad={handleLoad}
          onLoadEnd={handleLoadEnd}
          fadeDuration={fadeDuration}
          progressiveRenderingEnabled={progressiveRenderingEnabled}
          blurRadius={blurRadius}
          testID={`${testID}-image`}
          {...rest}
        />
      )}
      {renderLoadingIndicator()}
      {renderError()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8d7da',
    padding: 8,
  },
  errorText: {
    color: '#721c24',
    textAlign: 'center',
    fontSize: 12,
  },
});

export default React.memo(AppImage);
