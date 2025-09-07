import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import { Button, Text } from '@/components/common';
import { theme } from '../../../theme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

type ProductDetailScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetails'>;
type ProductDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProductDetails'>;

interface ProductDetailScreenProps {
  navigation: ProductDetailScreenNavigationProp;
  route: ProductDetailScreenRouteProp;
}

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ navigation }) => {
  const route = useRoute<ProductDetailScreenRouteProp>();
  const { productId } = route.params;
  
  // Mock product data - replace with actual data from your API
  const product = {
    id: productId,
    name: 'Organic Red Apples',
    price: 2.99,
    unit: 'lb',
    rating: 4.5,
    reviewCount: 128,
    description: 'Fresh, crisp and delicious organic red apples. Grown locally with sustainable farming practices. Perfect for snacking, baking, or making fresh juice.',
    images: [
      'https://via.placeholder.com/400x400?text=Apple+1',
      'https://via.placeholder.com/400x400?text=Apple+2',
      'https://via.placeholder.com/400x400?text=Apple+3',
    ],
    category: 'Fruits',
    origin: 'Local Farm',
    stock: 10,
    weight: '1 lb',
    organic: true,
    benefits: [
      'Rich in fiber and antioxidants',
      'Supports heart health',
      'Helps with digestion',
      'Low in calories',
    ],
  };

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [favorite, setFavorite] = useState(false);

  const handleAddToCart = () => {
    // Add to cart logic
    console.log(`Added ${quantity} ${product.name} to cart`);
  };

  const handleBuyNow = () => {
    // Buy now logic
    console.log(`Buying ${quantity} ${product.name}`);
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Product Images */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: product.images[selectedImage] }} 
            style={styles.mainImage} 
            resizeMode="contain"
          />
          <TouchableOpacity 
            style={styles.favoriteButton}
            onPress={() => setFavorite(!favorite)}
          >
            <Ionicons 
              name={favorite ? 'heart' : 'heart-outline'} 
              size={24} 
              color={favorite ? theme.colors.error : theme.colors.gray[700]} 
            />
          </TouchableOpacity>
          
          <View style={styles.thumbnailContainer}>
            {product.images.map((image, index) => (
              <TouchableOpacity 
                key={index} 
                style={[
                  styles.thumbnail,
                  index === selectedImage && styles.selectedThumbnail
                ]}
                onPress={() => setSelectedImage(index)}
              >
                <Image 
                  source={{ uri: image }} 
                  style={styles.thumbnailImage} 
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.infoContainer}>
          <View style={styles.headerRow}>
            <Text variant="h4" style={styles.productName}>{product.name}</Text>
            {product.organic && (
              <View style={styles.organicBadge}>
                <MaterialIcons name="eco" size={16} color={theme.colors.success} />
                <Text variant="caption" style={styles.organicText}>Organic</Text>
              </View>
            )}
          </View>
          
          <View style={styles.ratingContainer}>
            <View style={styles.ratingStars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons 
                  key={star} 
                  name={star <= Math.floor(product.rating) ? 'star' : 'star-outline'} 
                  size={16} 
                  color={theme.colors.accent[500]} 
                />
              ))}
            </View>
            <Text variant="caption" style={styles.ratingText}>
              {product.rating} ({product.reviewCount} reviews)
            </Text>
          </View>
          
          <Text variant="h4" style={styles.price}>
            ${product.price.toFixed(2)}
            <Text variant="body2" style={styles.unit}> / {product.unit}</Text>
          </Text>
          
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Ionicons name="leaf-outline" size={16} color={theme.colors.gray[600]} />
              <Text variant="body2" style={styles.metaText}>{product.category}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="location-outline" size={16} color={theme.colors.gray[600]} />
              <Text variant="body2" style={styles.metaText}>{product.origin}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="cube-outline" size={16} color={theme.colors.gray[600]} />
              <Text variant="body2" style={styles.metaText}>{product.weight}</Text>
            </View>
          </View>
          
          <View style={styles.quantityContainer}>
            <Text variant="body1" style={styles.quantityLabel}>Quantity:</Text>
            <View style={styles.quantitySelector}>
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={decrementQuantity}
                disabled={quantity <= 1}
              >
                <Ionicons 
                  name="remove" 
                  size={20} 
                  color={quantity <= 1 ? theme.colors.gray[400] : theme.colors.primary[500]} 
                />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={incrementQuantity}
                disabled={quantity >= product.stock}
              >
                <Ionicons 
                  name="add" 
                  size={20} 
                  color={quantity >= product.stock ? theme.colors.gray[400] : theme.colors.primary[500]} 
                />
              </TouchableOpacity>
            </View>
            <Text variant="caption" style={styles.stockText}>
              {product.stock} in stock
            </Text>
          </View>
          
          <View style={styles.section}>
            <Text variant="h6" style={styles.sectionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{product.description}</Text>
          </View>
          
          <View style={styles.section}>
            <Text variant="h6" style={styles.sectionTitle}>Benefits</Text>
            {product.benefits.map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <Ionicons name="checkmark-circle" size={16} color={theme.colors.success} />
                <Text style={styles.benefitText}>{benefit}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      
      {/* Fixed Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.priceContainer}>
          <Text variant="caption" style={styles.totalLabel}>Total</Text>
          <Text variant="h5" style={styles.totalPrice}>
            ${(product.price * quantity).toFixed(2)}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button 
            title="Add to Cart" 
            variant="outline"
            style={styles.cartButton}
            onPress={handleAddToCart}
          />
          <Button 
            title="Buy Now" 
            style={styles.buyButton}
            onPress={handleBuyNow}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  imageContainer: {
    backgroundColor: theme.colors.white,
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  mainImage: {
    width: width * 0.8,
    height: width * 0.8,
  },
  favoriteButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  thumbnailContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginHorizontal: 4,
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  selectedThumbnail: {
    borderColor: theme.colors.primary[500],
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    padding: 16,
    paddingBottom: 100, // Space for bottom bar
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  productName: {
    flex: 1,
    color: theme.colors.gray[900],
    marginRight: 8,
  },
  organicBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(74, 222, 128, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  organicText: {
    color: theme.colors.success,
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingStars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    color: theme.colors.gray[600],
  },
  price: {
    color: theme.colors.primary[500],
    marginBottom: 16,
    fontWeight: '700',
  },
  unit: {
    color: theme.colors.gray[600],
    fontWeight: '400',
  },
  metaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.colors.gray[200],
    paddingVertical: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 8,
  },
  metaText: {
    marginLeft: 6,
    color: theme.colors.gray[700],
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
    color: theme.colors.gray[700],
    marginRight: 16,
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
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    width: 40,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.gray[900],
  },
  stockText: {
    color: theme.colors.gray[500],
    marginLeft: 'auto',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: theme.colors.gray[900],
    marginBottom: 12,
  },
  descriptionText: {
    color: theme.colors.gray[700],
    lineHeight: 22,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  benefitText: {
    marginLeft: 8,
    color: theme.colors.gray[700],
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[200],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  priceContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  totalLabel: {
    color: theme.colors.gray[600],
    marginBottom: 2,
  },
  totalPrice: {
    color: theme.colors.primary[500],
    fontWeight: '700',
  },
  buttonContainer: {
    flex: 2,
    flexDirection: 'row',
    marginLeft: 16,
  },
  cartButton: {
    flex: 1,
    marginRight: 8,
  },
  buyButton: {
    flex: 1,
  },
});

export default ProductDetailScreen;
