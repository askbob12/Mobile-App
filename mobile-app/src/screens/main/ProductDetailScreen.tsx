import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { lightTheme, darkTheme } from '../../theme';
import { addToCart } from '../../store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../store/slices/wishlistSlice';
import { Button } from '../../components/common/Button';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get('window');

interface ProductDetailScreenProps {
  navigation: any;
  route: any;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ navigation, route }) => {
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const theme = isDark ? darkTheme : lightTheme;
  const dispatch = useDispatch();
  
  const { product } = route.params;
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const isInWishlist = wishlistItems.some(item => item.id === product.id);
  
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const scaleAnim = new Animated.Value(1);

  const handleAddToCart = () => {
    // Animate button
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
    }));

    Toast.show({
      type: 'success',
      text1: 'Added to Cart',
      text2: `${product.name} has been added to your cart`,
    });
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
      Toast.show({
        type: 'info',
        text1: 'Removed from Wishlist',
      });
    } else {
      dispatch(addToWishlist(product));
      Toast.show({
        type: 'success',
        text1: 'Added to Wishlist',
      });
    }
  };

  const renderSizeOption = (size: string) => (
    <TouchableOpacity
      key={size}
      style={[
        styles.sizeOption,
        {
          backgroundColor: selectedSize === size ? theme.colors.primary : theme.colors.surface,
          borderColor: selectedSize === size ? theme.colors.primary : theme.colors.border,
        },
      ]}
      onPress={() => setSelectedSize(size)}
    >
      <Text
        style={[
          styles.sizeText,
          {
            color: selectedSize === size ? '#FFFFFF' : theme.colors.text,
          },
        ]}
      >
        {size}
      </Text>
    </TouchableOpacity>
  );

  const renderColorOption = (color: string) => (
    <TouchableOpacity
      key={color}
      style={[
        styles.colorOption,
        {
          backgroundColor: color.toLowerCase(),
          borderColor: selectedColor === color ? theme.colors.primary : theme.colors.border,
          borderWidth: selectedColor === color ? 3 : 1,
        },
      ]}
      onPress={() => setSelectedColor(color)}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Product Details</Text>
        <TouchableOpacity onPress={handleWishlistToggle}>
          <Ionicons
            name={isInWishlist ? "heart" : "heart-outline"}
            size={24}
            color={isInWishlist ? theme.colors.error : theme.colors.text}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Images */}
        <View style={styles.imageContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / width);
              setCurrentImageIndex(index);
            }}
          >
            {product.images.map((image: string, index: number) => (
              <Image key={index} source={{ uri: image }} style={styles.productImage} />
            ))}
          </ScrollView>
          
          {/* Image Indicators */}
          <View style={styles.imageIndicators}>
            {product.images.map((_: any, index: number) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  {
                    backgroundColor:
                      index === currentImageIndex ? theme.colors.primary : theme.colors.border,
                  },
                ]}
              />
            ))}
          </View>
        </View>

        {/* Product Info */}
        <View style={[styles.productInfo, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.productName, { color: theme.colors.text }]}>{product.name}</Text>
          <Text style={[styles.productBrand, { color: theme.colors.textSecondary }]}>
            {product.brand}
          </Text>
          
          <View style={styles.priceContainer}>
            <Text style={[styles.price, { color: theme.colors.primary }]}>₹{product.price}</Text>
            {product.originalPrice && (
              <Text style={[styles.originalPrice, { color: theme.colors.textSecondary }]}>
                ₹{product.originalPrice}
              </Text>
            )}
            {product.originalPrice && (
              <View style={[styles.discountBadge, { backgroundColor: theme.colors.success }]}>
                <Text style={styles.discountText}>
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </Text>
              </View>
            )}
          </View>

          <View style={styles.ratingContainer}>
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons
                  key={star}
                  name="star"
                  size={16}
                  color={star <= Math.floor(product.rating) ? "#FFD700" : theme.colors.border}
                />
              ))}
            </View>
            <Text style={[styles.ratingText, { color: theme.colors.textSecondary }]}>
              {product.rating} ({product.reviewCount} reviews)
            </Text>
          </View>

          {/* Size Selection */}
          {product.sizes && (
            <View style={styles.optionSection}>
              <Text style={[styles.optionTitle, { color: theme.colors.text }]}>Size</Text>
              <View style={styles.sizeContainer}>
                {product.sizes.map(renderSizeOption)}
              </View>
            </View>
          )}

          {/* Color Selection */}
          {product.colors && (
            <View style={styles.optionSection}>
              <Text style={[styles.optionTitle, { color: theme.colors.text }]}>Color</Text>
              <View style={styles.colorContainer}>
                {product.colors.map(renderColorOption)}
              </View>
            </View>
          )}

          {/* Description */}
          <View style={styles.optionSection}>
            <Text style={[styles.optionTitle, { color: theme.colors.text }]}>Description</Text>
            <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
              {product.description}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={[styles.bottomActions, { backgroundColor: theme.colors.card }]}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={[styles.quantityButton, { backgroundColor: theme.colors.surface }]}
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Ionicons name="remove" size={20} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={[styles.quantityText, { color: theme.colors.text }]}>{quantity}</Text>
          <TouchableOpacity
            style={[styles.quantityButton, { backgroundColor: theme.colors.surface }]}
            onPress={() => setQuantity(quantity + 1)}
          >
            <Ionicons name="add" size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
        
        <Animated.View style={{ transform: [{ scale: scaleAnim }], flex: 1 }}>
          <Button
            title="Add to Cart"
            onPress={handleAddToCart}
            style={styles.addToCartButton}
          />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  imageContainer: {
    position: 'relative',
  },
  productImage: {
    width,
    height: 300,
  },
  imageIndicators: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  productInfo: {
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productBrand: {
    fontSize: 16,
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  originalPrice: {
    fontSize: 18,
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 8,
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingText: {
    fontSize: 14,
  },
  optionSection: {
    marginBottom: 24,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  sizeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  sizeOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  sizeText: {
    fontSize: 16,
    fontWeight: '600',
  },
  colorContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  colorOption: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  bottomActions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    minWidth: 30,
    textAlign: 'center',
  },
  addToCartButton: {
    flex: 1,
  },
});