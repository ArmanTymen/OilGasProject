import { configureStore } from '@reduxjs/toolkit';
import { wellApi } from '../entities/well/api/wellApi';

export const store = configureStore({
  reducer: {
    [wellApi.reducerPath]: wellApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(wellApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
