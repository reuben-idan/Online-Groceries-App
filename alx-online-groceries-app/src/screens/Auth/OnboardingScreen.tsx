import React, { useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, FlatList, Image, TouchableOpacity } from 'react-native';
import { Button, Text } from '../../components/common';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';

const { width } = Dimensions.get('window');

type OnboardingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;

const onboardingSlides = [
  {
    id: '1',
    title: 'Fresh Groceries Delivered',
    description: 'Get fresh groceries delivered to your doorstep in minutes',
    image: require('../../../assets/images/onboarding/slide1.png'),
  },
  {
    id: '2',
    title: 'Wide Selection',
    description: 'Choose from thousands of products across various categories',
    image: require('../../../assets/images/onboarding/slide2.png'),
  },
  {
    id: '3',
    title: 'Easy Checkout',
    description: 'Fast and secure checkout with multiple payment options',
    image: require('../../../assets/images/onboarding/slide3.png'),
  },
];

export const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const navigation = useNavigation<OnboardingScreenNavigationProp>();

  const handleNext = () => {
    if (currentIndex < onboardingSlides.length - 1) {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    } else {
      navigation.replace('Login');
    }
  };

  const handleSkip = () => {
    navigation.replace('Login');
  };

  const renderItem = ({ item }: { item: typeof onboardingSlides[0] }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <Text variant="h2" style={styles.title}>
        {item.title}
      </Text>
      <Text variant="body" style={styles.description}>
        {item.description}
      </Text>
    </View>
  );

  const renderDots = () => (
    <View style={styles.dotsContainer}>
      {onboardingSlides.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            {
              backgroundColor:
                index === currentIndex
                  ? theme.colors.primary
                  : theme.colors.gray[300],
            },
          ]}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={onboardingSlides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.footer}>
        {renderDots()}
        <Button
          variant="primary"
          onPress={handleNext}
          style={styles.button}
          label={currentIndex === onboardingSlides.length - 1 ? 'Get Started' : 'Next'}
        />
        {currentIndex < onboardingSlides.length - 1 && (
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text variant="button" style={styles.skipText}>
              Skip
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  slide: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 60,
  },
  image: {
    width: width * 0.8,
    height: width * 0.8,
    marginBottom: 40,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
    color: theme.colors.text.primary,
  },
  description: {
    textAlign: 'center',
    color: theme.colors.text.secondary,
    paddingHorizontal: 20,
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  button: {
    marginBottom: 16,
  },
  skipButton: {
    alignSelf: 'center',
  },
  skipText: {
    color: theme.colors.primary,
  },
});
