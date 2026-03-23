import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  isActive: boolean;
  totalOrders: number;
  totalSpent: number;
  createdAt: string;
  lastLogin: string;
}

interface UserState {
  users: User[];
  isLoading: boolean;
  selectedUser: User | null;
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  selectedUser: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(u => u.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    toggleUserStatus: (state, action: PayloadAction<string>) => {
      const user = state.users.find(u => u.id === action.payload);
      if (user) {
        user.isActive = !user.isActive;
      }
    },
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
  },
});

export const { setLoading, setUsers, updateUser, toggleUserStatus, setSelectedUser } = userSlice.actions;
export default userSlice.reducer;