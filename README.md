# 🛒 Online Groceries App

[![React Native](https://img.shields.io/badge/React_Native-0.73.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Expo](https://img.shields.io/badge/Expo-49.0.0-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

A modern, cross-platform mobile application for online grocery shopping, built with React Native, TypeScript, and Expo. This app provides users with a seamless shopping experience, allowing them to browse products, add items to cart, and complete purchases.

##  Features

- **Product Browsing**: Browse through a wide range of grocery items with beautiful product cards
- **Shopping Cart**: Add/remove items and manage quantities in your cart
- **User Authentication**: Secure login and registration system
- **Responsive Design**: Works on both iOS and Android devices
- **Modern UI/UX**: Built with a focus on user experience and accessibility
- **Type Safety**: Full TypeScript support for better developer experience

##  Tech Stack

- **Framework**: React Native 0.73.0
- **Language**: TypeScript 4.9.5
- **UI Components**: React Native Paper, React Native Vector Icons
- **State Management**: React Context API
- **Navigation**: React Navigation 6.x
- **Form Handling**: Formik & Yup
- **Styling**: StyleSheet, useTheme hook
- **API Client**: Axios
- **Build Tool**: Expo 49.0.0

##  Screenshots

<!-- Add your app screenshots here -->
| Home | Categories | Product Details | Cart |
|------|------------|----------------|------|
| ![Home](screenshots/home.png) | ![Categories](screenshots/categories.png) | ![Product](screenshots/product.png) | ![Cart](screenshots/cart.png) |

##  Getting Started

### Prerequisites

- Node.js 16.x or later
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Xcode (for iOS development) or Android Studio (for Android development)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/online-groceries-app.git
   cd online-groceries-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npx expo start
   ```

4. Run on iOS/Android:
   ```bash
   # For iOS
   npx expo start --ios
   
   # For Android
   npx expo start --android
   ```

##  Project Structure

```
src/
├── @types/             # Global TypeScript type definitions
├── assets/             # Static assets (images, fonts, etc.)
├── components/         # Reusable UI components
│   ├── common/         # Common components (Button, Input, etc.)
│   └── screens/        # Screen-specific components
├── constants/          # App constants and enums
├── context/            # React Context providers
├── hooks/              # Custom React hooks
├── navigation/         # Navigation configuration
├── screens/            # App screens
├── services/           # API services and data fetching
├── theme/              # Theme configuration and styling
└── utils/              # Utility functions and helpers
```

##  Theming System

The app uses a comprehensive theming system that supports:

- Light and dark mode
- Custom color palettes
- Typography scales
- Consistent spacing and sizing
- Reusable component variants

##  Development Process

### Component Architecture

We follow a modular component architecture with:

- **Atomic Design Principles**: Breaking down UI into atoms, molecules, and organisms
- **Container/Component Pattern**: Separating logic from presentation
- **Custom Hooks**: For reusable logic and state management

### State Management

- **Local State**: `useState` and `useReducer` for component-level state
- **Global State**: React Context API for app-wide state
- **Data Fetching**: Custom hooks with React Query for server state

### Code Quality

- **TypeScript**: Strict type checking for better code quality
- **ESLint & Prettier**: Consistent code style and formatting
- **Husky & lint-staged**: Pre-commit hooks for code quality

##  Documentation

- [Component Documentation](./docs/components.md)
- [API Documentation](./docs/api.md)
- [Theming Guide](./docs/theming.md)

##  Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Acknowledgments

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [React Native Paper](https://reactnativepaper.com/)

##  Contact

Your Name - [@yourtwitter](https://x.com/AdroitIdan) 

Project Link: [https://github.com/reuben-idan/Online-Groceries-App](https://github.com/reuben-idan/Online-Groceries-App)
