import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { lightTheme, darkTheme } from '../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { restoreAuth } from '../store/slices/authSlice';
import { restoreCart } from '../store/slices/cartSlice';
import { restoreWishlist } from '../store/slices/wishlistSlice';
import { setTheme } from '../store/slices/themeSlice';

interface SplashScreenProps {
  navigation: any;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const theme = isDark ? darkTheme : lightTheme;
  const dispatch = useDispatch();
  
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.5);

  useEffect(() => {
    // Animate logo
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Restore app state
    restoreAppState();
  }, []);

  const restoreAppState = async () => {
    try {
      // Restore theme
      const themeData = await AsyncStorage.getItem('theme');
      if (themeData) {
        const theme = JSON.parse(themeData);
        dispatch(setTheme(theme));
      }

      // Restore auth
      const token = await AsyncStorage.getItem('token');
      const userData = await AsyncStorage.getItem('user');
      const onboardingComplete = await AsyncStorage.getItem('onboardingComplete');

      if (token && userData) {
        dispatch(restoreAuth({
          token,
          user: JSON.parse(userData),
          onboardingComplete: !!onboardingComplete,
        }));
      }

      // Restore cart
      const cartData = await AsyncStorage.getItem('cart');
      if (cartData) {
        dispatch(restoreCart(JSON.parse(cartData)));
      }

      // Restore wishlist
      const wishlistData = await AsyncStorage.getItem('wishlist');
      if (wishlistData) {
        dispatch(restoreWishlist(JSON.parse(wishlistData)));
      }

      // Navigate after 2 seconds
      setTimeout(() => {
        if (token && onboardingComplete) {
          navigation.replace('Main');
        } else if (onboardingComplete) {
          navigation.replace('Auth');
        } else {
          navigation.replace('Onboarding');
        }
      }, 2000);
    } catch (error) {
      console.error('Error restoring app state:', error);
      setTimeout(() => {
        navigation.replace('Onboarding');
      }, 2000);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={[styles.logo, { backgroundColor: theme.colors.primary }]}>
          <Text style={styles.logoText}>E</Text>
        </View>
        <Text style={[styles.appName, { color: theme.colors.text }]}>EShop</Text>
        <Text style={[styles.tagline, { color: theme.colors.textSecondary }]}>
          Your Style, Your Choice
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    fontStyle: 'italic',
  },
});