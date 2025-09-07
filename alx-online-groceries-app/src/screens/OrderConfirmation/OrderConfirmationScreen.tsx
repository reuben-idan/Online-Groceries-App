import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import { Button, Text } from '@/components/common';
import { theme } from '../../../theme';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

type OrderConfirmationScreenRouteProp = RouteProp<RootStackParamList, 'OrderConfirmation'>;
type OrderConfirmationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OrderConfirmation'>;

const OrderConfirmationScreen: React.FC = () => {
  const route = useRoute<OrderConfirmationScreenRouteProp>();
  const navigation = useNavigation<OrderConfirmationScreenNavigationProp>();
  const { orderId } = route.params;
  
  // Mock order data - replace with actual data from your API
  const order = {
    id: orderId,
    date: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 30 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    items: [
      { id: '1', name: 'Organic Red Apples', price: 2.99, quantity: 2, image: 'https://via.placeholder.com/60' },
      { id: '2', name: 'Fresh Bananas', price: 0.69, quantity: 6, image: 'https://via.placeholder.com/60' },
      { id: '3', name: 'Whole Grain Bread', price: 3.49, quantity: 1, image: 'https://via.placeholder.com/60' },
    ],
    deliveryAddress: '123 Grocery St, Foodie City, CA 94103',
    paymentMethod: '•••• •••• •••• 3456',
    subtotal: 9.79,
    deliveryFee: 2.99,
    tax: 0.78,
    total: 13.56,
  };

  const handleTrackOrder = () => {
    // Implement order tracking
    console.log('Track order:', orderId);
  };

  const handleContactSupport = () => {
    // Implement contact support
    Linking.openURL('tel:+15551234567');
  };

  const handleBackToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Success Animation/Icon */}
        <View style={styles.successContainer}>
          <View style={styles.successIconContainer}>
            <Ionicons name="checkmark" size={48} color={theme.colors.white} />
          </View>
          <Text variant="h4" style={styles.successTitle}>Order Confirmed!</Text>
          <Text style={styles.successMessage}>
            Your order has been placed successfully and is being processed.
          </Text>
          <Text style={styles.orderNumber}>Order #{order.id}</Text>
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text variant="h6">Order Summary</Text>
            <Text style={styles.orderDate}>{formatDate(order.date)}</Text>
          </View>
          
          <View style={styles.orderItems}>
            {order.items.map((item) => (
              <View key={item.id} style={styles.orderItem}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
                </View>
                <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.orderTotalRow}>
            <Text>Subtotal</Text>
            <Text>${order.subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.orderTotalRow}>
            <Text>Delivery Fee</Text>
            <Text>${order.deliveryFee.toFixed(2)}</Text>
          </View>
          <View style={styles.orderTotalRow}>
            <Text>Tax</Text>
            <Text>${order.tax.toFixed(2)}</Text>
          </View>
          <View style={[styles.orderTotalRow, styles.orderTotal]}>
            <Text variant="subtitle1">Total</Text>
            <Text variant="subtitle1">${order.total.toFixed(2)}</Text>
          </View>
        </View>

        {/* Delivery Information */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text variant="h6">Delivery Information</Text>
          </View>
          
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <MaterialCommunityIcons 
                name="truck-delivery-outline" 
                size={20} 
                color={theme.colors.primary[500]} 
              />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Estimated Delivery</Text>
                <Text style={styles.infoValue}>By {order.estimatedDelivery}</Text>
              </View>
            </View>
            
            <View style={[styles.infoRow, { marginTop: 16 }]}>
              <Ionicons 
                name="location-outline" 
                size={20} 
                color={theme.colors.primary[500]} 
              />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Delivery Address</Text>
                <Text style={styles.infoValue}>{order.deliveryAddress}</Text>
              </View>
            </View>
            
            <View style={[styles.infoRow, { marginTop: 16 }]}>
              <Ionicons 
                name="card-outline" 
                size={20} 
                color={theme.colors.primary[500]} 
              />
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Payment Method</Text>
                <Text style={styles.infoValue}>•••• {order.paymentMethod}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Order Status */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text variant="h6">Order Status</Text>
          </View>
          
          <View style={styles.timeline}>
            <View style={styles.timelineStep}>
              <View style={[styles.timelineDot, styles.activeDot]}>
                <Ionicons name="checkmark" size={16} color={theme.colors.white} />
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>Order Confirmed</Text>
                <Text style={styles.timelineTime}>Just now</Text>
              </View>
            </View>
            
            <View style={styles.timelineStep}>
              <View style={[styles.timelineDot, styles.pendingDot]} />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>Preparing Your Order</Text>
                <Text style={styles.timelineTime}>Estimated: 5-10 min</Text>
              </View>
            </View>
            
            <View style={styles.timelineStep}>
              <View style={[styles.timelineDot, styles.pendingDot]} />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>Out for Delivery</Text>
                <Text style={styles.timelineTime}>Estimated: 20-25 min</Text>
              </View>
            </View>
            
            <View style={styles.timelineStep}>
              <View style={[styles.timelineDot, styles.pendingDot]} />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>Delivered</Text>
                <Text style={styles.timelineTime}>Estimated: {order.estimatedDelivery}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text variant="h6">Need Help?</Text>
          </View>
          
          <View style={styles.supportCard}>
            <View style={styles.supportIcon}>
              <Ionicons name="headset-outline" size={24} color={theme.colors.primary[500]} />
            </View>
            <View style={styles.supportContent}>
              <Text style={styles.supportTitle}>Customer Support</Text>
              <Text style={styles.supportText}>
                Our customer support team is available 24/7 to assist you with any questions or concerns about your order.
              </Text>
              <Button 
                title="Contact Support" 
                variant="outline" 
                size="small" 
                style={styles.supportButton}
                onPress={handleContactSupport}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View style={styles.bottomActions}>
        <Button 
          title="Track Order" 
          variant="outline" 
          style={styles.trackButton}
          onPress={handleTrackOrder}
        />
        <Button 
          title="Back to Home" 
          style={styles.homeButton}
          onPress={handleBackToHome}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 120,
  },
  successContainer: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: theme.colors.primary[500],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 2,
  },
  successIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  successTitle: {
    color: theme.colors.gray[900],
    marginBottom: 8,
    textAlign: 'center',
  },
  successMessage: {
    color: theme.colors.gray[600],
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 22,
  },
  orderNumber: {
    color: theme.colors.primary[500],
    fontWeight: '600',
    marginTop: 8,
  },
  section: {
    backgroundColor: theme.colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[100],
  },
  orderDate: {
    color: theme.colors.gray[500],
    fontSize: 12,
  },
  orderItems: {
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: theme.colors.gray[100],
  },
  itemDetails: {
    flex: 1,
    marginRight: 12,
  },
  itemName: {
    color: theme.colors.gray[900],
    marginBottom: 4,
  },
  itemQuantity: {
    color: theme.colors.gray[500],
    fontSize: 12,
  },
  itemPrice: {
    color: theme.colors.gray[900],
    fontWeight: '600',
  },
  orderTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  orderTotal: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[200],
  },
  infoCard: {
    backgroundColor: theme.colors.gray[50],
    borderRadius: 12,
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  infoLabel: {
    color: theme.colors.gray[600],
    fontSize: 12,
    marginBottom: 2,
  },
  infoValue: {
    color: theme.colors.gray[900],
    lineHeight: 20,
  },
  timeline: {
    paddingLeft: 8,
  },
  timelineStep: {
    flexDirection: 'row',
    marginBottom: 20,
    position: 'relative',
  },
  timelineDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    zIndex: 1,
  },
  activeDot: {
    backgroundColor: theme.colors.success,
  },
  pendingDot: {
    backgroundColor: theme.colors.gray[200],
    borderWidth: 4,
    borderColor: theme.colors.white,
  },
  timelineContent: {
    flex: 1,
    paddingTop: 2,
  },
  timelineTitle: {
    color: theme.colors.gray[900],
    marginBottom: 2,
  },
  timelineTime: {
    color: theme.colors.gray[500],
    fontSize: 12,
  },
  supportCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.gray[50],
    borderRadius: 12,
    padding: 16,
  },
  supportIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  supportContent: {
    flex: 1,
  },
  supportTitle: {
    color: theme.colors.gray[900],
    fontWeight: '600',
    marginBottom: 4,
  },
  supportText: {
    color: theme.colors.gray[600],
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 12,
  },
  supportButton: {
    alignSelf: 'flex-start',
  },
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 16,
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[200],
  },
  trackButton: {
    flex: 1,
    marginRight: 12,
  },
  homeButton: {
    flex: 2,
  },
});

export default OrderConfirmationScreen;
