import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setOrders, updateOrderStatus, setSelectedOrder } from '../store/slices/orderSlice';
import { dummyOrders } from '../data/dummyData';
import { Order } from '../store/slices/orderSlice';
import toast from 'react-hot-toast';

export const OrdersPage: React.FC = () => {
  const dispatch = useDispatch();
  const { orders, selectedOrder } = useSelector((state: RootState) => state.orders);
  const [viewDialogOpen, setViewDialogOpen] = React.useState(false);

  useEffect(() => {
    dispatch(setOrders(dummyOrders));
  }, [dispatch]);

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    dispatch(updateOrderStatus({ id: orderId, status: newStatus }));
    toast.success(`Order status updated to ${newStatus}`);
  };

  const handleViewOrder = (order: Order) => {
    dispatch(setSelectedOrder(order));
    setViewDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'success';
      case 'shipped': return 'info';
      case 'confirmed': return 'warning';
      case 'pending': return 'default';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'success';
      case 'pending': return 'warning';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Orders Management
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Items</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>#{order.id}</TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2" fontWeight="bold">
                      {order.userName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {order.userEmail}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{order.items.length} items</TableCell>
                <TableCell>₹{order.total.toLocaleString()}</TableCell>
                <TableCell>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="confirmed">Confirmed</MenuItem>
                      <MenuItem value="shipped">Shipped</MenuItem>
                      <MenuItem value="delivered">Delivered</MenuItem>
                      <MenuItem value="cancelled">Cancelled</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <Chip
                    label={order.paymentStatus}
                    color={getPaymentStatusColor(order.paymentStatus) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => handleViewOrder(order)}>
                    <Visibility />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Order Details Dialog */}
      <Dialog
        open={viewDialogOpen}
        onClose={() => setViewDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Order Details - #{selectedOrder?.id}</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Box>
              {/* Customer Info */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Customer Information
                </Typography>
                <Typography variant="body2">
                  <strong>Name:</strong> {selectedOrder.userName}
                </Typography>
                <Typography variant="body2">
                  <strong>Email:</strong> {selectedOrder.userEmail}
                </Typography>
                <Typography variant="body2">
                  <strong>Address:</strong> {selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}
                </Typography>
              </Box>

              {/* Order Items */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Order Items
                </Typography>
                <List>
                  {selectedOrder.items.map((item) => (
                    <ListItem key={item.id}>
                      <ListItemAvatar>
                        <Avatar src={item.image} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.name}
                        secondary={`Quantity: ${item.quantity} × ₹${item.price}`}
                      />
                      <Typography variant="body2" fontWeight="bold">
                        ₹{(item.quantity * item.price).toLocaleString()}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </Box>

              {/* Order Summary */}
              <Box>
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Status:</Typography>
                  <Chip
                    label={selectedOrder.status}
                    color={getStatusColor(selectedOrder.status) as any}
                    size="small"
                  />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Payment Status:</Typography>
                  <Chip
                    label={selectedOrder.paymentStatus}
                    color={getPaymentStatusColor(selectedOrder.paymentStatus) as any}
                    size="small"
                  />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Order Date:</Typography>
                  <Typography>{new Date(selectedOrder.createdAt).toLocaleString()}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6">₹{selectedOrder.total.toLocaleString()}</Typography>
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};