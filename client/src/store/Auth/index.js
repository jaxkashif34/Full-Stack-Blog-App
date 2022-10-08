import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { handleSnack } from '../UI-Features';
import { removePost } from '../Posts';
import Axios from 'axios';
import storage from 'redux-persist/lib/storage';

export const handleSignUp = createAsyncThunk('auth/handleForm', async (data, thunkApi) => {
  const { profile_pic, setSubmitting, values } = data;
  const { dispatch } = thunkApi;
  try {
    const data = new FormData();
    const uploadedData = {
      ...values,
      profile_pic,
    };
    Object.keys(uploadedData).forEach((key) => {
      data.append(key, uploadedData[key]);
    });
    if (profile_pic !== null) {
      const response = await Axios({
        url: 'http://localhost:8000/sign-up',
        method: 'POST',
        data,
      });
      dispatch(handleSnack({ isOpen: true, message: response.data.message }));
      return response.data.data;
    } else {
      dispatch(handleSnack({ isOpen: true, message: 'Please select a profile picture' }));
    }
    setSubmitting(false);
  } catch (err) {
    setSubmitting(false);
    if (err.response.data.error.indexOf('Unique constraint failed on the fields: (`email`)') !== -1) {
      dispatch(handleSnack({ isOpen: true, message: 'Email already exists' }));
    } else {
      dispatch(handleSnack({ isOpen: true, message: err.response.data.message }));
    }
  }
});

export const handleLogin = createAsyncThunk('auth/handleLogin', async (data, thunkApi) => {
  const { setSubmitting, values } = data;
  const { dispatch } = thunkApi;

  try {
    const response = await Axios({
      url: 'http://localhost:8000/log-in',
      method: 'POST',
      data: values,
    });
    dispatch(handleSnack({ isOpen: true, message: response.data.message }));
    setSubmitting(false);
    return response.data.data;
  } catch (err) {
    dispatch(handleSnack({ isOpen: true, message: err.message }));
    setSubmitting(false);
  }
});
export const handleUpdateUser = createAsyncThunk('auth/handleUpdateUser', async (data, thunkApi) => {
  const { setSubmitting, values, currentUserId, profile_pic } = data;
  const { dispatch } = thunkApi;

  try {
    const data = new FormData();
    const uploadedData = {
      ...values,
      profile_pic,
    };
    Object.keys(uploadedData).forEach((key) => {
      data.append(key, uploadedData[key]);
    });
    const response = await Axios({
      url: `http://localhost:8000/edit-user/${currentUserId}`,
      method: 'PUT',
      data,
    });
    dispatch(handleSnack({ isOpen: true, message: response.data.message }));
    setSubmitting(false);
    return response.data.data;
  } catch (err) {
    console.log(err);
    dispatch(handleSnack({ isOpen: true, message: err.response.data.message }));
  }
});

export const handleDeleteUser = createAsyncThunk('auth/handleDeleteUser', async (data, thunkApi) => {
  const { currentUserId } = data;
  const { dispatch } = thunkApi;

  try {
    const response = await Axios({
      method: 'DELETE',
      url: `http://localhost:8000/delete-user/${currentUserId}`,
    });
    dispatch(logOutUser());
    dispatch(removePost(currentUserId));
    dispatch(handleSnack({ isOpen: true, message: response.data.message }));
  } catch (err) {
    console.log(err);
    dispatch(handleSnack({ isOpen: true, message: err.response.data.message }));
  }
});
const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
  },
  userStatus: '',
  reducers: {
    logOutUser: (state) => {
      state.currentUser = null;
      storage.removeItem('persist:auth');
    },
  },
  extraReducers: (builder) => {
    // handleSignUp
    builder.addCase(handleSignUp.pending, (state) => {
      state.userStatus = 'pending';
    });
    builder.addCase(handleSignUp.fulfilled, (state, { payload }) => {
      state.userStatus = 'success';
      state.currentUser = payload;
    });
    builder.addCase(handleSignUp.rejected, (state) => {
      state.userStatus = 'rejected';
    });
    // handleSignIn
    builder.addCase(handleLogin.pending, (state) => {
      state.userStatus = 'pending';
    });
    builder.addCase(handleLogin.fulfilled, (state, { payload }) => {
      state.userStatus = 'success';
      state.currentUser = payload;
    });
    builder.addCase(handleLogin.rejected, (state) => {
      state.userStatus = 'rejected';
    });
    // handleUpdateUser
    builder.addCase(handleUpdateUser.pending, (state) => {
      state.userStatus = 'pending';
    });
    builder.addCase(handleUpdateUser.fulfilled, (state, { payload }) => {
      state.userStatus = 'success';
      state.currentUser = state.currentUser.id === payload.id ? payload : state.currentUser;
    });
    builder.addCase(handleUpdateUser.rejected, (state) => {
      state.userStatus = 'rejected';
    });
    // handleDeleteUser
    builder.addCase(handleDeleteUser.pending, (state) => {
      state.userStatus = 'pending';
    });
    builder.addCase(handleDeleteUser.fulfilled, (state) => {
      state.userStatus = 'success';
      state.currentUser = null;
    });
    builder.addCase(handleDeleteUser.rejected, (state) => {
      state.userStatus = 'rejected';
    });
  },
});

export const { logOutUser } = userSlice.actions;

export const userSliceReducer = userSlice.reducer;
