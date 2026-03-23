import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  description: string;
  category: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  sizes?: string[];
  colors?: string[];
  tags: string[];
  brand: string;
}

interface ProductState {
  products: Product[];
  categories: string[];
  featuredProducts: Product[];
  isLoading: boolean;
  searchQuery: string;
  selectedCategory: string;
  sortBy: 'price-low' | 'price-high' | 'rating' | 'newest';
}

const initialState: ProductState = {
  products: [],
  categories: [],
  featuredProducts: [],
  isLoading: false,
  searchQuery: '',
  selectedCategory: 'All',
  sortBy: 'newest',
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
    setFeaturedProducts: (state, action: PayloadAction<Product[]>) => {
      state.featuredProducts = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setSortBy: (state, action: PayloadAction<'price-low' | 'price-high' | 'rating' | 'newest'>) => {
      state.sortBy = action.payload;
    },
  },
});

export const { 
  setLoading, 
  setProducts, 
  setCategories, 
  setFeaturedProducts, 
  setSearchQuery, 
  setSelectedCategory, 
  setSortBy 
} = productSlice.actions;
export default productSlice.reducer;