import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { lightTheme, darkTheme } from '../../theme';

interface SkeletonLoaderProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: any;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width = '100%',
  height = 20,
  borderRadius = 4,
  style,
}) => {
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const theme = isDark ? darkTheme : lightTheme;
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => animate());
    };
    animate();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: theme.colors.border,
          opacity,
        },
        style,
      ]}
    />
  );
};

export const ProductCardSkeleton: React.FC = () => {
  return (
    <View style={styles.productCard}>
      <SkeletonLoader height={150} borderRadius={8} style={styles.image} />
      <View style={styles.content}>
        <SkeletonLoader height={16} width="80%" style={styles.title} />
        <SkeletonLoader height={14} width="60%" style={styles.price} />
        <SkeletonLoader height={12} width="40%" style={styles.rating} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productCard: {
    width: 160,
    marginRight: 16,
  },
  image: {
    marginBottom: 8,
  },
  content: {
    paddingHorizontal: 4,
  },
  title: {
    marginBottom: 4,
  },
  price: {
    marginBottom: 4,
  },
  rating: {
    marginBottom: 4,
  },
});