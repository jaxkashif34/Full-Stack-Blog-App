import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPosts = createAsyncThunk('post/getPosts', async () => {
  const response = await axios.get('http://localhost:8000/all-posts-titles');
  return response.data;
});
const initialState = {
  isDark: JSON.parse(localStorage.getItem('dark-mode')),
  anchorElNav: false,
  posts: [],
  status: '',
  showPassword: false,
  role: 'AUTHER',
};

export const UIFeaturesSlice = createSlice({
  name: 'UIFeatures',
  initialState,
  reducers: {
    setDarkMode: (state, { payload }) => {
      state.isDark = !payload;
    },
    setAnchorElNav: (state, { payload }) => {
      state.anchorElNav = payload;
    },
    setShowPassword: (state, { payload }) => {
      state.showPassword = payload;
    },
    setRole: (state, { payload }) => {
      state.role = payload;
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

export const { setDarkMode, setAnchorElNav, setShowPassword, setRole } = UIFeaturesSlice.actions;
export const UIFeaturesSliceReducer = UIFeaturesSlice.reducer;
