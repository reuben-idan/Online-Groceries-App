import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Input, Button } from '../../components/common';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { Ionicons } from '@expo/vector-icons';

type ForgotPasswordScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ForgotPassword'>;

export const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();

  const handleResetPassword = async () => {
    try {
      setIsLoading(true);
      // TODO: Implement password reset logic
      console.log('Reset password for:', email);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEmailSent(true);
    } catch (error) {
      console.error('Password reset error:', error);
      // TODO: Show error message to user
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigation.goBack();
  };

  if (emailSent) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Ionicons name="mail-open-outline" size={64} color={theme.colors.primary} />
          </View>
          
          <Text variant="h2" style={styles.title}>
            Check Your Email
          </Text>
          
          <Text variant="body" style={styles.subtitle}>
            We've sent a password reset link to
          </Text>
          
          <Text variant="body" style={styles.emailText}>
            {email}
          </Text>
          
          <Text variant="body" style={styles.instructionText}>
            Please check your email and follow the instructions to reset your password.
          </Text>
          
          <Button
            variant="primary"
            onPress={handleBackToLogin}
            style={styles.button}
            label="Back to Login"
          />
          
          <View style={styles.resendContainer}>
            <Text variant="small" style={styles.resendText}>
              Didn't receive the email?{' '}
            </Text>
            <TouchableOpacity onPress={handleResetPassword} disabled={isLoading}>
              <Text variant="small" style={styles.resendLink}>
                Resend
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text variant="h1" style={styles.title}>
            Forgot Password
          </Text>
          <Text variant="body" style={styles.subtitle}>
            Enter your email address and we'll send you a link to reset your password
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Email Address"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            leftIcon={<Ionicons name="mail-outline" size={20} color={theme.colors.text.secondary} />}
            containerStyle={styles.input}
          />

          <Button
            variant="primary"
            onPress={handleResetPassword}
            loading={isLoading}
            disabled={!email}
            style={styles.resetButton}
            label="Send Reset Link"
          />

          <View style={styles.footer}>
            <Text variant="body" style={styles.footerText}>
              Remember your password?{' '}
            </Text>
            <TouchableOpacity onPress={handleBackToLogin}>
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
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  header: {
    marginTop: 32,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    color: theme.colors.text.primary,
    textAlign: 'center',
  },
  subtitle: {
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  emailText: {
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 24,
  },
  instructionText: {
    textAlign: 'center',
    color: theme.colors.text.secondary,
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  form: {
    marginBottom: 24,
  },
  input: {
    marginBottom: 24,
  },
  resetButton: {
    marginBottom: 24,
  },
  button: {
    marginBottom: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  footerText: {
    color: theme.colors.text.secondary,
  },
  loginLink: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  resendText: {
    color: theme.colors.text.secondary,
  },
  resendLink: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
});
