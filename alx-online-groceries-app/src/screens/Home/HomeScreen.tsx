import React, { useCallback, useRef, useState } from 'react';
import { 
  View, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import FastImage from 'react-native-fast-image';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Carousel from 'react-native-reanimated-carousel';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';

import { RootStackParamList } from '../../navigation/types';
import { Button, Input, Text } from '@/components/common';
import { theme } from '../../../theme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { fetchProducts, fetchCategories, fetchPromotions } from '@/api/client';
import { useCartStore } from '@/store/useCartStore';

// Types
type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
};

type Category = {
  id: string;
  name: string;
  icon: string;
  count?: number;
};

type Deal = {
  id: string;
  title: string;
  description: string;
  image: string;
  code?: string;
};

// Skeleton Loaders
const ProductSkeleton = () => (
  <View style={styles.productCard}>
    <SkeletonPlaceholder borderRadius={4}>
      <SkeletonPlaceholder.Item width="100%" height={120} borderRadius={12} />
      <SkeletonPlaceholder.Item marginTop={8} width="80%" height={16} />
      <SkeletonPlaceholder.Item marginTop={4} width="60%" height={14} />
      <SkeletonPlaceholder.Item marginTop={8} width="40%" height={14} />
    </SkeletonPlaceholder>
  </View>
);

const CategorySkeleton = () => (
  <View style={styles.categoryItem}>
    <SkeletonPlaceholder borderRadius={50}>
      <SkeletonPlaceholder.Item width={60} height={60} borderRadius={30} />
      <SkeletonPlaceholder.Item marginTop={8} width={60} height={12} alignSelf="center" />
    </SkeletonPlaceholder>
  </View>
);

const DealSkeleton = () => (
  <View style={styles.dealCard}>
    <SkeletonPlaceholder borderRadius={8}>
      <SkeletonPlaceholder.Item width="100%" height={150} borderRadius={8} />
      <SkeletonPlaceholder.Item marginTop={8} width="80%" height={16} marginHorizontal={8} />
      <SkeletonPlaceholder.Item marginTop={4} width="60%" height={14} marginHorizontal={8} marginBottom={8} />
    </SkeletonPlaceholder>
  </View>
);

// Product Card Component
const ProductCard = ({ product, onAddToCart }: { product: Product; onAddToCart: (product: Product) => void }) => (
  <View style={styles.productCard}>
    <TouchableOpacity 
      style={styles.favoriteButton}
      onPress={() => console.log('Add to favorites')}
    >
      <Ionicons 
        name="heart-outline" 
        size={20} 
        color={theme.colors.gray[600]} 
      />
    </TouchableOpacity>
    
    <FastImage
      source={{ uri: product.image }}
      style={styles.productImage}
      resizeMode={FastImage.resizeMode.contain}
    />
    
    <Text variant="subtitle2" style={styles.productName} numberOfLines={1}>
      {product.name}
    </Text>
    
    <View style={styles.priceContainer}>
      <Text variant="subtitle1" style={styles.price}>
        ${product.price.toFixed(2)}
      </Text>
      {product.originalPrice && (
        <Text variant="caption" style={styles.originalPrice}>
          ${product.originalPrice.toFixed(2)}
        </Text>
      )}
    </View>
    
    <View style={styles.ratingContainer}>
      <Ionicons name="star" size={14} color={theme.colors.accent[500]} />
      <Text variant="caption" style={styles.ratingText}>
        {product.rating.toFixed(1)} ({product.reviewCount})
      </Text>
    </View>
    
    <Button 
      title="Add to Cart" 
      size="small" 
      onPress={() => onAddToCart(product)}
      disabled={!product.inStock}
      style={styles.addToCartButton}
    />
    
    {!product.inStock && (
      <Text variant="caption" style={styles.outOfStockText}>
        Out of Stock
      </Text>
    )}
  </View>
);

// Category Item Component
const CategoryItem = ({ category, onPress }: { category: Category; onPress: () => void }) => (
  <TouchableOpacity style={styles.categoryItem} onPress={onPress}>
    <View style={styles.categoryIcon}>
      <Ionicons 
        name={category.icon as any} 
        size={24} 
        color={theme.colors.primary[500]} 
      />
    </View>
    <Text variant="caption" style={styles.categoryName} numberOfLines={1}>
      {category.name}
    </Text>
  </TouchableOpacity>
);

