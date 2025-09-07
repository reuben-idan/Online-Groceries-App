import * as Font from 'expo-font';

export const loadFonts = async () => {
  await Font.loadAsync({
    'Inter-Black': require('../../assets/fonts/Inter-Black.ttf'),
    'Inter-Bold': require('../../assets/fonts/Inter-Bold.ttf'),
    'Inter-ExtraBold': require('../../assets/fonts/Inter-ExtraBold.ttf'),
    'Inter-ExtraLight': require('../../assets/fonts/Inter-ExtraLight.ttf'),
    'Inter-Light': require('../../assets/fonts/Inter-Light.ttf'),
    'Inter-Medium': require('../../assets/fonts/Inter-Medium.ttf'),
    'Inter-Regular': require('../../assets/fonts/Inter-Regular.ttf'),
    'Inter-SemiBold': require('../../assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Thin': require('../../assets/fonts/Inter-Thin.ttf'),
    'Merriweather-Black': require('../../assets/fonts/Merriweather-Black.ttf'),
    'Merriweather-Bold': require('../../assets/fonts/Merriweather-Bold.ttf'),
    'Merriweather-Light': require('../../assets/fonts/Merriweather-Light.ttf'),
    'Merriweather-Regular': require('../../assets/fonts/Merriweather-Regular.ttf'),
    'RobotoMono-Bold': require('../../assets/fonts/RobotoMono-Bold.ttf'),
    'RobotoMono-Light': require('../../assets/fonts/RobotoMono-Light.ttf'),
    'RobotoMono-Medium': require('../../assets/fonts/RobotoMono-Medium.ttf'),
    'RobotoMono-Regular': require('../../assets/fonts/RobotoMono-Regular.ttf'),
    'RobotoMono-SemiBold': require('../../assets/fonts/RobotoMono-SemiBold.ttf'),
  });

  // Map the fonts to the correct font family names
  const fontFamily = {
    'Inter': {
      normal: 'Inter-Regular',
      bold: 'Inter-Bold',
      '100': 'Inter-Thin',
      '200': 'Inter-ExtraLight',
      '300': 'Inter-Light',
      '400': 'Inter-Regular',
      '500': 'Inter-Medium',
      '600': 'Inter-SemiBold',
      '700': 'Inter-Bold',
      '800': 'Inter-ExtraBold',
      '900': 'Inter-Black',
    },
    'Merriweather': {
      normal: 'Merriweather-Regular',
      bold: 'Merriweather-Bold',
      '300': 'Merriweather-Light',
      '400': 'Merriweather-Regular',
      '700': 'Merriweather-Bold',
      '900': 'Merriweather-Black',
    },
    'Roboto Mono': {
      normal: 'RobotoMono-Regular',
      bold: 'RobotoMono-Bold',
      '300': 'RobotoMono-Light',
      '400': 'RobotoMono-Regular',
      '500': 'RobotoMono-Medium',
      '600': 'RobotoMono-SemiBold',
      '700': 'RobotoMono-Bold',
    },
  };

  // Set the default font family
  (Text as any).defaultProps = (Text as any).defaultProps || {};
  (Text as any).defaultProps.style = {
    fontFamily: 'Inter',
    ...((Text as any).defaultProps?.style || {}),
  };

  // @ts-ignore
  global.fontFamily = fontFamily;

  return fontFamily;
};
