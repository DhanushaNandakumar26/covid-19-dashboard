// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { covidApi } from './Slices/CovidApi';
import { covidTodayApi } from './Slices/CovidTodayCasesApi';

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [covidApi.reducerPath]: covidApi.reducer,
    [covidTodayApi.reducerPath]: covidTodayApi.reducer

  },
  // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(covidApi.middleware)
  .concat(covidTodayApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
