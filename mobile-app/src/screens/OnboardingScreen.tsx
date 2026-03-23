import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { lightTheme, darkTheme } from '../theme';
import { Button } from '../components/common/Button';
import { setOnboardingComplete } from '../store/slices/authSlice';

const { width } = Dimensions.get('window');

interface OnboardingScreenProps {
  navigation: any;
}

const onboardingData = [
  {
    id: '1',
    title: 'Discover Amazing Products',
    subtitle: 'Browse through thousands of products from top brands',
    image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg',
  },
  {
    id: '2',
    title: 'Easy Shopping Experience',
    subtitle: 'Add to cart, apply coupons, and checkout seamlessly',
    image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg',
  },
  {
    id: '3',
    title: 'Fast & Secure Delivery',
    subtitle: 'Get your orders delivered quickly and safely to your doorstep',
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
  },
];

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const theme = isDark ? darkTheme : lightTheme;
  const dispatch = useDispatch();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex });
      setCurrentIndex(nextIndex);
    } else {
      handleGetStarted();
    }
  };

  const handleSkip = () => {
    handleGetStarted();
  };

  const handleGetStarted = () => {
    dispatch(setOnboardingComplete());
    navigation.replace('Auth');
  };

  const renderItem = ({ item }: { item: typeof onboardingData[0] }) => (
    <View style={[styles.slide, { backgroundColor: theme.colors.background }]}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text }]}>{item.title}</Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          {item.subtitle}
        </Text>
      </View>
    </View>
  );

  const renderPagination = () => (
    <View style={styles.pagination}>
      {onboardingData.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            {
              backgroundColor:
                index === currentIndex ? theme.colors.primary : theme.colors.border,
            },
          ]}
        />
      ))}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />
      
      {renderPagination()}
      
      <View style={styles.buttonContainer}>
        <Button
          title="Skip"
          onPress={handleSkip}
          variant="outline"
          style={styles.skipButton}
        />
        <Button
          title={currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
          onPress={handleNext}
          style={styles.nextButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 125,
    marginBottom: 48,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 32,
    paddingBottom: 48,
    gap: 16,
  },
  skipButton: {
    flex: 1,
  },
  nextButton: {
    flex: 1,
  },
});