import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPosts = createAsyncThunk('post/getPosts', async () => {
  const response = await axios.get('http://localhost:8000/all-posts-titles');
  return response.data;
});
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  const osTheme = e.matches;
  setDarkMode(osTheme);
});
const initialState = {
  isDark: true,
  posts: [],
  status: '',
  showPassword: false,
  snack: {
    message: '',
    isOpen: false,
  },
  isUserMenuOpen: false,
};

export const UIFeaturesSlice = createSlice({
  name: 'UIFeatures',
  initialState,
  reducers: {
    setDarkMode: (state, { payload }) => {
      state.isDark = !payload;
    },
    setShowPassword: (state, { payload }) => {
      state.showPassword = payload;
    },
    handleSnack: (state, { payload }) => {
      state.snack = payload;
    },
    handleUserMenu: (state, { payload }) => {
      state.isUserMenuOpen = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(getPosts.fulfilled, (state, { payload }) => {
      state.posts = payload;
      state.status = 'success';
    });
    builder.addCase(getPosts.rejected, (state) => {
      state.status = 'rejected';
    });
  },
});

export const { setDarkMode, setShowPassword, handleSnack, handleUserMenu } = UIFeaturesSlice.actions;
export const UIFeaturesSliceReducer = UIFeaturesSlice.reducer;
