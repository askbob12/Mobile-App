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
  Avatar,
  Chip,
  IconButton,
  Switch,
} from '@mui/material';
import { Edit, Block } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setUsers, toggleUserStatus } from '../store/slices/userSlice';
import { dummyUsers } from '../data/dummyData';
import toast from 'react-hot-toast';

export const UsersPage: React.FC = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(setUsers(dummyUsers));
  }, [dispatch]);

  const handleToggleStatus = (userId: string, userName: string, isActive: boolean) => {
    dispatch(toggleUserStatus(userId));
    toast.success(`${userName} has been ${isActive ? 'deactivated' : 'activated'}`);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Users Management
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Orders</TableCell>
              <TableCell>Total Spent</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Login</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Avatar src={user.avatar}>
                    {user.name.charAt(0)}
                  </Avatar>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="bold">
                    {user.name}
                  </Typography>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.totalOrders}</TableCell>
                <TableCell>₹{user.totalSpent.toLocaleString()}</TableCell>
                <TableCell>
                  <Chip
                    label={user.isActive ? 'Active' : 'Inactive'}
                    color={user.isActive ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                </TableCell>
                <TableCell>
                  <Switch
                    checked={user.isActive}
                    onChange={() => handleToggleStatus(user.id, user.name, user.isActive)}
                    size="small"
                  />
                  <IconButton size="small">
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};