import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Image,
  Share,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Carousel from 'react-native-reanimated-carousel';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';

import { RootStackParamList } from '../../navigation/types';
import { Button, Text } from '@/components/common';
import { theme } from '../../../theme';
import { fetchProductById } from '@/api/client';
import { useCartStore } from '@/store/useCartStore';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IMAGE_HEIGHT = SCREEN_WIDTH * 0.8;

type ProductDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProductDetails'
>;

type RouteParams = {
  productId: string;
};

export const ProductDetailsScreen = () => {
  const navigation = useNavigation<ProductDetailsScreenNavigationProp>();
  const route = useRoute();
  const { productId } = route.params as RouteParams;
  const insets = useSafeAreaInsets();
  const [quantity, setQuantity] = useState(1);
  const carouselRef = useRef(null);
  const addToCart = useCartStore((state) => state.addItem);

  // Fetch product details
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProductById(productId),
  });

  const handleAddToCart = useCallback(() => {
    if (!product) return;
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity,
    });
  }, [product, quantity, addToCart]);

  const handleShare = useCallback(async () => {
    if (!product) return;
    
    try {
      await Share.share({
        message: `Check out ${product.name} on our app!`,
        url: product.image,
        title: product.name,
      });
    } catch (error) {
      console.error('Error sharing product:', error);
    }
  }, [product]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const renderImageItem = useCallback(
    ({ item }: { item: string }) => (
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item }}
          style={styles.productImage}
          resizeMode="contain"
        />
      </View>
    ),
    []
  );

  if (isLoading || !product) {
    return (
      <View style={styles.loadingContainer}>
        <Ionicons name="reload" size={24} color={theme.colors.primary[500]} />
        <Text style={styles.loadingText}>Loading product details...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={theme.colors.gray[900]}
          />
        </TouchableOpacity>
        <Text variant="h6" style={styles.headerTitle}>
          {product.name}
        </Text>
        <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
          <Ionicons
            name="share-social-outline"
            size={24}
            color={theme.colors.gray[900]}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Image Carousel */}
        <View style={styles.carouselContainer}>
          <Carousel
            ref={carouselRef}
            loop
            width={SCREEN_WIDTH}
            height={IMAGE_HEIGHT}
            autoPlay={false}
            data={product.images}
            renderItem={renderImageItem}
            scrollAnimationDuration={300}
          />
          <View style={styles.pagination}>
            {product.images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  {
                    backgroundColor:
                      index === 0
                        ? theme.colors.primary[500]
                        : theme.colors.gray[300],
                  },
                ]}
              />
            ))}
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.content}>
          <View style={styles.priceRow}>
            <Text variant="h4" style={styles.price}>
              ${product.price.toFixed(2)}
            </Text>
            {product.originalPrice && (
              <Text variant="body2" style={styles.originalPrice}>
                ${product.originalPrice.toFixed(2)}
              </Text>
            )}
            <View style={styles.discountBadge}>
              <Text variant="caption" style={styles.discountText}>
                {Math.round(
                  ((product.originalPrice - product.price) /
                    product.originalPrice) *
                    100
                )}
                % OFF
              </Text>
            </View>
          </View>

          <Text variant="h5" style={styles.productName}>
            {product.name}
          </Text>

          <View style={styles.ratingContainer}>
            <View style={styles.rating}>
              <Ionicons
                name="star"
                size={16}
                color={theme.colors.accent[500]}
              />
              <Text style={styles.ratingText}>
                {product.rating.toFixed(1)} ({product.reviewCount} reviews)
              </Text>
            </View>
            <View style={styles.inStockContainer}>
              <View
                style={[
                  styles.inStockDot,
                  {
                    backgroundColor: product.inStock
                      ? theme.colors.success[500]
                      : theme.colors.error[500],
                  },
                ]}
              />
              <Text style={styles.inStockText}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </Text>
            </View>
          </View>

          {/* Quantity Selector */}
          <View style={styles.quantityContainer}>
            <Text variant="subtitle1" style={styles.quantityLabel}>
              Quantity:
            </Text>
            <View style={styles.quantitySelector}>
              <TouchableOpacity
                onPress={() => setQuantity((prev) => Math.max(1, prev - 1))}
                style={styles.quantityButton}
              >
                <Ionicons
                  name="remove"
                  size={20}
                  color={theme.colors.gray[700]}
                />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                onPress={() => setQuantity((prev) => prev + 1)}
                style={styles.quantityButton}
              >
                <Ionicons
                  name="add"
                  size={20}
                  color={theme.colors.gray[700]}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Product Description */}
          <View style={styles.section}>
            <Text variant="h6" style={styles.sectionTitle}>
              Description
            </Text>
            <Text style={styles.descriptionText}>
              {product.description}
            </Text>
          </View>

          {/* Product Details */}
          <View style={styles.section}>
            <Text variant="h6" style={styles.sectionTitle}>
              Product Details
            </Text>
            <View style={styles.detailsContainer}>
              {Object.entries(product.details).map(([key, value]) => (
                <View key={key} style={styles.detailRow}>
                  <Text style={styles.detailLabel}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                  </Text>
                  <Text style={styles.detailValue}>{value}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Add to Cart Button */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <Button
          title={product.inStock ? 'Add to Cart' : 'Out of Stock'}
          onPress={handleAddToCart}
          disabled={!product.inStock}
          fullWidth
          size="large"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  loadingText: {
    marginTop: 8,
    color: theme.colors.gray[600],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
    backgroundColor: theme.colors.white,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
    color: theme.colors.gray[900],
  },
  shareButton: {
    padding: 8,
    marginRight: -8,
  },
  scrollView: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  carouselContainer: {
    backgroundColor: theme.colors.white,
    paddingBottom: 24,
  },
  imageContainer: {
    width: '100%',
    height: IMAGE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.gray[50],
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  content: {
    padding: 16,
    backgroundColor: theme.colors.white,
    marginTop: 8,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    color: theme.colors.primary[500],
    fontWeight: 'bold',
    marginRight: 8,
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: theme.colors.gray[500],
    marginRight: 12,
  },
  discountBadge: {
    backgroundColor: theme.colors.accent[100],
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    color: theme.colors.accent[800],
    fontWeight: '600',
  },
  productName: {
    color: theme.colors.gray[900],
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  ratingText: {
    marginLeft: 4,
    color: theme.colors.gray[700],
  },
  inStockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inStockDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  inStockText: {
    color: theme.colors.gray[600],
    fontSize: 12,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    padding: 12,
    backgroundColor: theme.colors.gray[50],
    borderRadius: 8,
  },
  quantityLabel: {
    color: theme.colors.gray[800],
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
  },
  quantityButton: {
    padding: 8,
  },
  quantityText: {
    width: 32,
    textAlign: 'center',
    color: theme.colors.gray[900],
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: theme.colors.gray[900],
    marginBottom: 12,
    fontWeight: '600',
  },
  descriptionText: {
    color: theme.colors.gray[700],
    lineHeight: 22,
  },
  detailsContainer: {
    backgroundColor: theme.colors.gray[50],
    borderRadius: 8,
    padding: 12,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    width: 120,
    color: theme.colors.gray[600],
  },
  detailValue: {
    flex: 1,
    color: theme.colors.gray[900],
    fontWeight: '500',
  },
  footer: {
    padding: 16,
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[200],
  },
});
