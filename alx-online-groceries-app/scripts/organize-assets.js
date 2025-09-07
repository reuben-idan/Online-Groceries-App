const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const mkdir = promisify(fs.mkdir);
const copyFile = promisify(fs.copyFile);
const unlink = promisify(fs.unlink);

// Define the source and destination directories
const rootDir = path.join(__dirname, '..');
const assetsDir = path.join(rootDir, 'assets');
const newAssetsDir = path.join(rootDir, 'src', 'assets');

// Mapping of file patterns to destination directories
const fileMappings = {
  // Authentication
  'onbording.png': 'images/auth/onboarding.png',
  'log in.png': 'images/auth/login.png',
  'sign up.png': 'images/auth/signup.png',
  'Verification .png': 'images/auth/verification.png',
  
  // Products
  'Beverages.png': 'images/products/beverages.png',
  
  // UI Elements
  'Search.png': 'images/ui/search.png',
  'filters.png': 'images/ui/filters.png',
  'select location.png': 'images/ui/location.png',
  'error.png': 'images/ui/error.png',
  'Number.png': 'images/ui/number.png',
  'Checkout.png': 'images/ui/checkout.png',
  'Checkout card.png': 'images/ui/checkout-card.png',
  'order accepted.png': 'images/ui/order-accepted.png',
  
  // Tab Icons
  'bottom bar-1.png': 'images/icons/tab-home.png',
  'bottom bar-2.png': 'images/icons/tab-explore.png',
  'bottom bar-3.png': 'images/icons/tab-cart.png',
  'bottom bar-4.png': 'images/icons/tab-favorites.png',
  'bottom bar-5.png': 'images/icons/tab-account.png',
  
  // Action Icons
  'bottom bar-6.png': 'images/icons/back.png',
  'bottom bar-7.png': 'images/icons/close.png',
  'bottom bar-8.png': 'images/icons/menu.png',
  
  // App Images
  'splash Screen.png': 'images/app/splash.png',
  
  // Screenshots
  'Home Screen.png': 'images/screenshots/home.png',
  'Explore.png': 'images/screenshots/explore.png',
  'My Cart.png': 'images/screenshots/cart.png',
  'Account.png': 'images/screenshots/account.png',
  'Product Detail.png': 'images/screenshots/product-detail.png',
};

async function ensureDirectoryExists(directory) {
  try {
    await mkdir(directory, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}

async function organizeAssets() {
  try {
    console.log('Starting asset organization...');
    
    // Create necessary directories
    await ensureDirectoryExists(path.join(newAssetsDir, 'images', 'auth'));
    await ensureDirectoryExists(path.join(newAssetsDir, 'images', 'products'));
    await ensureDirectoryExists(path.join(newAssetsDir, 'images', 'ui'));
    await ensureDirectoryExists(path.join(newAssetsDir, 'images', 'icons'));
    await ensureDirectoryExists(path.join(newAssetsDir, 'images', 'illustrations'));
    await ensureDirectoryExists(path.join(newAssetsDir, 'images', 'app'));
    await ensureDirectoryExists(path.join(newAssetsDir, 'images', 'screenshots'));
    
    // Read the assets directory
    const files = await readdir(assetsDir);
    
    // Process each file
    for (const file of files) {
      const sourcePath = path.join(assetsDir, file);
      const stats = await stat(sourcePath);
      
      // Skip directories and non-PNG files
      if (!stats.isFile() || !file.toLowerCase().endsWith('.png')) {
        continue;
      }
      
      // Find the destination path for this file
      const destPath = fileMappings[file];
      
      if (destPath) {
        const fullDestPath = path.join(rootDir, 'src', 'assets', destPath);
        await ensureDirectoryExists(path.dirname(fullDestPath));
        
        // Copy the file to the new location
        await copyFile(sourcePath, fullDestPath);
        console.log(`Copied: ${file} -> ${destPath}`);
        
        // Optionally, remove the original file
        // await unlink(sourcePath);
      } else {
        console.warn(`No mapping found for file: ${file}`);
      }
    }
    
    console.log('Asset organization completed successfully!');
    
  } catch (error) {
    console.error('Error organizing assets:', error);
    process.exit(1);
  }
}

// Run the script
organizeAssets();
