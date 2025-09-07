import { ImageSourcePropType, ImageURISource } from 'react-native';

/**
 * Check if an image source is a local asset
 */
export const isLocalSource = (source: ImageSourcePropType): boolean => {
  if (typeof source === 'number') return true;
  
  const uri = (source as ImageURISource)?.uri;
  return !uri || uri.startsWith('file:') || uri.startsWith('content:') || uri.includes('bundle-');
};

/**
 * Get the URI from an image source
 */
export const getSourceUri = (source: ImageSourcePropType): string | undefined => {
  if (typeof source === 'number') {
    return undefined; // Local asset
  }
  
  return (source as ImageURISource)?.uri;
};

/**
 * Check if an image exists at the given URI
 */
export const checkImageExists = async (uri: string): Promise<boolean> => {
  if (!uri) return false;
  
  // For local assets, assume they exist
  if (uri.startsWith('file:') || uri.startsWith('content:') || !uri.startsWith('http')) {
    return true;
  }
  
  try {
    const response = await fetch(uri, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.warn('Error checking image:', error);
    return false;
  }
};

/**
 * Get appropriate cache headers based on cache type
 */
export const getCacheHeaders = (cache: 'default' | 'reload' | 'force-cache' | 'only-if-cached' = 'default') => {
  switch (cache) {
    case 'reload':
      return { 'Cache-Control': 'no-cache' };
    case 'force-cache':
      return { 'Cache-Control': 'only-if-cached' };
    case 'only-if-cached':
      return { 'Cache-Control': 'only-if-cached' };
    default:
      return {};
  }
};

/**
 * Get the image dimensions from the source
 */
export const getImageDimensions = async (
  source: ImageSourcePropType
): Promise<{ width: number; height: number } | null> => {
  if (typeof source === 'number') {
    // For local assets, we can use Image.getSize
    return new Promise((resolve) => {
      const { width, height } = require('react-native/Libraries/Image/resolveAssetSource')(source);
      resolve({ width, height });
    });
  }
  
  const uri = (source as ImageURISource)?.uri;
  if (!uri) return null;
  
  return new Promise((resolve) => {
    require('react-native').Image.getSize(
      uri,
      (width, height) => resolve({ width, height }),
      () => resolve(null)
    );
  });
};
