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
  snack: {
    message: '',
    isOpen: false,
  },
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
    handleSnack: (state, { payload }) => {
      state.snack = payload;
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

export const { setDarkMode, setAnchorElNav, setShowPassword,handleSnack } = UIFeaturesSlice.actions;
export const UIFeaturesSliceReducer = UIFeaturesSlice.reducer;
