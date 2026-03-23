import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  admin: Admin | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  admin: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    loginSuccess: (state, action: PayloadAction<{ admin: Admin; token: string }>) => {
      state.admin = action.payload.admin;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isLoading = false;
      localStorage.setItem('adminToken', action.payload.token);
      localStorage.setItem('admin', JSON.stringify(action.payload.admin));
    },
    logout: (state) => {
      state.admin = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('adminToken');
      localStorage.removeItem('admin');
    },
    restoreAuth: (state, action: PayloadAction<{ admin: Admin; token: string }>) => {
      state.admin = action.payload.admin;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
  },
});

export const { setLoading, loginSuccess, logout, restoreAuth } = authSlice.actions;
export default authSlice.reducer;