// Deal Card Component
const DealCard = ({ deal }: { deal: Deal }) => (
  <View style={styles.dealCard}>
    <FastImage
      source={{ uri: deal.image }}
      style={styles.dealImage}
      resizeMode={FastImage.resizeMode.cover}
    >
      <View style={styles.dealContent}>
        <Text variant="h6" style={styles.dealTitle}>
          {deal.title}
        </Text>
        <Text style={styles.dealDescription}>
          {deal.description}
        </Text>
        {deal.code && (
          <View style={styles.dealCodeContainer}>
            <Text style={styles.dealCode}>{deal.code}</Text>
          </View>
        )}
      </View>
    </FastImage>
  </View>
);

// Main Component
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);
  const carouselRef = useRef(null);
  const addToCart = useCartStore(state => state.addItem);
  
  // Fetch data with React Query
  const { 
    data: products = [], 
    isLoading: isLoadingProducts,
    refetch: refetchProducts 
  } = useQuery({
    queryKey: ['featuredProducts'],
    queryFn: () => fetchProducts({ featured: true, limit: 8 })
  });
  
  const { 
    data: categories = [], 
    isLoading: isLoadingCategories 
  } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  });
  
  const { 
    data: deals = [], 
    isLoading: isLoadingDeals 
  } = useQuery({
    queryKey: ['deals'],
    queryFn: fetchPromotions
  });
  
  // Handle refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([
      refetchProducts(),
      // Add other refetches if needed
    ]);
    setRefreshing(false);
  }, [refetchProducts]);
  
  // Handle add to cart
  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      stock: product.inStock ? 10 : 0, // Mock stock
    });
    
    // Show feedback (could be a toast or animation)
    console.log('Added to cart:', product.name);
  };
  
  // Handle category press
  const handleCategoryPress = (categoryId: string) => {
    navigation.navigate('Categories', { 
      screen: 'Category',
      params: { 
        categoryId,
        title: categories.find(c => c.id === categoryId)?.name || 'Category'
      }
    });
  };
  
  // Handle search
  const handleSearch = (query: string) => {
    navigation.navigate('Search', { query });
  };
  
  // Render product item
  const renderProductItem = ({ item }: { item: Product }) => (
    <ProductCard product={item} onAddToCart={handleAddToCart} />
  );
  
  // Render category item
  const renderCategoryItem = ({ item }: { item: Category }) => (
    <CategoryItem 
      category={item} 
      onPress={() => handleCategoryPress(item.id)} 
    />
  );
  
  // Render deal item
  const renderDealItem = ({ item }: { item: Deal }) => (
    <DealCard deal={item} />
  );
  
  // Render section header
  const renderSectionHeader = (title: string, onPressSeeAll?: () => void) => (
    <View style={styles.sectionHeader}>
      <Text variant="h6" style={styles.sectionTitle}>
        {title}
      </Text>
      {onPressSeeAll && (
        <TouchableOpacity onPress={onPressSeeAll}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      )}
    </View>
  );
  
  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={20} color={theme.colors.primary[500]} />
          <Text style={styles.locationText}>Delivery to Home</Text>
          <Ionicons name="chevron-down" size={16} color={theme.colors.gray[600]} />
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person-outline" size={24} color={theme.colors.gray[900]} />
        </TouchableOpacity>
      </View>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Input
          placeholder="Search for groceries..."
          leftIcon={<Ionicons name="search" size={20} color={theme.colors.gray[400]} />}
          style={styles.searchInput}
          onFocus={() => navigation.navigate('Search')}
          onSubmitEditing={(e) => handleSearch(e.nativeEvent.text)}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={24} color={theme.colors.white} />
        </TouchableOpacity>
      </View>
      
      {/* Main Content */}
      <FlatList
        data={[]}
        renderItem={null}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary[500]]}
            tintColor={theme.colors.primary[500]}
          />
        }
        ListHeaderComponent={
          <>
            {/* Categories */}
            {renderSectionHeader('Categories')}
            {isLoadingCategories ? (
              <FlatList
                horizontal
                data={[...Array(5).keys()]}
                renderItem={() => <CategorySkeleton />}
                keyExtractor={(_, index) => `category-skeleton-${index}`}
                contentContainerStyle={styles.categoriesContainer}
                showsHorizontalScrollIndicator={false}
              />
            ) : (
              <FlatList
                horizontal
                data={categories}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => `category-${item.id}`}
                contentContainerStyle={styles.categoriesContainer}
                showsHorizontalScrollIndicator={false}
              />
            )}
            
            {/* Deals Carousel */}
            {renderSectionHeader('Special Offers', () => console.log('View all offers'))}
            {isLoadingDeals ? (
              <DealSkeleton />
            ) : (
              <Carousel
                ref={carouselRef}
                loop
                width={styles.dealCard.width}
                height={styles.dealCard.height}
                autoPlay={true}
                data={deals}
                scrollAnimationDuration={1000}
                renderItem={({ item }) => <DealCard deal={item} />}
                style={styles.carousel}
              />
            )}
            
            {/* Featured Products */}
            {renderSectionHeader('Featured Products', () => 
              navigation.navigate('FeaturedProducts'))}
          </>
        }
        ListFooterComponent={
          <>
            {isLoadingProducts ? (
              <FlatList
                data={[...Array(4).keys()]}
                numColumns={2}
                renderItem={() => <ProductSkeleton />}
                keyExtractor={(_, index) => `product-skeleton-${index}`}
                contentContainerStyle={styles.productsGrid}
                columnWrapperStyle={styles.productsRow}
                scrollEnabled={false}
              />
            ) : (
              <FlatList
                data={products}
                numColumns={2}
                renderItem={renderProductItem}
                keyExtractor={(item) => `product-${item.id}`}
                contentContainerStyle={styles.productsGrid}
                columnWrapperStyle={styles.productsRow}
                scrollEnabled={false}
              />
            )}
            
            {/* Footer Spacer */}
            <View style={{ height: 100 }} />
          </>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 4,
    marginRight: 4,
    color: theme.colors.gray[900],
    fontWeight: '500',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginRight: 12,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: theme.colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    color: theme.colors.gray[900],
    fontWeight: '600',
  },
  seeAllText: {
    color: theme.colors.primary[500],
    fontWeight: '500',
  },
  categoriesContainer: {
    paddingBottom: 8,
  },
  categoryItem: {
    width: 80,
    marginRight: 16,
    alignItems: 'center',
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    textAlign: 'center',
    color: theme.colors.gray[700],
  },
  carousel: {
    marginBottom: 24,
  },
  dealCard: {
    width: '100%' as any,
    height: 150,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: theme.colors.gray[100],
    marginBottom: 24,
  },
  dealImage: {
    width: '100%',
    height: '100%',
  },
  dealContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dealTitle: {
    color: theme.colors.white,
    fontWeight: '600',
    marginBottom: 4,
  },
  dealDescription: {
    color: theme.colors.gray[200],
    fontSize: 12,
    marginBottom: 8,
  },
  dealCodeContainer: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary[500],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  dealCode: {
    color: theme.colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  productsGrid: {
    paddingBottom: 16,
  },
  productsRow: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  productCard: {
    width: '48%',
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    padding: 12,
    shadowColor: theme.colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 100,
    marginBottom: 8,
  },
  productName: {
    marginBottom: 4,
    color: theme.colors.gray[900],
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  price: {
    color: theme.colors.primary[500],
    fontWeight: '600',
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: theme.colors.gray[400],
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    marginLeft: 4,
    color: theme.colors.gray[600],
  },
  addToCartButton: {
    width: '100%',
  },
  outOfStockText: {
    color: theme.colors.error,
    textAlign: 'center',
    marginTop: 4,
    fontSize: 10,
  },
});
  },
];

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const renderCategoryItem = useCallback(({ item }: { item: { id: string; name: string; icon: string } }) => (
    <TouchableOpacity 
      style={styles.categoryItem}
      onPress={() => navigation.navigate('Category', { categoryId: item.id, categoryName: item.name })}
    >
      <View style={styles.categoryIcon}>
        <Ionicons name={item.icon as any} size={24} color={theme.colors.primary[500]} />
      </View>
      <Text variant="body2" style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  ), [navigation]);

  const renderProductItem = useCallback(({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text variant="body2" style={styles.productName} numberOfLines={1}>{item.name}</Text>
      <View style={styles.ratingContainer}>
        <Ionicons name="star" size={16} color={theme.colors.accent[500]} />
        <Text variant="caption" style={styles.ratingText}>{item.rating}</Text>
      </View>
      <Text variant="h6" style={styles.priceText}>${item.price.toFixed(2)}</Text>
      <Button 
        title="Add" 
        variant="outline" 
        size="small" 
        style={styles.addButton}
        onPress={() => {}}
      />
    </TouchableOpacity>
  ), [navigation]);

  const renderDealItem = useCallback(({ item }: { item: any }) => (
    <TouchableOpacity style={styles.dealCard}>
      <Image source={{ uri: item.image }} style={styles.dealImage} />
      <View style={styles.dealContent}>
        <Text variant="h5" style={styles.dealTitle}>{item.title}</Text>
        <Text variant="body2" style={styles.dealDescription}>{item.description}</Text>
        <Button 
          title="Shop Now" 
          variant="text" 
          size="small" 
          style={styles.dealButton}
          onPress={() => {}}
        />
      </View>
    </TouchableOpacity>
  ), []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={20} color={theme.colors.primary[500]} />
          <Text style={styles.locationText}>Delivery to Home • 25-30 min</Text>
          <MaterialIcons name="keyboard-arrow-down" size={20} color={theme.colors.gray[600]} />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-circle-outline" size={28} color={theme.colors.gray[700]} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Input
          placeholder="Search for groceries..."
          leftIcon={<Ionicons name="search-outline" size={20} color={theme.colors.gray[500]} />}
          containerStyle={styles.searchInput}
        />
        <Button 
          variant="primary"
          style={styles.filterButton}
          onPress={() => {}}
        >
          <Ionicons name="filter" size={20} color={theme.colors.white} />
        </Button>
      </View>

      {/* Categories */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text variant="h5">Categories</Text>
          <Button 
            variant="text" 
            size="small" 
            title="See All"
            onPress={() => navigation.navigate('Categories')}
          />
        </View>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Deals Carousel */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text variant="h5">Special Offers</Text>
          <Button 
            variant="text" 
            size="small" 
            title="See All"
            onPress={() => navigation.navigate('Deals')}
          />
        </View>
        <FlatList
          data={deals}
          renderItem={renderDealItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dealsList}
        />
      </View>

      {/* Featured Products */}
      <View style={[styles.section, { flex: 1 }]}>
        <View style={styles.sectionHeader}>
          <Text variant="h5">Featured Products</Text>
          <Button 
            variant="text" 
            size="small" 
            title="See All"
            onPress={() => navigation.navigate('Products')}
          />
        </View>
        <FlatList
          data={featuredProducts}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.productsGrid}
          contentContainerStyle={styles.productsList}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 8,
    marginRight: 4,
    color: theme.colors.gray[700],
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginRight: 12,
  },
  filterButton: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoriesList: {
    paddingRight: 16,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
    width: 70,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryText: {
    textAlign: 'center',
    color: theme.colors.gray[700],
  },
  dealsList: {
    paddingRight: 16,
  },
  dealCard: {
    width: 280,
    marginRight: 16,
    borderRadius: 12,
    backgroundColor: theme.colors.white,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: theme.colors.gray[500],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dealImage: {
    width: '100%',
    height: 120,
  },
  dealContent: {
    padding: 16,
  },
  dealTitle: {
    marginBottom: 4,
    color: theme.colors.gray[900],
  },
  dealDescription: {
    color: theme.colors.gray[600],
    marginBottom: 12,
  },
  dealButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 0,
  },
  productsList: {
    paddingBottom: 24,
  },
  productsGrid: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  productCard: {
    width: '48%',
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    elevation: 1,
    shadowColor: theme.colors.gray[500],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  productImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: theme.colors.gray[100],
  },
  productName: {
    fontWeight: '600',
    marginBottom: 4,
    color: theme.colors.gray[900],
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    marginLeft: 4,
    color: theme.colors.gray[600],
  },
  priceText: {
    fontWeight: '700',
    color: theme.colors.primary[500],
    marginBottom: 8,
  },
  addButton: {
    width: '100%',
  },
});

export default HomeScreen;
