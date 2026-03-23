import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { lightTheme, darkTheme } from '../../theme';
import { setProducts, setSearchQuery, setSelectedCategory, setSortBy } from '../../store/slices/productSlice';
import { dummyProducts, dummyCategories } from '../../data/dummyData';
import { ProductCardSkeleton } from '../../components/common/SkeletonLoader';
import { Ionicons } from '@expo/vector-icons';

interface ProductListScreenProps {
  navigation: any;
  route: any;
}

export const ProductListScreen: React.FC<ProductListScreenProps> = ({ navigation, route }) => {
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const theme = isDark ? darkTheme : lightTheme;
  const dispatch = useDispatch();
  
  const { products, searchQuery, selectedCategory, sortBy, isLoading } = useSelector(
    (state: RootState) => state.products
  );
  const [filteredProducts, setFilteredProducts] = useState(dummyProducts);

  useEffect(() => {
    if (route.params?.category) {
      dispatch(setSelectedCategory(route.params.category));
    }
    dispatch(setProducts(dummyProducts));
  }, [route.params]);

  useEffect(() => {
    filterProducts();
  }, [products, searchQuery, selectedCategory, sortBy]);

  const filterProducts = () => {
    let filtered = [...products];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
      default:
        // Keep original order for newest
        break;
    }

    setFilteredProducts(filtered);
  };

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
        <Text style={[styles.productBrand, { color: theme.colors.textSecondary }]}>
          {item.brand}
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

  const renderCategory = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[
        styles.categoryChip,
        {
          backgroundColor: selectedCategory === item ? theme.colors.primary : theme.colors.surface,
        },
      ]}
      onPress={() => dispatch(setSelectedCategory(item))}
    >
      <Text
        style={[
          styles.categoryChipText,
          {
            color: selectedCategory === item ? '#FFFFFF' : theme.colors.text,
          },
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Products</Text>
        <TouchableOpacity>
          <Ionicons name="filter-outline" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: theme.colors.surface }]}>
        <Ionicons name="search-outline" size={20} color={theme.colors.textSecondary} />
        <TextInput
          style={[styles.searchInput, { color: theme.colors.text }]}
          placeholder="Search products..."
          placeholderTextColor={theme.colors.placeholder}
          value={searchQuery}
          onChangeText={(text) => dispatch(setSearchQuery(text))}
        />
      </View>

      {/* Categories */}
      <FlatList
        data={dummyCategories}
        renderItem={renderCategory}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
        style={styles.categoryContainer}
      />

      {/* Sort Options */}
      <View style={styles.sortContainer}>
        <Text style={[styles.sortLabel, { color: theme.colors.text }]}>Sort by:</Text>
        <TouchableOpacity
          style={[styles.sortButton, { backgroundColor: theme.colors.surface }]}
          onPress={() => {
            // Toggle sort options
            const sortOptions = ['newest', 'price-low', 'price-high', 'rating'];
            const currentIndex = sortOptions.indexOf(sortBy);
            const nextIndex = (currentIndex + 1) % sortOptions.length;
            dispatch(setSortBy(sortOptions[nextIndex] as any));
          }}
        >
          <Text style={[styles.sortButtonText, { color: theme.colors.text }]}>
            {sortBy === 'price-low' ? 'Price: Low to High' :
             sortBy === 'price-high' ? 'Price: High to Low' :
             sortBy === 'rating' ? 'Rating' : 'Newest'}
          </Text>
          <Ionicons name="chevron-down" size={16} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      {/* Products Grid */}
      {isLoading ? (
        <FlatList
          data={[1, 2, 3, 4, 5, 6]}
          renderItem={() => <ProductCardSkeleton />}
          numColumns={2}
          contentContainerStyle={styles.productGrid}
        />
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          numColumns={2}
          contentContainerStyle={styles.productGrid}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 12,
  },
  sortLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },
  sortButtonText: {
    fontSize: 14,
  },
  productGrid: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  productCard: {
    flex: 1,
    margin: 8,
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
    height: 150,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  productBrand: {
    fontSize: 12,
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