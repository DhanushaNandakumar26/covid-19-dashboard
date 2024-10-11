import { configureStore } from '@reduxjs/toolkit';
import { covidApi } from './Slices/CovidApi';
import { covidTodayApi } from './Slices/CovidTodayCasesApi';

export const store = configureStore({
  reducer: {
    [covidApi.reducerPath]: covidApi.reducer,
    [covidTodayApi.reducerPath]: covidTodayApi.reducer

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(covidApi.middleware)
  .concat(covidTodayApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
