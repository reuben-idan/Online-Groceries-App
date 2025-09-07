import React, { useCallback } from 'react';
import { View, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import { Button, Input, Text } from '@/components/common';
import { theme } from '../../../theme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

// Mock data - replace with actual data from your API
const featuredProducts = [
  {
    id: '1',
    name: 'Fresh Apples',
    price: 2.99,
    unit: 'lb',
    image: 'https://via.placeholder.com/150',
    rating: 4.5,
  },
  {
    id: '2',
    name: 'Organic Bananas',
    price: 0.69,
    unit: 'each',
    image: 'https://via.placeholder.com/150',
    rating: 4.8,
  },
  // Add more products as needed
];

const categories = [
  { id: '1', name: 'Fruits', icon: 'apple1' },
  { id: '2', name: 'Vegetables', icon: 'carrot' },
  { id: '3', name: 'Dairy', icon: 'milk' },
  { id: '4', name: 'Meat', icon: 'restaurant' },
  { id: '5', name: 'Bakery', icon: 'bread-slice' },
];

const deals = [
  {
    id: '1',
    title: 'Weekend Special',
    description: '20% off on all fruits',
    image: 'https://via.placeholder.com/300x120',
  },
  {
    id: '2',
    title: 'New User Offer',
    description: 'Get $10 off on first order',
    image: 'https://via.placeholder.com/300x120',
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
