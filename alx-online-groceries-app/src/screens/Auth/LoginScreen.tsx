import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Input, Button, Divider } from '../../components/common';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { Ionicons } from '@expo/vector-icons';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      // TODO: Implement login logic
      console.log('Login with:', { email, password });
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Navigate to main app on success
      navigation.replace('MainTabs');
    } catch (error) {
      console.error('Login error:', error);
      // TODO: Show error message to user
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToSignUp = () => {
    navigation.navigate('SignUp');
  };

  const navigateToForgotPassword = () => {
    navigation.navigate('ForgotPassword');
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
      >
        <View style={styles.header}>
          <Text variant="h1" style={styles.title}>
            Welcome Back
          </Text>
          <Text variant="body" style={styles.subtitle}>
            Sign in to continue
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            leftIcon={<Ionicons name="mail-outline" size={20} color={theme.colors.text.secondary} />}
            containerStyle={styles.input}
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureTextEntry}
            autoCapitalize="none"
            rightIcon={
              <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
                <Ionicons 
                  name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'} 
                  size={20} 
                  color={theme.colors.text.secondary} 
                />
              </TouchableOpacity>
            }
            leftIcon={<Ionicons name="lock-closed-outline" size={20} color={theme.colors.text.secondary} />}
            containerStyle={styles.input}
          />

          <TouchableOpacity 
            onPress={navigateToForgotPassword}
            style={styles.forgotPasswordContainer}
          >
            <Text variant="small" style={styles.forgotPasswordText}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

          <Button
            variant="primary"
            onPress={handleLogin}
            loading={isLoading}
            disabled={!email || !password}
            style={styles.loginButton}
            label="Sign In"
          />

          <View style={styles.dividerContainer}>
            <Divider style={styles.divider} />
            <Text variant="small" style={styles.orText}>OR</Text>
            <Divider style={styles.divider} />
          </View>

          <Button
            variant="outline"
            onPress={() => {}}
            icon={<Ionicons name="logo-google" size={20} color={theme.colors.text.primary} style={styles.socialIcon} />}
            style={styles.socialButton}
            label="Continue with Google"
          />

          <Button
            variant="outline"
            onPress={() => {}}
            icon={<Ionicons name="logo-facebook" size={20} color={theme.colors.primary} style={styles.socialIcon} />}
            style={styles.socialButton}
            label="Continue with Facebook"
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text variant="body" style={styles.footerText}>
          Don't have an account?{' '}
        </Text>
        <TouchableOpacity onPress={navigateToSignUp}>
          <Text variant="body" style={styles.signUpText}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
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
    marginTop: 32,
    marginBottom: 40,
    alignItems: 'center',
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
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: theme.colors.primary,
  },
  loginButton: {
    marginBottom: 16,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    backgroundColor: theme.colors.border,
    height: 1,
  },
  orText: {
    marginHorizontal: 12,
    color: theme.colors.text.secondary,
  },
  socialButton: {
    marginBottom: 12,
    borderColor: theme.colors.border,
  },
  socialIcon: {
    marginRight: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.background,
  },
  footerText: {
    color: theme.colors.text.secondary,
  },
  signUpText: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
});
