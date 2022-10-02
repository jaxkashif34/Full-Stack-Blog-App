import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  currentUser: null,
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, { payload }) => {
      state.currentUser = payload;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;

export const userSliceReducer = userSlice.reducer;
