import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import { Button, Text, Input } from '@/components/common';
import { theme } from '../../../theme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

type CartScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Cart'>;

// Mock cart data - replace with actual cart state management
const initialCartItems = [
  {
    id: '1',
    name: 'Organic Red Apples',
    price: 2.99,
    unit: 'lb',
    quantity: 2,
    image: 'https://via.placeholder.com/100',
    inStock: true,
  },
  {
    id: '2',
    name: 'Fresh Bananas',
    price: 0.69,
    unit: 'each',
    quantity: 6,
    image: 'https://via.placeholder.com/100',
    inStock: true,
  },
  {
    id: '3',
    name: 'Whole Grain Bread',
    price: 3.49,
    unit: 'loaf',
    quantity: 1,
    image: 'https://via.placeholder.com/100',
    inStock: true,
  },
];

const CartScreen: React.FC = () => {
  const navigation = useNavigation<CartScreenNavigationProp>();
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState('');

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const deliveryFee = 2.99; // Fixed delivery fee for now
    return subtotal + deliveryFee;
  };

  const renderCartItem = ({ item }: { item: typeof initialCartItems[0] }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text variant="body1" style={styles.itemName} numberOfLines={1}>{item.name}</Text>
        <Text variant="body2" style={styles.itemPrice}>${item.price.toFixed(2)} / {item.unit}</Text>
        
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, item.quantity - 1)}
          >
            <Ionicons name="remove" size={16} color={theme.colors.gray[700]} />
          </TouchableOpacity>
          
          <Text style={styles.quantityText}>{item.quantity}</Text>
          
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <Ionicons name="add" size={16} color={theme.colors.primary[500]} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.itemRightSection}>
        <Text variant="h6" style={styles.itemTotal}>
          ${(item.price * item.quantity).toFixed(2)}
        </Text>
        <TouchableOpacity 
          style={styles.removeButton}
          onPress={() => removeItem(item.id)}
        >
          <Ionicons name="trash-outline" size={20} color={theme.colors.error} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.gray[900]} />
        </TouchableOpacity>
        <Text variant="h5">My Cart</Text>
        <View style={styles.headerRight} />
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <Ionicons name="cart-outline" size={80} color={theme.colors.gray[300]} />
          <Text variant="h5" style={styles.emptyCartText}>Your cart is empty</Text>
          <Text style={styles.emptyCartSubtext}>Looks like you haven't added anything to your cart yet</Text>
          <Button 
            title="Browse Products" 
            style={styles.browseButton}
            onPress={() => navigation.navigate('Home')}
          />
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.cartList}
            ListHeaderComponent={
              <View style={styles.deliveryInfo}>
                <View style={styles.deliveryIcon}>
                  <Ionicons name="bicycle" size={20} color={theme.colors.primary[500]} />
                </View>
                <View>
                  <Text variant="body1" style={styles.deliveryTitle}>Delivery in 25-30 minutes</Text>
                  <Text variant="caption" style={styles.deliveryAddress}>
                    Home • 123 Grocery St, Foodie City
                  </Text>
                </View>
                <TouchableOpacity style={styles.changeButton}>
                  <Text variant="body2" style={styles.changeText}>Change</Text>
                </TouchableOpacity>
              </View>
            }
            ListFooterComponent={
              <View style={styles.promoContainer}>
                <View style={styles.promoInputContainer}>
                  <Ionicons name="pricetag-outline" size={20} color={theme.colors.gray[500]} />
                  <Input
                    placeholder="Promo code"
                    value={promoCode}
                    onChangeText={setPromoCode}
                    containerStyle={styles.promoInput}
                    inputStyle={styles.promoInputText}
                  />
                </View>
                <Button 
                  title="Apply" 
                  variant="outline" 
                  size="small" 
                  style={styles.applyButton}
                />
              </View>
            }
          />

          {/* Order Summary */}
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text variant="body2" style={styles.summaryLabel}>Subtotal</Text>
              <Text variant="body1">${calculateSubtotal().toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text variant="body2" style={styles.summaryLabel}>Delivery Fee</Text>
              <Text variant="body1">$2.99</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text variant="h6" style={styles.totalLabel}>Total</Text>
              <Text variant="h5" style={styles.totalAmount}>${calculateTotal().toFixed(2)}</Text>
            </View>
            
            <Button 
              title="Proceed to Checkout" 
              style={styles.checkoutButton}
              onPress={() => navigation.navigate('Checkout')}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
    backgroundColor: theme.colors.white,
  },
  backButton: {
    padding: 4,
  },
  headerRight: {
    width: 32,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyCartText: {
    marginTop: 16,
    marginBottom: 8,
    color: theme.colors.gray[900],
  },
  emptyCartSubtext: {
    textAlign: 'center',
    color: theme.colors.gray[600],
    marginBottom: 24,
  },
  browseButton: {
    width: '100%',
    maxWidth: 300,
  },
  cartList: {
    paddingBottom: 200, // Space for the summary
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[100],
  },
  deliveryIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  deliveryTitle: {
    fontWeight: '600',
    color: theme.colors.gray[900],
    marginBottom: 2,
  },
  deliveryAddress: {
    color: theme.colors.gray[600],
  },
  changeButton: {
    marginLeft: 'auto',
  },
  changeText: {
    color: theme.colors.primary[500],
    fontWeight: '600',
  },
  cartItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[100],
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: theme.colors.gray[100],
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  itemName: {
    fontWeight: '600',
    color: theme.colors.gray[900],
    marginBottom: 4,
  },
  itemPrice: {
    color: theme.colors.gray[600],
    marginBottom: 8,
  },
  itemRightSection: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginLeft: 12,
  },
  itemTotal: {
    fontWeight: '700',
    color: theme.colors.gray[900],
  },
  removeButton: {
    padding: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  quantityButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    width: 30,
    textAlign: 'center',
    color: theme.colors.gray[900],
    fontWeight: '600',
  },
  promoContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[100],
  },
  promoInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.gray[50],
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 12,
  },
  promoInput: {
    flex: 1,
    borderWidth: 0,
    marginBottom: 0,
  },
  promoInputText: {
    paddingLeft: 8,
    height: 48,
  },
  applyButton: {
    width: 100,
  },
  summaryContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.white,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[200],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    color: theme.colors.gray[600],
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[200],
  },
  totalLabel: {
    color: theme.colors.gray[900],
  },
  totalAmount: {
    color: theme.colors.primary[500],
    fontWeight: '700',
  },
  checkoutButton: {
    marginTop: 16,
  },
});

export default CartScreen;
