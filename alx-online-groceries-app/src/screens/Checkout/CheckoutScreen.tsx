import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import { Button, Text } from '@/components/common';
import { theme } from '../../../theme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

type CheckoutScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Checkout'>;

type PaymentMethod = 'credit_card' | 'paypal' | 'apple_pay' | 'google_pay';

type AddressType = {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  isDefault: boolean;
};

const CheckoutScreen: React.FC = () => {
  const navigation = useNavigation<CheckoutScreenNavigationProp>();
  
  // Form state
  const [activeStep, setActiveStep] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
  const [savePaymentInfo, setSavePaymentInfo] = useState(true);
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock data - replace with actual data from your state management
  const [addresses] = useState<AddressType[]>([
    {
      id: '1',
      name: 'Home',
      street: '123 Grocery St',
      city: 'Foodie City',
      state: 'CA',
      zipCode: '94103',
      phone: '(555) 123-4567',
      isDefault: true,
    },
    {
      id: '2',
      name: 'Work',
      street: '456 Office Ave',
      city: 'Business District',
      state: 'CA',
      zipCode: '94105',
      phone: '(555) 987-6543',
      isDefault: false,
    },
  ]);
  
  const [selectedAddress, setSelectedAddress] = useState<string>(addresses[0].id);
  
  // Mock cart data - replace with actual cart data
  const cartItems = [
    { id: '1', name: 'Organic Red Apples', price: 2.99, quantity: 2 },
    { id: '2', name: 'Fresh Bananas', price: 0.69, quantity: 6 },
    { id: '3', name: 'Whole Grain Bread', price: 3.49, quantity: 1 },
  ];

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const deliveryFee = 2.99;
    const tax = subtotal * 0.08; // 8% tax
    return subtotal + deliveryFee + tax;
  };

  const handlePlaceOrder = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('OrderConfirmation', { orderId: 'ORD' + Math.floor(Math.random() * 1000000) });
    }, 1500);
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicatorContainer}>
      {[1, 2, 3].map((step) => (
        <React.Fragment key={step}>
          <TouchableOpacity 
            style={[
              styles.stepIndicator,
              activeStep === step && styles.activeStepIndicator,
              step < activeStep && styles.completedStepIndicator,
            ]}
            onPress={() => step < activeStep && setActiveStep(step)}
            disabled={step > activeStep}
          >
            {step < activeStep ? (
              <Ionicons name="checkmark" size={16} color={theme.colors.white} />
            ) : (
              <Text style={[
                styles.stepText,
                (activeStep === step || step < activeStep) && styles.activeStepText,
              ]}>
                {step}
              </Text>
            )}
          </TouchableOpacity>
          {step < 3 && (
            <View style={[
              styles.stepConnector,
              step < activeStep && styles.completedStepConnector,
            ]} />
          )}
        </React.Fragment>
      ))}
    </View>
  );

  const renderStepLabels = () => (
    <View style={styles.stepLabels}>
      <Text 
        variant="caption" 
        style={[
          styles.stepLabel, 
          activeStep >= 1 && styles.activeStepLabel
        ]}
      >
        Delivery
      </Text>
      <Text 
        variant="caption" 
        style={[
          styles.stepLabel, 
          activeStep >= 2 && styles.activeStepLabel
        ]}
      >
        Payment
      </Text>
      <Text 
        variant="caption" 
        style={[
          styles.stepLabel, 
          activeStep >= 3 && styles.activeStepLabel
        ]}
      >
        Review
      </Text>
    </View>
  );

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return renderDeliveryStep();
      case 2:
        return renderPaymentStep();
      case 3:
        return renderReviewStep();
      default:
        return null;
    }
  };

  const renderDeliveryStep = () => (
    <View style={styles.stepContent}>
      <Text variant="h6" style={styles.sectionTitle}>Delivery Address</Text>
      <View style={styles.addressesContainer}>
        {addresses.map((address) => (
          <TouchableOpacity 
            key={address.id}
            style={[
              styles.addressCard,
              selectedAddress === address.id && styles.selectedAddressCard,
            ]}
            onPress={() => setSelectedAddress(address.id)}
          >
            <View style={styles.addressHeader}>
              <Text variant="subtitle1" style={styles.addressName}>
                {address.name}
              </Text>
              {address.isDefault && (
                <View style={styles.defaultBadge}>
                  <Text variant="caption" style={styles.defaultBadgeText}>
                    Default
                  </Text>
                </View>
              )}
            </View>
            <Text style={styles.addressText}>
              {address.street}\n{address.city}, {address.state} {address.zipCode}
            </Text>
            <Text style={styles.addressPhone}>{address.phone}</Text>
            {selectedAddress === address.id && (
              <View style={styles.selectedIndicator}>
                <Ionicons name="checkmark" size={16} color={theme.colors.white} />
              </View>
            )}
          </TouchableOpacity>
        ))}
        
        <TouchableOpacity style={styles.addAddressButton}>
          <Ionicons name="add-circle-outline" size={20} color={theme.colors.primary[500]} />
          <Text style={styles.addAddressText}>Add New Address</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.deliveryInstructions}>
        <Text variant="h6" style={styles.sectionTitle}>Delivery Instructions</Text>
        <TextInput
          style={styles.instructionsInput}
          placeholder="Add delivery instructions (optional)"
          placeholderTextColor={theme.colors.gray[400]}
          multiline
          numberOfLines={3}
          value={deliveryInstructions}
          onChangeText={setDeliveryInstructions}
        />
      </View>
    </View>
  );

  const renderPaymentStep = () => (
    <View style={styles.stepContent}>
      <Text variant="h6" style={styles.sectionTitle}>Payment Method</Text>
      
      <TouchableOpacity 
        style={[
          styles.paymentMethod,
          selectedPayment === 'credit_card' && styles.selectedPaymentMethod,
        ]}
        onPress={() => setSelectedPayment('credit_card')}
      >
        <View style={styles.paymentMethodContent}>
          <Ionicons 
            name={selectedPayment === 'credit_card' ? 'radio-button-on' : 'radio-button-off'} 
            size={24} 
            color={selectedPayment === 'credit_card' ? theme.colors.primary[500] : theme.colors.gray[400]} 
          />
          <View style={styles.paymentMethodInfo}>
            <Text variant="subtitle1">Credit / Debit Card</Text>
            <Text variant="caption" style={styles.paymentMethodDescription}>
              Pay with your credit or debit card
            </Text>
          </View>
          <Ionicons name="card-outline" size={24} color={theme.colors.gray[600]} />
        </View>
        
        {selectedPayment === 'credit_card' && (
          <View style={styles.creditCardForm}>
            <View style={styles.formRow}>
              <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.inputLabel}>Card Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="1234 5678 9012 3456"
                  placeholderTextColor={theme.colors.gray[400]}
                  keyboardType="number-pad"
                />
              </View>
            </View>
            
            <View style={styles.formRow}>
              <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.inputLabel}>Expiry Date</Text>
                <TextInput
                  style={styles.input}
                  placeholder="MM/YY"
                  placeholderTextColor={theme.colors.gray[400]}
                />
              </View>
              
              <View style={[styles.formGroup, { flex: 1 }]}>
                <Text style={styles.inputLabel}>CVV</Text>
                <TextInput
                  style={styles.input}
                  placeholder="123"
                  placeholderTextColor={theme.colors.gray[400]}
                  keyboardType="number-pad"
                  secureTextEntry
                />
              </View>
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.inputLabel}>Name on Card</Text>
              <TextInput
                style={styles.input}
                placeholder="John Doe"
                placeholderTextColor={theme.colors.gray[400]}
              />
            </View>
            
            <View style={styles.savePaymentContainer}>
              <TouchableOpacity 
                style={styles.checkboxContainer}
                onPress={() => setSavePaymentInfo(!savePaymentInfo)}
              >
                <View style={[
                  styles.checkbox,
                  savePaymentInfo && styles.checkboxChecked,
                ]}>
                  {savePaymentInfo && (
                    <Ionicons name="checkmark" size={16} color={theme.colors.white} />
                  )}
                </View>
                <Text style={styles.checkboxLabel}>Save payment information for next time</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[
          styles.paymentMethod,
          selectedPayment === 'paypal' && styles.selectedPaymentMethod,
          { marginTop: 16 }
        ]}
        onPress={() => setSelectedPayment('paypal')}
      >
        <View style={styles.paymentMethodContent}>
          <Ionicons 
            name={selectedPayment === 'paypal' ? 'radio-button-on' : 'radio-button-off'} 
            size={24} 
            color={selectedPayment === 'paypal' ? theme.colors.primary[500] : theme.colors.gray[400]} 
          />
          <View style={styles.paymentMethodInfo}>
            <Text variant="subtitle1">PayPal</Text>
            <Text variant="caption" style={styles.paymentMethodDescription}>
              Pay with your PayPal account
            </Text>
          </View>
          <Ionicons name="logo-paypal" size={24} color="#003087" />
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[
          styles.paymentMethod,
          selectedPayment === 'apple_pay' && styles.selectedPaymentMethod,
          { marginTop: 16 }
        ]}
        onPress={() => setSelectedPayment('apple_pay')}
      >
        <View style={styles.paymentMethodContent}>
          <Ionicons 
            name={selectedPayment === 'apple_pay' ? 'radio-button-on' : 'radio-button-off'} 
            size={24} 
            color={selectedPayment === 'apple_pay' ? theme.colors.primary[500] : theme.colors.gray[400]} 
          />
          <View style={styles.paymentMethodInfo}>
            <Text variant="subtitle1">Apple Pay</Text>
            <Text variant="caption" style={styles.paymentMethodDescription}>
              Pay with Apple Pay
            </Text>
          </View>
          <Ionicons name="logo-apple" size={24} color={theme.colors.gray[900]} />
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[
          styles.paymentMethod,
          selectedPayment === 'google_pay' && styles.selectedPaymentMethod,
          { marginTop: 16 }
        ]}
        onPress={() => setSelectedPayment('google_pay')}
      >
        <View style={styles.paymentMethodContent}>
          <Ionicons 
            name={selectedPayment === 'google_pay' ? 'radio-button-on' : 'radio-button-off'} 
            size={24} 
            color={selectedPayment === 'google_pay' ? theme.colors.primary[500] : theme.colors.gray[400]} 
          />
          <View style={styles.paymentMethodInfo}>
            <Text variant="subtitle1">Google Pay</Text>
            <Text variant="caption" style={styles.paymentMethodDescription}>
              Pay with Google Pay
            </Text>
          </View>
          <Ionicons name="logo-google" size={24} color="#4285F4" />
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderReviewStep = () => {
    const selectedAddressData = addresses.find(addr => addr.id === selectedAddress);
    
    return (
      <View style={styles.stepContent}>
        <Text variant="h6" style={styles.sectionTitle}>Order Summary</Text>
        
        <View style={styles.orderItems}>
          {cartItems.map((item) => (
            <View key={item.id} style={styles.orderItem}>
              <View style={styles.orderItemInfo}>
                <Text style={styles.orderItemName} numberOfLines={1}>
                  {item.quantity}x {item.name}
                </Text>
                <Text style={styles.orderItemPrice}>
                  ${(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            </View>
          ))}
          
          <View style={styles.orderTotalRow}>
            <Text>Subtotal</Text>
            <Text>${calculateSubtotal().toFixed(2)}</Text>
          </View>
          <View style={styles.orderTotalRow}>
            <Text>Delivery Fee</Text>
            <Text>$2.99</Text>
          </View>
          <View style={styles.orderTotalRow}>
            <Text>Tax (8%)</Text>
            <Text>${(calculateSubtotal() * 0.08).toFixed(2)}</Text>
          </View>
          <View style={[styles.orderTotalRow, styles.orderTotal]}>
            <Text variant="subtitle1">Total</Text>
            <Text variant="subtitle1">${calculateTotal().toFixed(2)}</Text>
          </View>
        </View>
        
        <View style={styles.deliveryInfoCard}>
          <View style={styles.deliveryInfoHeader}>
            <Ionicons name="location-outline" size={20} color={theme.colors.primary[500]} />
            <Text variant="subtitle1" style={styles.deliveryInfoTitle}>Delivery Address</Text>
          </View>
          {selectedAddressData && (
            <View style={styles.deliveryAddressInfo}>
              <Text style={styles.deliveryAddressName}>{selectedAddressData.name}</Text>
              <Text style={styles.deliveryAddressText}>
                {selectedAddressData.street}\n{selectedAddressData.city}, {selectedAddressData.state} {selectedAddressData.zipCode}
              </Text>
              <Text style={styles.deliveryAddressPhone}>{selectedAddressData.phone}</Text>
              {deliveryInstructions && (
                <View style={styles.deliveryInstructionsInfo}>
                  <Text style={styles.deliveryInstructionsLabel}>Delivery Instructions:</Text>
                  <Text style={styles.deliveryInstructionsText}>{deliveryInstructions}</Text>
                </View>
              )}
            </View>
          )}
        </View>
        
        <View style={styles.paymentInfoCard}>
          <View style={styles.paymentInfoHeader}>
            <Ionicons name="card-outline" size={20} color={theme.colors.primary[500]} />
            <Text variant="subtitle1" style={styles.paymentInfoTitle}>Payment Method</Text>
          </View>
          <View style={styles.paymentMethodInfo}>
            {selectedPayment === 'credit_card' && (
              <Text>Credit / Debit Card ending in •••• 3456</Text>
            )}
            {selectedPayment === 'paypal' && <Text>PayPal</Text>}
            {selectedPayment === 'apple_pay' && <Text>Apple Pay</Text>}
            {selectedPayment === 'google_pay' && <Text>Google Pay</Text>}
          </View>
        </View>
        
        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            By placing this order, you agree to our{' '}
            <Text style={styles.linkText}>Terms of Service</Text> and{' '}
            <Text style={styles.linkText}>Privacy Policy</Text>.
          </Text>
        </View>
      </View>
    );
  };

  const renderNavigationButtons = () => (
    <View style={styles.navigationButtons}>
      {activeStep > 1 && (
        <Button
          title="Back"
          variant="outline"
          style={styles.backButton}
          onPress={() => setActiveStep(activeStep - 1)}
        />
      )}
      
      <Button
        title={activeStep === 3 ? 'Place Order' : 'Continue'}
        style={[styles.continueButton, { marginLeft: activeStep > 1 ? 12 : 0 }]}
        onPress={() => {
          if (activeStep < 3) {
            setActiveStep(activeStep + 1);
          } else {
            handlePlaceOrder();
          }
        }}
        disabled={isLoading || (activeStep === 2 && !selectedPayment)}
        loading={isLoading}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.gray[900]} />
        </TouchableOpacity>
        <Text variant="h5">Checkout</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Progress Steps */}
      <View style={styles.stepsContainer}>
        {renderStepIndicator()}
        {renderStepLabels()}
      </View>

      {/* Main Content */}
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {renderStepContent()}
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.footer}>
        {renderNavigationButtons()}
      </View>
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
  stepsContainer: {
    backgroundColor: theme.colors.white,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  stepIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.gray[200],
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeStepIndicator: {
    backgroundColor: theme.colors.primary[500],
  },
  completedStepIndicator: {
    backgroundColor: theme.colors.primary[500],
  },
  stepText: {
    color: theme.colors.gray[600],
    fontWeight: '600',
  },
  activeStepText: {
    color: theme.colors.white,
  },
  stepConnector: {
    flex: 1,
    height: 2,
    backgroundColor: theme.colors.gray[200],
    marginHorizontal: 4,
  },
  completedStepConnector: {
    backgroundColor: theme.colors.primary[500],
  },
  stepLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  stepLabel: {
    color: theme.colors.gray[500],
    textAlign: 'center',
    width: 80,
  },
  activeStepLabel: {
    color: theme.colors.primary[500],
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  stepContent: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 16,
    color: theme.colors.gray[900],
  },
  addressesContainer: {
    marginBottom: 24,
  },
  addressCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
  },
  selectedAddressCard: {
    borderColor: theme.colors.primary[500],
    backgroundColor: theme.colors.primary[50],
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  addressName: {
    fontWeight: '600',
    color: theme.colors.gray[900],
    marginRight: 8,
  },
  defaultBadge: {
    backgroundColor: theme.colors.primary[100],
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  defaultBadgeText: {
    color: theme.colors.primary[600],
    fontSize: 10,
    fontWeight: '600',
  },
  addressText: {
    color: theme.colors.gray[700],
    marginBottom: 4,
    lineHeight: 20,
  },
  addressPhone: {
    color: theme.colors.gray[600],
  },
  selectedIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: theme.colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
  addAddressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    borderRadius: 12,
    borderStyle: 'dashed',
  },
  addAddressText: {
    color: theme.colors.primary[500],
    fontWeight: '500',
    marginLeft: 8,
  },
  deliveryInstructions: {
    marginBottom: 24,
  },
  instructionsInput: {
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
    padding: 16,
    height: 100,
    textAlignVertical: 'top',
    color: theme.colors.gray[900],
  },
  paymentMethod: {
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
  },
  selectedPaymentMethod: {
    borderColor: theme.colors.primary[500],
    backgroundColor: theme.colors.primary[50],
  },
  paymentMethodContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentMethodInfo: {
    flex: 1,
    marginLeft: 12,
  },
  paymentMethodDescription: {
    color: theme.colors.gray[600],
  },
  creditCardForm: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[100],
  },
  formRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  formGroup: {
    flex: 1,
  },
  inputLabel: {
    color: theme.colors.gray[700],
    marginBottom: 4,
    fontSize: 14,
  },
  input: {
    backgroundColor: theme.colors.gray[50],
    borderRadius: 8,
    padding: 12,
    color: theme.colors.gray[900],
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
  },
  savePaymentContainer: {
    marginTop: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: theme.colors.gray[400],
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: theme.colors.primary[500],
    borderColor: theme.colors.primary[500],
  },
  checkboxLabel: {
    color: theme.colors.gray[700],
    fontSize: 14,
  },
  orderItems: {
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  orderItem: {
    marginBottom: 12,
  },
  orderItemInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderItemName: {
    flex: 1,
    marginRight: 12,
    color: theme.colors.gray[800],
  },
  orderItemPrice: {
    color: theme.colors.gray[900],
    fontWeight: '600',
  },
  orderTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[100],
  },
  orderTotal: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[200],
  },
  deliveryInfoCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  deliveryInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  deliveryInfoTitle: {
    marginLeft: 8,
    color: theme.colors.gray[900],
  },
  deliveryAddressInfo: {
    paddingLeft: 28,
  },
  deliveryAddressName: {
    fontWeight: '600',
    color: theme.colors.gray[900],
    marginBottom: 4,
  },
  deliveryAddressText: {
    color: theme.colors.gray[700],
    lineHeight: 20,
    marginBottom: 4,
  },
  deliveryAddressPhone: {
    color: theme.colors.gray[600],
    marginBottom: 8,
  },
  deliveryInstructionsInfo: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[100],
  },
  deliveryInstructionsLabel: {
    fontWeight: '600',
    color: theme.colors.gray[700],
    marginBottom: 4,
  },
  deliveryInstructionsText: {
    color: theme.colors.gray[700],
    lineHeight: 20,
  },
  paymentInfoCard: {
    backgroundColor: theme.colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  paymentInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  paymentInfoTitle: {
    marginLeft: 8,
    color: theme.colors.gray[900],
  },
  termsContainer: {
    backgroundColor: theme.colors.gray[50],
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  termsText: {
    color: theme.colors.gray[600],
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
  },
  linkText: {
    color: theme.colors.primary[500],
    textDecorationLine: 'underline',
  },
  footer: {
    backgroundColor: theme.colors.white,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[200],
  },
  navigationButtons: {
    flexDirection: 'row',
  },
  backButton: {
    flex: 1,
    marginRight: 12,
  },
  continueButton: {
    flex: 2,
  },
});

export default CheckoutScreen;
