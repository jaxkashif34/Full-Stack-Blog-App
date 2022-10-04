import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  currentUser: null,
  editUser: null,
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, { payload }) => {
      state.currentUser = payload;
    },
    setEditedUser: (state, { payload }) => {
      state.editUser = payload;
    },
  },
});

export const { setCurrentUser, setEditedUser } = userSlice.actions;

export const userSliceReducer = userSlice.reducer;
