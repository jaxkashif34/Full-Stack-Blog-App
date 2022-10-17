/* A redux-toolkit slice. */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Axios from 'axios';
import { handleSnack } from '../UI-Features';
import { API_ROUTE } from '../utils';
export const getPosts = createAsyncThunk('post/getPosts', async (data, thunkApi) => {
  const { dispatch } = thunkApi;
  try {
    const response = await Axios.get(`${API_ROUTE}/all-posts`);
    console.log('All Posts', response.data.data);
    return response.data.data;
  } catch (err) {
    console.log('Erro in fetching posts', err);
    dispatch(handleSnack({ isOpen: true, message: err?.response?.data?.message }));
  }
});

export const handleEditPost = createAsyncThunk('post/handleFavorite', async (data, thunkApi) => {
  const { title, content, tagsName, file, currentUserId, isLikedByCurrentUser, postId } = data;
  const { dispatch } = thunkApi;
  try {
    const data = new FormData();
    const dataToSend = {
      ...(tagsName != null && { tags: JSON.stringify(tagsName) }),
      ...(file != null && { bg_image: file }),
      ...(title != null && { title }),
      ...(content != null && { content }),
      ...(typeof isLikedByCurrentUser === 'boolean' && { isLiked: !isLikedByCurrentUser }),
      ...(typeof isLikedByCurrentUser === 'boolean' && { favoritedBy: currentUserId }),
    };
    Object.keys(dataToSend).forEach((key) => {
      data.append(key, dataToSend[key]);
    });
    const response = await Axios({
      method: 'PUT',
      url: `${API_ROUTE}/edit-post/${postId}`,
      data,
    });

    if (typeof isLikedByCurrentUser === 'boolean') {
      const isFound = response?.data?.data?.favoriteBy?.find((fovoriteBy) => fovoriteBy?.id === currentUserId)?.id;
      if (isFound === currentUserId) {
        dispatch(handleSnack({ message: 'Post Liked', isOpen: true }));
      } else {
        dispatch(handleSnack({ message: 'Post Unliked', isOpen: true }));
      }
    } else {
      dispatch(handleSnack({ message: response?.data?.message, isOpen: true }));
    }
    return response?.data?.data;
  } catch (err) {
    console.log('Error in edit post', err);
    dispatch(handleSnack({ message: err?.response?.data?.message, isOpen: true }));
  }
});
export const handleCreatePost = createAsyncThunk('post/handleCreatePost', async (data, thunkApi) => {
  const { title, content, file, tagsName, currentUserId } = data;
  const { dispatch } = thunkApi;

  try {
    const formData = new FormData();
    const dataToSend = { title, content, tags: JSON.stringify(tagsName), bg_image: file, autherId: currentUserId };
    Object.keys(dataToSend).forEach((key) => {
      formData.append(key, dataToSend[key]);
    });
    const response = await Axios({ url: `${API_ROUTE}/create-post`, method: 'POST', data: formData });
    dispatch(handleSnack({ isOpen: true, message: response?.data?.message }));
    return response?.data?.data;
  } catch (err) {
    dispatch(handleSnack({ isOpen: true, message: err.response?.data?.message }));
  }
});
export const handleDeletePost = createAsyncThunk('post/handleDeletePost', async (data, thunkApi) => {
  const { postId } = data;
  const { dispatch } = thunkApi;
  try {
    const response = await Axios({ method: 'DELETE', url: `${API_ROUTE}/delete-post/${postId}` });
    dispatch(handleSnack({ isOpen: true, message: response?.data?.message }));
    return postId;
  } catch (err) {
    dispatch(handleSnack({ isOpen: true, message: err?.response?.data?.message }));
  }
});

const initialState = {
  posts: [],
  postStatus: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, { payload }) => {
      state.posts = [...state.posts, payload];
    },
    removePostOnUserDelete: (state, { payload }) => {
      state.posts = state.posts.filter((post) => post.autherId !== payload);
    },
    setLikedPosts: (state, { payload }) => {
      state.posts = state.posts.map((post) => (post.id === payload?.id ? payload : post));
    },
  },
  extraReducers: (builder) => {
    // fetch All Posts
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
    // handleEditPost
    builder.addCase(handleEditPost.pending, (state) => {
      state.postStatus = 'pending';
    });
    builder.addCase(handleEditPost.fulfilled, (state, { payload }) => {
      state.postStatus = 'success';
      state.posts = state.posts.map((post) => (post?.id === payload?.id ? payload : post));
    });
    builder.addCase(handleEditPost.rejected, (state) => {
      state.postStatus = 'rejected';
    });
    // handleCreatePost
    builder.addCase(handleCreatePost.pending, (state) => {
      state.postStatus = 'pending';
    });
    builder.addCase(handleCreatePost.fulfilled, (state, { payload }) => {
      state.postStatus = 'success';
      state.posts = [...state.posts, payload];
    });
    builder.addCase(handleCreatePost.rejected, (state) => {
      state.postStatus = 'rejected';
    });
    // handleDeletePost
    builder.addCase(handleDeletePost.pending, (state) => {
      state.postStatus = 'pending';
    });
    builder.addCase(handleDeletePost.fulfilled, (state, { payload }) => {
      state.postStatus = 'success';
      state.posts = state.posts.filter((post) => post.id !== payload);
    });
    builder.addCase(handleDeletePost.rejected, (state) => {
      state.postStatus = 'rejected';
    });
  },
});

export const { setPosts, removePostOnUserDelete, setLikedPosts } = postsSlice.actions;
export default postsSlice.reducer;
