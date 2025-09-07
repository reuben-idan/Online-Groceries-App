import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Input, Button, Checkbox } from '../../components/common';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { Ionicons } from '@expo/vector-icons';

type SignUpScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;

export const SignUpScreen = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState({
    password: true,
    confirmPassword: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<SignUpScreenNavigationProp>();

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUp = async () => {
    try {
      setIsLoading(true);
      // TODO: Implement sign up logic
      console.log('Sign up with:', { ...formData, termsAccepted });
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Navigate to main app on success
      navigation.replace('MainTabs');
    } catch (error) {
      console.error('Sign up error:', error);
      // TODO: Show error message to user
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSecureEntry = (field: 'password' | 'confirmPassword') => {
    setSecureTextEntry(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const isFormValid = () => {
    return (
      formData.fullName &&
      formData.email &&
      formData.phone &&
      formData.password &&
      formData.password === formData.confirmPassword &&
      termsAccepted
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text variant="h1" style={styles.title}>
            Create Account
          </Text>
          <Text variant="body" style={styles.subtitle}>
            Fill in your details to get started
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChangeText={(text) => handleChange('fullName', text)}
            leftIcon={<Ionicons name="person-outline" size={20} color={theme.colors.text.secondary} />}
            containerStyle={styles.input}
          />

          <Input
            label="Email Address"
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={(text) => handleChange('email', text)}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            leftIcon={<Ionicons name="mail-outline" size={20} color={theme.colors.text.secondary} />}
            containerStyle={styles.input}
          />

          <Input
            label="Phone Number"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChangeText={(text) => handleChange('phone', text)}
            keyboardType="phone-pad"
            leftIcon={<Ionicons name="call-outline" size={20} color={theme.colors.text.secondary} />}
            containerStyle={styles.input}
          />

          <Input
            label="Password"
            placeholder="Create a password"
            value={formData.password}
            onChangeText={(text) => handleChange('password', text)}
            secureTextEntry={secureTextEntry.password}
            autoCapitalize="none"
            rightIcon={
              <TouchableOpacity onPress={() => toggleSecureEntry('password')}>
                <Ionicons 
                  name={secureTextEntry.password ? 'eye-off-outline' : 'eye-outline'} 
                  size={20} 
                  color={theme.colors.text.secondary} 
                />
              </TouchableOpacity>
            }
            leftIcon={<Ionicons name="lock-closed-outline" size={20} color={theme.colors.text.secondary} />}
            containerStyle={styles.input}
          />

          <Input
            label="Confirm Password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChangeText={(text) => handleChange('confirmPassword', text)}
            secureTextEntry={secureTextEntry.confirmPassword}
            autoCapitalize="none"
            rightIcon={
              <TouchableOpacity onPress={() => toggleSecureEntry('confirmPassword')}>
                <Ionicons 
                  name={secureTextEntry.confirmPassword ? 'eye-off-outline' : 'eye-outline'} 
                  size={20} 
                  color={theme.colors.text.secondary} 
                />
              </TouchableOpacity>
            }
            leftIcon={<Ionicons name="lock-closed-outline" size={20} color={theme.colors.text.secondary} />}
            containerStyle={styles.input}
          />

          <View style={styles.termsContainer}>
            <Checkbox
              value={termsAccepted}
              onValueChange={setTermsAccepted}
              style={styles.checkbox}
            />
            <Text variant="small" style={styles.termsText}>
              I agree to the{' '}
              <Text variant="small" style={styles.termsLink} onPress={() => {}}>
                Terms of Service
              </Text>{' '}
              and{' '}
              <Text variant="small" style={styles.termsLink} onPress={() => {}}>
                Privacy Policy
              </Text>
            </Text>
          </View>

          <Button
            variant="primary"
            onPress={handleSignUp}
            loading={isLoading}
            disabled={!isFormValid()}
            style={styles.signUpButton}
            label="Sign Up"
          />

          <View style={styles.loginContainer}>
            <Text variant="body" style={styles.loginText}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text variant="body" style={styles.loginLink}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  header: {
    marginTop: 16,
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: theme.colors.text.primary,
  },
  subtitle: {
    color: theme.colors.text.secondary,
  },
  form: {
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  checkbox: {
    marginRight: 12,
    marginTop: 4,
  },
  termsText: {
    flex: 1,
    color: theme.colors.text.secondary,
    lineHeight: 20,
  },
  termsLink: {
    color: theme.colors.primary,
  },
  signUpButton: {
    marginBottom: 24,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  loginText: {
    color: theme.colors.text.secondary,
  },
  loginLink: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
});
