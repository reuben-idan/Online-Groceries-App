// Image Assets
export const images = {
  // Authentication
  onboarding: require('../../../assets/onbording.png'),
  login: require('../../../assets/log in.png'),
  signup: require('../../../assets/sign up.png'),
  verification: require('../../../assets/Verification .png'),
  
  // Main Screens
  home: require('../../../assets/Home Screen.png'),
  explore: require('../../../assets/Explore.png'),
  cart: require('../../../assets/My Cart.png'),
  favorites: require('../../../assets/Favorites.png'),
  account: require('../../../assets/Account.png'),
  
  // Product Related
  productDetail: require('../../../assets/Product Detail.png'),
  beverages: require('../../../assets/Beverages.png'),
  
  // Checkout Flow
  checkout: require('../../../assets/Checkout.png'),
  checkoutCard: require('../../../assets/Checkout card.png'),
  orderAccepted: require('../../../assets/order accepted.png'),
  
  // UI Elements
  search: require('../../../assets/Search.png'),
  filters: require('../../../assets/filters.png'),
  location: require('../../../assets/select location.png'),
  error: require('../../../assets/error.png'),
  number: require('../../../assets/Number.png'),
  
  // Bottom Tab Icons
  tabIcons: {
    home: require('../../../assets/bottom bar-1.png'),
    explore: require('../../../assets/bottom bar-2.png'),
    cart: require('../../../assets/bottom bar-3.png'),
    favorite: require('../../../assets/bottom bar-4.png'),
    account: require('../../../assets/bottom bar-5.png'),
  },
  
  // Other Icons
  icons: {
    back: require('../../../assets/bottom bar-6.png'),
    close: require('../../../assets/bottom bar-7.png'),
    menu: require('../../../assets/bottom bar-8.png'),
  },
  
  // App Icons
  splash: require('../../../assets/splash Screen.png'),
};

// Export type for better type safety
export type ImageAsset = keyof typeof images;
export type TabIconAsset = keyof typeof images.tabIcons;
export type IconAsset = keyof typeof images.icons;

// Helper function to get image by key
export const getImage = (key: ImageAsset) => images[key];
export const getTabIcon = (key: TabIconAsset) => images.tabIcons[key];
export const getIcon = (key: IconAsset) => images.icons[key];

// Export all assets as default
export default {
  images,
  getImage,
  getTabIcon,
  getIcon,
};
