import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { UIFeaturesSliceReducer } from './UI-Features';
import { userSliceReducer } from './Auth';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
const persistorConfig = {
  key: 'auth',
  storage,
  blacklist: ['UIFeatures'],
  whitelist: ['auth'],
  stateReconciler: autoMergeLevel2,
};
const UIPersistorConfig = {
  key: 'isDark',
  storage,
  whitelist: ['isDark'],
};
const rootReducer = combineReducers({
  UIFeatures: persistReducer(UIPersistorConfig, UIFeaturesSliceReducer),
  auth: userSliceReducer,
});

const rootPersistor = persistReducer(persistorConfig, rootReducer);
export const store = configureStore({
  reducer: rootPersistor,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
