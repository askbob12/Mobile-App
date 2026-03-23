# EShop - Production-Ready eCommerce Platform

A complete eCommerce solution with React Native mobile app and React admin dashboard.

## 🚀 Features

### 📱 Mobile App (React Native/Expo)
- **Authentication**: Login/Register with JWT tokens
- **Onboarding**: Beautiful 3-slide introduction
- **Home Screen**: Banners, categories, featured products
- **Product Catalog**: Search, filter, sort with infinite scroll
- **Product Details**: Image gallery, reviews, variants
- **Shopping Cart**: Add/remove items, quantity management, coupons
- **User Profile**: Order history, wishlist, theme toggle
- **Theme Support**: Light/Dark mode with system detection
- **Animations**: Smooth transitions and micro-interactions
- **Offline Support**: Local storage for cart, wishlist, preferences

### 💻 Admin Dashboard (React)
- **Dashboard**: Analytics overview with charts
- **Product Management**: CRUD operations, inventory tracking
- **Order Management**: Status updates, order details
- **User Management**: User profiles, activity tracking
- **Analytics**: Sales trends, top products, revenue charts
- **Settings**: Profile, notifications, system configuration
- **Theme Support**: Light/Dark mode toggle
- **Responsive Design**: Works on all screen sizes

## 🛠 Tech Stack

### Mobile App
- **React Native** with Expo
- **Redux Toolkit** for state management
- **React Navigation** for routing
- **React Native Reanimated** for animations
- **AsyncStorage** for local persistence
- **TypeScript** for type safety

### Admin Dashboard
- **React** with TypeScript
- **Redux Toolkit** for state management
- **Material-UI** for components
- **Recharts** for analytics
- **React Router** for navigation
- **React Hook Form** for forms

## 📦 Installation & Setup

### Prerequisites
- Node.js 16+
- npm or yarn
- Expo CLI (for mobile app)

### Mobile App Setup
```bash
cd mobile-app
npm install
npm start
```

### Admin Dashboard Setup
```bash
cd admin-dashboard
npm install
npm start
```

## 🎯 Demo Credentials

### Mobile App
- **Email**: john@example.com
- **Password**: password123

### Admin Dashboard
- **Email**: admin@eshop.com
- **Password**: admin123

## 📱 Mobile App Screens

1. **Splash Screen** - Animated logo with app initialization
2. **Onboarding** - 3 slides introducing app features
3. **Authentication** - Login/Register forms
4. **Home** - Banners, categories, featured products
5. **Products** - Product listing with filters
6. **Product Detail** - Detailed product view
7. **Cart** - Shopping cart management
8. **Profile** - User profile and settings

## 💻 Admin Dashboard Pages

1. **Dashboard** - Overview with key metrics
2. **Products** - Product management (CRUD)
3. **Orders** - Order tracking and management
4. **Users** - User management
5. **Analytics** - Sales and performance analytics
6. **Settings** - System and profile settings

## 🎨 Design Features

- **Modern UI/UX** with clean, intuitive design
- **Responsive Layout** for all screen sizes
- **Smooth Animations** and micro-interactions
- **Skeleton Loaders** for better UX
- **Dark/Light Theme** support
- **Consistent Color Scheme** across platforms

## 📊 Dummy Data

The app comes pre-loaded with:
- **30+ Products** across multiple categories
- **Sample Users** with realistic profiles
- **Order History** with various statuses
- **Analytics Data** for dashboard charts

## 🔧 Configuration

### Environment Variables

Create `.env` files in both directories:

**Mobile App (.env)**
```
EXPO_PUBLIC_API_URL=http://localhost:3001
```

**Admin Dashboard (.env)**
```
REACT_APP_API_URL=http://localhost:3001
```

## 🚀 Deployment

### Mobile App
```bash
cd mobile-app
expo build:android
expo build:ios
```

### Admin Dashboard
```bash
cd admin-dashboard
npm run build
```

## 📝 API Documentation

The app uses dummy data but is structured to easily integrate with a real backend API. Key endpoints would include:

- `POST /auth/login` - User authentication
- `GET /products` - Fetch products
- `POST /orders` - Create order
- `GET /users` - Fetch users (admin)

## 🎯 Key Features Implemented

✅ **Authentication & Authorization**
✅ **Product Catalog with Search/Filter**
✅ **Shopping Cart & Checkout**
✅ **Order Management**
✅ **User Profile Management**
✅ **Admin Dashboard**
✅ **Analytics & Reporting**
✅ **Theme Support**
✅ **Responsive Design**
✅ **Local Storage**
✅ **Animations & Transitions**
✅ **Error Handling**
✅ **Loading States**

## 🔮 Future Enhancements

- Real-time notifications
- Payment gateway integration
- Push notifications
- Social media login
- Product reviews system
- Wishlist sharing
- Advanced analytics
- Multi-language support

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For support, email support@eshop.com or create an issue in the repository.

---

**Built with ❤️ for modern eCommerce needs**