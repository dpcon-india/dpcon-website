import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { setupListeners } from '@reduxjs/toolkit/query';

import { authApi } from './services/authApi';
import { serviceApi } from './services/serviceApi';
import { bookingApi } from './services/bookingApi';
import authReducer from './features/authSlice';

// Persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

// Combine all reducers
const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [serviceApi.reducerPath]: serviceApi.reducer,
  [bookingApi.reducerPath]: bookingApi.reducer,
  auth: authReducer,
});

// Apply persistence
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    })
      .concat(authApi.middleware)
      .concat(serviceApi.middleware)
      .concat(bookingApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

// Setup persistence
export const persistor = persistStore(store);

// Setup listeners (RTK Query)
setupListeners(store.dispatch);