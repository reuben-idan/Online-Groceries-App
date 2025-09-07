import React, { useState, useEffect, useCallback } from 'react';
import { 
  Image as RNImage, 
  ImageProps as RNImageProps, 
  View, 
  ActivityIndicator, 
  StyleSheet, 
  ImageSourcePropType, 
  StyleProp, 
  ImageStyle,
  ViewStyle,
  ImageResizeMode
} from 'react-native';
import { StyledView, StyledText } from '../../theme/styled';
import { getSafeImage, getImageWithSize } from '../../utils/imageUtils';

type ImageSource = ImageSourcePropType | string;

interface AppImageProps extends Omit<RNImageProps, 'source' | 'resizeMode' | 'width' | 'height'> {
  source: string | ImageSource;
  fallbackSource?: ImageSource;
  width?: number;
  height?: number;
  aspectRatio?: number;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
  loadingIndicatorColor?: string;
  loadingIndicatorSize?: number | 'small' | 'large';
  showLoadingIndicator?: boolean;
  onError?: (error: any) => void;
  onLoadStart?: () => void;
  onLoadEnd?: () => void;
  onLoadSuccess?: () => void;
}

const AppImage = ({
  source,
  fallbackSource,
  width,
  height,
  aspectRatio,
  resizeMode = 'cover',
  loadingIndicatorColor = '#2A9D8F',
  loadingIndicatorSize = 'small',
  showLoadingIndicator = true,
  style,
  onError,
  onLoadStart,
  onLoadEnd,
  onLoadSuccess,
  ...rest
}: AppImageProps) => {
  const [imageSource, setImageSource] = React.useState<ImageSource | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);
  const [dimensions, setDimensions] = React.useState<{ width?: number; height?: number }>({});

  // Process the image source
  const processSource = React.useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      onLoadStart?.();

      let processedSource: ImageSource | null = null;

      // Handle string source (from assets)
      if (typeof source === 'string') {
        processedSource = getSafeImage(source, 'image', fallbackSource);
      } else {
        processedSource = source;
      }

      // If we have dimensions, process the image size
      if (processedSource && (width || height || aspectRatio)) {
        const targetWidth = typeof width === 'number' ? width : undefined;
        const targetHeight = typeof height === 'number' ? height : undefined;
        
        const sizedImage = await getImageWithSize(
          processedSource,
          targetWidth || 100, // Default width if not provided
          targetHeight
        );
        
        setDimensions({
          width: sizedImage.width,
          height: sizedImage.height,
        });
        
        processedSource = {
          uri: sizedImage.uri,
          width: sizedImage.width,
          height: sizedImage.height,
        };
      }

      setImageSource(processedSource);
      onLoadSuccess?.();
    } catch (err) {
      console.error('Error processing image source:', err);
      setError(err as Error);
      onError?.(err);
      
      // Try to use fallback if available
      if (fallbackSource) {
        setImageSource(fallbackSource);
      }
    } finally {
      setIsLoading(false);
      onLoadEnd?.();
    }
  }, [source, fallbackSource, width, height, aspectRatio, onError, onLoadStart, onLoadEnd, onLoadSuccess]);

  // Process source when component mounts or dependencies change
  React.useEffect(() => {
    processSource();
  }, [processSource]);

  // Handle image load error
  const handleError = (error: any) => {
    console.error('Image failed to load:', error);
    setError(new Error('Failed to load image'));
    onError?.(error);
    
    // Try to use fallback if available
    if (fallbackSource && imageSource !== fallbackSource) {
      setImageSource(fallbackSource);
    } else {
      setIsLoading(false);
    }
  };

  // Handle image load success
  const handleLoad = () => {
    setIsLoading(false);
    onLoadSuccess?.();
    onLoadEnd?.();
  };

  // Calculate the final style
  const imageStyle: StyleProp<ImageStyle> = [
    styles.image,
    width && { width },
    height && { height },
    aspectRatio && { aspectRatio },
    style,
  ] as StyleProp<ImageStyle>;

  // If we have an error and no fallback, show error placeholder
  if (error && !imageSource) {
    return (
      <View style={[styles.placeholder, imageStyle]}>
        <StyledText className="text-neutral-400">Image not available</StyledText>
      </View>
    );
  }

  // If we don't have a source, return null
  if (!imageSource) {
    return null;
  }

  return (
    <View style={styles.container}>
      <RNImage
        source={imageSource}
        style={imageStyle}
        resizeMode={resizeMode}
        onError={handleError}
        onLoad={handleLoad}
        {...rest}
      />
      
      {isLoading && showLoadingIndicator && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator 
            size={loadingIndicatorSize} 
            color={loadingIndicatorColor} 
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
});

export default React.memo(AppImage);
