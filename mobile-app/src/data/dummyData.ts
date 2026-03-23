import { Product } from '../store/slices/productSlice';

export const dummyProducts: Product[] = [
  {
    id: '1',
    name: 'Classic Cotton T-Shirt',
    price: 599,
    originalPrice: 799,
    image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg',
    images: [
      'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg',
      'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg',
    ],
    description: 'Comfortable cotton t-shirt perfect for everyday wear. Made from 100% organic cotton.',
    category: 'T-Shirts',
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Navy', 'Gray'],
    tags: ['casual', 'cotton', 'comfortable'],
    brand: 'StyleCo',
  },
  {
    id: '2',
    name: 'Slim Fit Jeans',
    price: 1299,
    originalPrice: 1599,
    image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg',
    images: [
      'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg',
      'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg',
    ],
    description: 'Premium slim fit jeans with stretch fabric for comfort and style.',
    category: 'Jeans',
    rating: 4.3,
    reviewCount: 89,
    inStock: true,
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Blue', 'Black', 'Gray'],
    tags: ['denim', 'slim-fit', 'stretch'],
    brand: 'DenimCo',
  },
  {
    id: '3',
    name: 'Running Sneakers',
    price: 2499,
    originalPrice: 2999,
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
    images: [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
    ],
    description: 'Lightweight running sneakers with advanced cushioning technology.',
    category: 'Shoes',
    rating: 4.7,
    reviewCount: 256,
    inStock: true,
    sizes: ['7', '8', '9', '10', '11'],
    colors: ['White', 'Black', 'Blue', 'Red'],
    tags: ['running', 'sports', 'comfortable'],
    brand: 'SportMax',
  },
  {
    id: '4',
    name: 'Casual Hoodie',
    price: 899,
    originalPrice: 1199,
    image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg',
    images: [
      'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg',
      'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg',
    ],
    description: 'Cozy hoodie perfect for casual outings and lounging.',
    category: 'Hoodies',
    rating: 4.4,
    reviewCount: 67,
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Gray', 'Black', 'Navy', 'Maroon'],
    tags: ['casual', 'warm', 'comfortable'],
    brand: 'ComfortWear',
  },
  {
    id: '5',
    name: 'Formal Shirt',
    price: 799,
    originalPrice: 999,
    image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg',
    images: [
      'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg',
      'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg',
    ],
    description: 'Professional formal shirt for office and business meetings.',
    category: 'Shirts',
    rating: 4.2,
    reviewCount: 45,
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Blue', 'Light Blue', 'Pink'],
    tags: ['formal', 'office', 'professional'],
    brand: 'FormalCo',
  },
];

export const dummyCategories = ['All', 'T-Shirts', 'Jeans', 'Shoes', 'Hoodies', 'Shirts'];

export const dummyBanners = [
  {
    id: '1',
    image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg',
    title: 'Summer Sale',
    subtitle: 'Up to 50% Off',
  },
  {
    id: '2',
    image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg',
    title: 'New Arrivals',
    subtitle: 'Latest Fashion Trends',
  },
];

export const dummyUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+91 9876543210',
  avatar: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg',
};

export const dummyOrders = [
  {
    id: 'ORD001',
    date: '2024-01-15',
    status: 'Delivered',
    total: 1899,
    items: [
      { id: '1', name: 'Classic Cotton T-Shirt', quantity: 2, price: 599 },
      { id: '3', name: 'Running Sneakers', quantity: 1, price: 2499 },
    ],
  },
  {
    id: 'ORD002',
    date: '2024-01-10',
    status: 'Shipped',
    total: 1299,
    items: [
      { id: '2', name: 'Slim Fit Jeans', quantity: 1, price: 1299 },
    ],
  },
];