import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Axios from 'axios';
import { handleSnack } from '../UI-Features';
export const getPosts = createAsyncThunk('post/getPosts', async () => {
  try {
    const response = await Axios.get('http://localhost:8000/all-posts-titles');
    return response.data;
  } catch (err) {
    console.log(err);
  }
});

export const handleFavorite = createAsyncThunk('post/handleFavorite', async (data, thunkApi) => {
  const { postId, currentUserId, isLikedByCurrentUser } = data;
  const { dispatch } = thunkApi;

  try {
    const response = await Axios({
      method: 'PUT',
      url: `http://localhost:8000/edit-post/${postId}`,
      data: {
        favoritedBy: currentUserId,
        isLiked: !isLikedByCurrentUser,
      },
    });

    const isFound = response.data.data.favoriteBy.find((fovoriteBy) => fovoriteBy?.id === currentUserId)?.id;
    if (isFound === currentUserId) {
      dispatch(handleSnack({ message: 'Post Liked', isOpen: true }));
    } else {
      dispatch(handleSnack({ message: 'Post Unliked', isOpen: true }));
    }
    return response.data.data;
  } catch (err) {
    dispatch(handleSnack({ message: err.message, isOpen: true }));
  }
});

const initialState = {
  posts: [],
  postStatus: false,
  favoriteStatus: '',
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
      state.postStatus = 'pending';
    });
    builder.addCase(getPosts.fulfilled, (state, { payload }) => {
      state.posts = payload;
      state.postStatus = 'success';
    });
    builder.addCase(getPosts.rejected, (state) => {
      state.postStatus = 'rejected';
    });
    // handleFavorite
    builder.addCase(handleFavorite.pending, (state) => {
      state.postStatus = 'pending';
    });
    builder.addCase(handleFavorite.fulfilled, (state, { payload }) => {
      state.postStatus = 'success';
      state.posts = state.posts.map((post) => (post.id === payload.id ? payload : post)); // might be change in future versions
    });
    builder.addCase(handleFavorite.rejected, (state) => {
      state.postStatus = 'rejected';
    });
  },
});

export const { setPosts, removePost, setLikedPosts } = postsSlice.actions;
export default postsSlice.reducer;
