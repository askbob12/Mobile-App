import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { lightTheme, darkTheme } from '../../theme';
import { setProducts, setCategories, setFeaturedProducts } from '../../store/slices/productSlice';
import { dummyProducts, dummyCategories, dummyBanners } from '../../data/dummyData';
import { SkeletonLoader, ProductCardSkeleton } from '../../components/common/SkeletonLoader';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const theme = isDark ? darkTheme : lightTheme;
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { featuredProducts, isLoading } = useSelector((state: RootState) => state.products);
  const [bannerLoading, setBannerLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    // Simulate API loading
    setTimeout(() => {
      dispatch(setProducts(dummyProducts));
      dispatch(setCategories(dummyCategories));
      dispatch(setFeaturedProducts(dummyProducts.slice(0, 4)));
      setBannerLoading(false);
    }, 1000);
  };

  const renderBanner = ({ item }: { item: typeof dummyBanners[0] }) => (
    <View style={styles.bannerItem}>
      <Image source={{ uri: item.image }} style={styles.bannerImage} />
      <View style={styles.bannerOverlay}>
        <Text style={styles.bannerTitle}>{item.title}</Text>
        <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
      </View>
    </View>
  );

  const renderCategory = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[styles.categoryItem, { backgroundColor: theme.colors.surface }]}
      onPress={() => navigation.navigate('Products', { category: item })}
    >
      <View style={[styles.categoryIcon, { backgroundColor: theme.colors.primary }]}>
        <Ionicons name="shirt-outline" size={24} color="#FFFFFF" />
      </View>
      <Text style={[styles.categoryText, { color: theme.colors.text }]}>{item}</Text>
    </TouchableOpacity>
  );

  const renderProduct = ({ item }: { item: typeof dummyProducts[0] }) => (
    <TouchableOpacity
      style={[styles.productCard, { backgroundColor: theme.colors.card }]}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={[styles.productName, { color: theme.colors.text }]} numberOfLines={2}>
          {item.name}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={[styles.price, { color: theme.colors.primary }]}>₹{item.price}</Text>
          {item.originalPrice && (
            <Text style={[styles.originalPrice, { color: theme.colors.textSecondary }]}>
              ₹{item.originalPrice}
            </Text>
          )}
        </View>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={14} color="#FFD700" />
          <Text style={[styles.rating, { color: theme.colors.textSecondary }]}>
            {item.rating} ({item.reviewCount})
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <View>
          <Text style={[styles.greeting, { color: theme.colors.textSecondary }]}>
            Good Morning
          </Text>
          <Text style={[styles.userName, { color: theme.colors.text }]}>
            {user?.name || 'Guest'}
          </Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <TouchableOpacity
        style={[styles.searchBar, { backgroundColor: theme.colors.surface }]}
        onPress={() => navigation.navigate('Products')}
      >
        <Ionicons name="search-outline" size={20} color={theme.colors.textSecondary} />
        <Text style={[styles.searchText, { color: theme.colors.textSecondary }]}>
          Search products...
        </Text>
      </TouchableOpacity>

      {/* Banners */}
      <View style={styles.section}>
        {bannerLoading ? (
          <SkeletonLoader height={150} borderRadius={12} />
        ) : (
          <FlatList
            data={dummyBanners}
            renderItem={renderBanner}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            style={styles.bannerList}
          />
        )}
      </View>

      {/* Categories */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Categories</Text>
        {bannerLoading ? (
          <View style={styles.categorySkeleton}>
            {[1, 2, 3, 4].map((i) => (
              <SkeletonLoader key={i} width={80} height={80} borderRadius={40} />
            ))}
          </View>
        ) : (
          <FlatList
            data={dummyCategories.slice(1, 5)}
            renderItem={renderCategory}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
          />
        )}
      </View>

      {/* Featured Products */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Featured Products
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Products')}>
            <Text style={[styles.seeAll, { color: theme.colors.primary }]}>See All</Text>
          </TouchableOpacity>
        </View>
        
        {isLoading || bannerLoading ? (
          <FlatList
            data={[1, 2, 3, 4]}
            renderItem={() => <ProductCardSkeleton />}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <FlatList
            data={featuredProducts}
            renderItem={renderProduct}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productList}
          />
        )}
      </View>
    </ScrollView>
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
  greeting: {
    fontSize: 14,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  notificationButton: {
    padding: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
  },
  searchText: {
    fontSize: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
  },
  bannerList: {
    paddingLeft: 20,
  },
  bannerItem: {
    width: width - 40,
    height: 150,
    marginRight: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bannerSubtitle: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  categorySkeleton: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 16,
  },
  categoryList: {
    paddingHorizontal: 20,
    gap: 16,
  },
  categoryItem: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    minWidth: 80,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  productList: {
    paddingHorizontal: 20,
    gap: 16,
  },
  productCard: {
    width: 160,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productImage: {
    width: '100%',
    height: 120,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  originalPrice: {
    fontSize: 12,
    textDecorationLine: 'line-through',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 12,
  },
});