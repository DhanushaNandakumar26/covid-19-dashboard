import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const covidApi = createApi({
  reducerPath: 'covidApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://data.incovid19.org/' }),
  endpoints: (builder) => ({
    getTimeSeriesData: builder.query({
      query: () => 'data.json',
    }),
  }),
});

// Export the auto-generated hook for the query
export const { useGetTimeSeriesDataQuery } = covidApi;
