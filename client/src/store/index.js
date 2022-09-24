import { configureStore } from '@reduxjs/toolkit';
import { UIFeaturesSliceReducer } from './UI-Features';
export const store = configureStore({
  reducer: {
    UIFeatures: UIFeaturesSliceReducer,
  },
});
