import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { lightTheme, darkTheme } from '../../theme';
import { logout } from '../../store/slices/authSlice';
import { toggleTheme } from '../../store/slices/themeSlice';
import { Ionicons } from '@expo/vector-icons';

interface ProfileScreenProps {
  navigation: any;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const theme = isDark ? darkTheme : lightTheme;
  const dispatch = useDispatch();
  
  const { user } = useSelector((state: RootState) => state.auth);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            dispatch(logout());
            navigation.replace('Auth');
          },
        },
      ]
    );
  };

  const menuItems = [
    {
      id: 'orders',
      title: 'My Orders',
      icon: 'bag-outline',
      onPress: () => {
        Alert.alert('Coming Soon', 'Order history feature will be available soon!');
      },
    },
    {
      id: 'wishlist',
      title: 'Wishlist',
      icon: 'heart-outline',
      badge: wishlistItems.length,
      onPress: () => {
        Alert.alert('Coming Soon', 'Wishlist feature will be available soon!');
      },
    },
    {
      id: 'addresses',
      title: 'Addresses',
      icon: 'location-outline',
      onPress: () => {
        Alert.alert('Coming Soon', 'Address management feature will be available soon!');
      },
    },
    {
      id: 'payment',
      title: 'Payment Methods',
      icon: 'card-outline',
      onPress: () => {
        Alert.alert('Coming Soon', 'Payment methods feature will be available soon!');
      },
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: 'notifications-outline',
      onPress: () => {
        Alert.alert('Coming Soon', 'Notification settings will be available soon!');
      },
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: 'help-circle-outline',
      onPress: () => {
        Alert.alert('Help & Support', 'Contact us at support@eshop.com or call +91 9876543210');
      },
    },
    {
      id: 'about',
      title: 'About',
      icon: 'information-circle-outline',
      onPress: () => {
        Alert.alert('About EShop', 'EShop v1.0.0\nYour Style, Your Choice');
      },
    },
  ];

  const renderMenuItem = (item: typeof menuItems[0]) => (
    <TouchableOpacity
      key={item.id}
      style={[styles.menuItem, { backgroundColor: theme.colors.card }]}
      onPress={item.onPress}
    >
      <View style={styles.menuItemLeft}>
        <Ionicons name={item.icon as any} size={24} color={theme.colors.text} />
        <Text style={[styles.menuItemText, { color: theme.colors.text }]}>
          {item.title}
        </Text>
      </View>
      <View style={styles.menuItemRight}>
        {item.badge && item.badge > 0 && (
          <View style={[styles.badge, { backgroundColor: theme.colors.error }]}>
            <Text style={styles.badgeText}>{item.badge}</Text>
          </View>
        )}
        <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Profile</Text>
      </View>

      {/* User Info */}
      <View style={[styles.userSection, { backgroundColor: theme.colors.card }]}>
        <Image
          source={{
            uri: user?.avatar || 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg',
          }}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={[styles.userName, { color: theme.colors.text }]}>
            {user?.name || 'Guest User'}
          </Text>
          <Text style={[styles.userEmail, { color: theme.colors.textSecondary }]}>
            {user?.email || 'guest@example.com'}
          </Text>
          <Text style={[styles.userPhone, { color: theme.colors.textSecondary }]}>
            {user?.phone || '+91 9876543210'}
          </Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="pencil-outline" size={20} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Theme Toggle */}
      <View style={[styles.themeSection, { backgroundColor: theme.colors.card }]}>
        <View style={styles.themeLeft}>
          <Ionicons
            name={isDark ? 'moon' : 'sunny'}
            size={24}
            color={theme.colors.text}
          />
          <Text style={[styles.themeText, { color: theme.colors.text }]}>
            Dark Mode
          </Text>
        </View>
        <Switch
          value={isDark}
          onValueChange={() => dispatch(toggleTheme())}
          trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
          thumbColor={isDark ? '#FFFFFF' : '#FFFFFF'}
        />
      </View>

      {/* Menu Items */}
      <View style={styles.menuSection}>
        {menuItems.map(renderMenuItem)}
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        style={[styles.logoutButton, { backgroundColor: theme.colors.error }]}
        onPress={handleLogout}
      >
        <Ionicons name="log-out-outline" size={24} color="#FFFFFF" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* App Version */}
      <Text style={[styles.version, { color: theme.colors.textSecondary }]}>
        Version 1.0.0
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  userInfo: {
    flex: 1,
    marginLeft: 16,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    marginBottom: 2,
  },
  userPhone: {
    fontSize: 14,
  },
  editButton: {
    padding: 8,
  },
  themeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  themeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  themeText: {
    fontSize: 16,
    fontWeight: '600',
  },
  menuSection: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 8,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '600',
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 24,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 12,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  version: {
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 32,
  },
});