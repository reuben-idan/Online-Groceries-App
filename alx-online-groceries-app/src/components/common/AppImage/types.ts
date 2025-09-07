import {
  ImageSourcePropType,
  ImageResizeMode,
  ViewStyle,
  ImageStyle,
  NativeSyntheticEvent,
  ImageLoadEventData,
  ImageErrorEventData,
} from 'react-native';

export type ImageSource = ImageSourcePropType | string;

export type CacheType = 'default' | 'reload' | 'force-cache' | 'only-if-cached';

export interface AppImageProps {
  /**
   * The image source (remote URL or local file)
   */
  source: ImageSource;
  
  /**
   * Fallback image source if the main source fails to load
   */
  fallbackSource?: ImageSource;
  
  /**
   * Width of the image container
   */
  width?: number | string;
  
  /**
   * Height of the image container
   */
  height?: number | string;
  
  /**
   * Aspect ratio (width/height) of the image
   */
  aspectRatio?: number;
  
  /**
   * How to resize the image when the frame doesn't match the raw image dimensions
   */
  resizeMode?: ImageResizeMode;
  
  /**
   * Color of the loading indicator
   */
  loadingIndicatorColor?: string;
  
  /**
   * Size of the loading indicator
   */
  loadingIndicatorSize?: number | 'small' | 'large';
  
  /**
   * Whether to show the loading indicator
   */
  showLoadingIndicator?: boolean;
  
  /**
   * Called when an error occurs while loading the image
   */
  onError?: (error: Error) => void;
  
  /**
   * Called when the image starts loading
   */
  onLoadStart?: () => void;
  
  /**
   * Called when the image finishes loading, whether successful or not
   */
  onLoadEnd?: () => void;
  
  /**
   * Called when the image is successfully loaded and displayed
   */
  onLoadSuccess?: (event: NativeSyntheticEvent<ImageLoadEventData>) => void;
  
  /**
   * Style for the container view
   */
  containerStyle?: StyleProp<ViewStyle>;
  
  /**
   * Style for the image
   */
  imageStyle?: StyleProp<ImageStyle>;
  
  /**
   * Custom component to show while loading
   */
  placeholder?: React.ReactNode;
  
  /**
   * Custom component to show when there's an error
   */
  errorComponent?: React.ReactNode;
  
  /**
   * Fade in duration in milliseconds
   */
  fadeDuration?: number;
  
  /**
   * Whether to enable progressive loading for large images
   */
  progressiveRenderingEnabled?: boolean;
  
  /**
   * Cache control for remote images
   */
  cache?: CacheType;
  
  /**
   * Blur radius for the image
   */
  blurRadius?: number;
  
  /**
   * Style for the loading indicator container
   */
  loadingIndicatorContainerStyle?: StyleProp<ViewStyle>;
  
  /**
   * Test ID for testing purposes
   */
  testID?: string;
}
