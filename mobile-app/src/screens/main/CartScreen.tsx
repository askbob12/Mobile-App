import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { lightTheme, darkTheme } from '../../theme';
import { updateQuantity, removeFromCart, applyCoupon, clearCart } from '../../store/slices/cartSlice';
import { Button } from '../../components/common/Button';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

interface CartScreenProps {
  navigation: any;
}

export const CartScreen: React.FC<CartScreenProps> = ({ navigation }) => {
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const theme = isDark ? darkTheme : lightTheme;
  const dispatch = useDispatch();
  
  const { items, total, itemCount, discount, couponCode } = useSelector(
    (state: RootState) => state.cart
  );
  const [couponInput, setCouponInput] = React.useState('');

  const handleQuantityChange = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemoveItem = (id: string, name: string) => {
    Alert.alert(
      'Remove Item',
      `Are you sure you want to remove ${name} from your cart?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            dispatch(removeFromCart(id));
            Toast.show({
              type: 'info',
              text1: 'Item Removed',
              text2: `${name} has been removed from your cart`,
            });
          },
        },
      ]
    );
  };

  const handleApplyCoupon = () => {
    if (!couponInput.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Coupon',
        text2: 'Please enter a coupon code',
      });
      return;
    }

    dispatch(applyCoupon(couponInput.toUpperCase()));
    
    if (couponInput.toUpperCase() === 'SAVE10' || couponInput.toUpperCase() === 'SAVE20') {
      Toast.show({
        type: 'success',
        text1: 'Coupon Applied',
        text2: `${couponInput.toUpperCase()} has been applied successfully`,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Invalid Coupon',
        text2: 'Please enter a valid coupon code',
      });
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Empty Cart',
        text2: 'Please add items to your cart before checkout',
      });
      return;
    }

    // Simulate checkout process
    Alert.alert(
      'Order Placed Successfully!',
      `Your order of ₹${(total - discount).toFixed(2)} has been placed successfully.`,
      [
        {
          text: 'OK',
          onPress: () => {
            dispatch(clearCart());
            Toast.show({
              type: 'success',
              text1: 'Order Placed',
              text2: 'Thank you for your purchase!',
            });
          },
        },
      ]
    );
  };

  const renderCartItem = ({ item }: { item: any }) => (
    <View style={[styles.cartItem, { backgroundColor: theme.colors.card }]}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={[styles.itemName, { color: theme.colors.text }]} numberOfLines={2}>
          {item.name}
        </Text>
        {item.size && (
          <Text style={[styles.itemVariant, { color: theme.colors.textSecondary }]}>
            Size: {item.size}
          </Text>
        )}
        {item.color && (
          <Text style={[styles.itemVariant, { color: theme.colors.textSecondary }]}>
            Color: {item.color}
          </Text>
        )}
        <Text style={[styles.itemPrice, { color: theme.colors.primary }]}>
          ₹{item.price}
        </Text>
      </View>
      <View style={styles.itemActions}>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemoveItem(item.id, item.name)}
        >
          <Ionicons name="trash-outline" size={20} color={theme.colors.error} />
        </TouchableOpacity>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={[styles.quantityButton, { backgroundColor: theme.colors.surface }]}
            onPress={() => handleQuantityChange(item.id, item.quantity - 1)}
          >
            <Ionicons name="remove" size={16} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={[styles.quantityText, { color: theme.colors.text }]}>
            {item.quantity}
          </Text>
          <TouchableOpacity
            style={[styles.quantityButton, { backgroundColor: theme.colors.surface }]}
            onPress={() => handleQuantityChange(item.id, item.quantity + 1)}
          >
            <Ionicons name="add" size={16} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (items.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Cart</Text>
        </View>
        <View style={styles.emptyCart}>
          <Ionicons name="bag-outline" size={80} color={theme.colors.textSecondary} />
          <Text style={[styles.emptyCartTitle, { color: theme.colors.text }]}>
            Your cart is empty
          </Text>
          <Text style={[styles.emptyCartSubtitle, { color: theme.colors.textSecondary }]}>
            Add some products to get started
          </Text>
          <Button
            title="Start Shopping"
            onPress={() => navigation.navigate('Products')}
            style={styles.startShoppingButton}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          Cart ({itemCount} items)
        </Text>
        <TouchableOpacity onPress={() => dispatch(clearCart())}>
          <Text style={[styles.clearCart, { color: theme.colors.error }]}>Clear All</Text>
        </TouchableOpacity>
      </View>

      {/* Cart Items */}
      <FlatList
        data={items}
        renderItem={renderCartItem}
        keyExtractor={(item) => `${item.id}-${item.size}-${item.color}`}
        contentContainerStyle={styles.cartList}
        showsVerticalScrollIndicator={false}
      />

      {/* Coupon Section */}
      <View style={[styles.couponSection, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.couponTitle, { color: theme.colors.text }]}>Apply Coupon</Text>
        <View style={styles.couponContainer}>
          <TextInput
            style={[
              styles.couponInput,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
                color: theme.colors.text,
              },
            ]}
            placeholder="Enter coupon code (SAVE10, SAVE20)"
            placeholderTextColor={theme.colors.placeholder}
            value={couponInput}
            onChangeText={setCouponInput}
            autoCapitalize="characters"
          />
          <Button
            title="Apply"
            onPress={handleApplyCoupon}
            size="small"
            style={styles.applyButton}
          />
        </View>
        {couponCode && discount > 0 && (
          <Text style={[styles.couponApplied, { color: theme.colors.success }]}>
            Coupon {couponCode} applied! You saved ₹{discount.toFixed(2)}
          </Text>
        )}
      </View>

      {/* Order Summary */}
      <View style={[styles.orderSummary, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.summaryTitle, { color: theme.colors.text }]}>Order Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
            Subtotal ({itemCount} items)
          </Text>
          <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
            ₹{total.toFixed(2)}
          </Text>
        </View>
        {discount > 0 && (
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.colors.success }]}>
              Discount
            </Text>
            <Text style={[styles.summaryValue, { color: theme.colors.success }]}>
              -₹{discount.toFixed(2)}
            </Text>
          </View>
        )}
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
            Delivery
          </Text>
          <Text style={[styles.summaryValue, { color: theme.colors.success }]}>
            FREE
          </Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={[styles.totalLabel, { color: theme.colors.text }]}>Total</Text>
          <Text style={[styles.totalValue, { color: theme.colors.primary }]}>
            ₹{(total - discount).toFixed(2)}
          </Text>
        </View>
      </View>

      {/* Checkout Button */}
      <View style={[styles.checkoutContainer, { backgroundColor: theme.colors.card }]}>
        <Button
          title={`Checkout - ₹${(total - discount).toFixed(2)}`}
          onPress={handleCheckout}
          style={styles.checkoutButton}
        />
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
  clearCart: {
    fontSize: 14,
    fontWeight: '600',
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyCartTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyCartSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  startShoppingButton: {
    paddingHorizontal: 32,
  },
  cartList: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemVariant: {
    fontSize: 14,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemActions: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  removeButton: {
    padding: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    minWidth: 20,
    textAlign: 'center',
  },
  couponSection: {
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
  },
  couponTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  couponContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  couponInput: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  applyButton: {
    paddingHorizontal: 20,
  },
  couponApplied: {
    fontSize: 14,
    marginTop: 8,
    fontWeight: '600',
  },
  orderSummary: {
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 12,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  checkoutContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  checkoutButton: {
    paddingVertical: 16,
  },
});