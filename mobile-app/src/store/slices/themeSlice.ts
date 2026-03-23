import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeState {
  isDark: boolean;
  isSystemTheme: boolean;
}

const initialState: ThemeState = {
  isDark: false,
  isSystemTheme: true,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDark = !state.isDark;
      state.isSystemTheme = false;
      AsyncStorage.setItem('theme', JSON.stringify({ isDark: state.isDark, isSystemTheme: false }));
    },
    setTheme: (state, action: PayloadAction<{ isDark: boolean; isSystemTheme: boolean }>) => {
      state.isDark = action.payload.isDark;
      state.isSystemTheme = action.payload.isSystemTheme;
      AsyncStorage.setItem('theme', JSON.stringify(action.payload));
    },
    setSystemTheme: (state, action: PayloadAction<boolean>) => {
      state.isDark = action.payload;
      state.isSystemTheme = true;
      AsyncStorage.setItem('theme', JSON.stringify({ isDark: action.payload, isSystemTheme: true }));
    },
  },
});

export const { toggleTheme, setTheme, setSystemTheme } = themeSlice.actions;
export default themeSlice.reducer;