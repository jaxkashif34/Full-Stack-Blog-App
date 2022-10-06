import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Axios from 'axios';

export const getPosts = createAsyncThunk('post/getPosts', async () => {
  const response = await Axios.get('http://localhost:8000/all-posts-titles');
  return response.data;
});

const initialState = {
  posts: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, { payload }) => {
      state.posts = [...state.posts, payload];
    },
    removePost: (state, { payload }) => {
      state.posts = state.posts.filter((post) => post.autherId !== payload);
    },
    setLikedPosts: (state, { payload }) => {
      state.posts = state.posts.map((post) => (post.id === payload?.id ? payload : post));
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

export const { setPosts, removePost, setLikedPosts } = postsSlice.actions;
export default postsSlice.reducer;
