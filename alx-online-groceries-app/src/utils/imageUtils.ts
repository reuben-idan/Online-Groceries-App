import { Image, ImageSourcePropType } from 'react-native';
import { getImage, getTabIcon, getIcon } from '../assets';

type ImageSource = ImageSourcePropType | string;

// Image cache to prevent reloading images
const imageCache = new Map<string, any>();

/**
 * Preloads an image into cache
 */
export const preloadImage = (source: ImageSourcePropType) => {
  // Handle different source types
  const uri = typeof source === 'number' 
    ? Image.resolveAssetSource(source).uri 
    : (source as { uri?: string }).uri;
    
  if (!uri) return Promise.resolve(false);
  
  if (imageCache.has(uri)) {
    return Promise.resolve(true);
  }
  
  return new Promise<boolean>((resolve) => {
    Image.prefetch(uri)
      .then(() => {
        imageCache.set(uri, true);
        resolve(true);
      })
      .catch(() => {
        resolve(false);
      });
  });
};

/**
 * Gets an image with error handling and placeholder support
 */
export const getSafeImage = (
  imageKey: string,
  type: 'image' | 'tabIcon' | 'icon' = 'image',
  fallback?: any
) => {
  try {
    let imageSource;
    
    switch (type) {
      case 'tabIcon':
        imageSource = getTabIcon(imageKey as any);
        break;
      case 'icon':
        imageSource = getIcon(imageKey as any);
        break;
      case 'image':
      default:
        imageSource = getImage(imageKey as any);
    }
    
    if (!imageSource) {
      console.warn(`Image not found: ${imageKey}`);
      return fallback || null;
    }
    
    return imageSource;
  } catch (error) {
    console.error(`Error loading image ${imageKey}:`, error);
    return fallback || null;
  }
};

/**
 * Preloads all app images for better performance
 */
export const preloadAppImages = async () => {
  const { images } = require('../assets');
  
  const imagePromises: Promise<boolean>[] = [];
  
  // Helper function to process nested objects
  const processObject = (obj: any) => {
    Object.values(obj).forEach((value) => {
      if (value && typeof value === 'object' && value.uri) {
        imagePromises.push(preloadImage(value));
      } else if (value && typeof value === 'object') {
        processObject(value);
      }
    });
  };
  
  // Process all images in the images object
  processObject(images);
  
  try {
    await Promise.all(imagePromises);
    console.log('All images preloaded successfully');
    return true;
  } catch (error) {
    console.error('Error preloading images:', error);
    return false;
  }
};

/**
 * Gets the dimensions of an image
 */
export const getImageDimensions = (source: any): Promise<{width: number; height: number}> => {
  return new Promise((resolve, reject) => {
    if (!source) {
      reject(new Error('Source is required'));
      return;
    }
    
    const uri = source.uri || source;
    
    Image.getSize(
      uri,
      (width, height) => {
        resolve({ width, height });
      },
      (error) => {
        console.error('Error getting image dimensions:', error);
        reject(error);
      }
    );
  });
};

/**
 * Gets an image with a specific size
 */
export const getImageWithSize = async (
  source: any,
  targetWidth: number,
  targetHeight?: number
) => {
  try {
    const { width, height } = await getImageDimensions(source);
    const aspectRatio = width / height;
    
    if (!targetHeight) {
      targetHeight = targetWidth / aspectRatio;
    }
    
    return {
      uri: source.uri || source,
      width: targetWidth,
      height: targetHeight,
      aspectRatio,
    };
  } catch (error) {
    console.error('Error getting image with size:', error);
    return source;
  }
};
