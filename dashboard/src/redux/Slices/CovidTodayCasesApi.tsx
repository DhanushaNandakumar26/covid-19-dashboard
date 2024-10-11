// src/services/covidApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface CovidData {
  cases: number;
  deaths: number;
  recovered: number;
  active: number;
  todayCases: number;
  todayDeaths: number;
}

export const covidTodayApi = createApi({
  reducerPath: 'covidTodayApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://disease.sh/v3/covid-19' }),
  endpoints: (builder) => ({
    getCovidData: builder.query<CovidData, void>({
      query: () => '/all',
    }),
  }),
});

export const { useGetCovidDataQuery } = covidTodayApi;
