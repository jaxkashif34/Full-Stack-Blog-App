/* A redux store. */
import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { UIFeaturesSliceReducer } from './UI-Features';
import { userSliceReducer } from './Auth';
import { persistStore, persistReducer } from 'redux-persist';
import postReducer from './Posts';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
const UIPersistorConfig = {
  key: 'isDark',
  storage,
  whitelist: ['isDark'],
  stateReconciler: autoMergeLevel2,
};

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['currentUser'],
  stateReconciler: autoMergeLevel2,
};
const rootReducer = combineReducers({
  UIFeatures: persistReducer(UIPersistorConfig, UIFeaturesSliceReducer),
  auth: persistReducer(authPersistConfig, userSliceReducer),
  post: postReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
  // devTools: process.env.NODE_ENV !== 'production',
  devTools: true,
});

export const persistor = persistStore(store);
