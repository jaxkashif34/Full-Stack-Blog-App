/* Creating a reducer. */
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  isDark: true,
  status: '',
  showPassword: false,
  snack: {
    message: '',
    isOpen: false,
  },
  isUserMenuOpen: false,
  isModalOpen: false,
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
    handleModal: (state, { payload }) => {
      state.isModalOpen = payload;
    },
  },
});

export const { setDarkMode, setShowPassword, handleSnack, handleUserMenu, handleModal } = UIFeaturesSlice.actions;
export const UIFeaturesSliceReducer = UIFeaturesSlice.reducer;
