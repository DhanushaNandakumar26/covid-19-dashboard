// src/components/CovidPieChart.tsx

import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { useGetCovidDataQuery } from '../../redux/Slices/CovidTodayCasesApi';
import Layout from '../../components/Layout/Layout';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CovidData {
  cases: number;
  deaths: number;
  recovered: number;
  active: number;
  todayCases: number; // Today's cases
  todayDeaths: number; // Today's deaths
}

const CovidPieChart: React.FC = () => {
  const { data, error, isLoading } = useGetCovidDataQuery(); // Fetch data from Redux Toolkit Query
  const [filter, setFilter] = useState<'todayCases' | 'todayDeaths'>('todayCases');

  const getChartData = () => {
    if (!data) {
      return {
        labels: [],
        values: [],
      };
    }

    switch (filter) {
      case 'todayCases':
        return {
          labels: ["Today's Cases", "Other Cases"],
          values: [data.todayCases, data.cases - data.todayCases],
        };
      case 'todayDeaths':
        return {
          labels: ["Today's Deaths", "Other Deaths"],
          values: [data.todayDeaths, data.deaths - data.todayDeaths],
        };
      default:
        return {
          labels: [],
          values: [],
        };
    }
  };

  const chartData = {
    labels: getChartData().labels,
    datasets: [
      {
        data: getChartData().values,
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  if (isLoading) return <p>Loading data...</p>;
  if (error) return <p>Error fetching data</p>;

  return (
 <Layout>
     <div className="max-h-[75vh] bg-gray-900 text-gray-200 p-8 flex flex-col items-center">
      <h1 className="text-3xl mb-4">COVID-19 Pie Chart</h1>
      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as 'todayCases' | 'todayDeaths')}
          className="p-2 rounded-md bg-gray-800 text-gray-200"
        >
          <option value="todayCases">Today's Cases</option>
          <option value="todayDeaths">Today's Deaths</option>
        </select>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-80">
        <Pie data={chartData} options={options} />
      </div>
      {data && (
        <div className="mt-4 text-gray-400">
          <p>Total Cases: {data.cases.toLocaleString()}</p>
          <p>Today's Cases: {data.todayCases.toLocaleString()}</p>
          <p>Total Deaths: {data.deaths.toLocaleString()}</p>
          <p>Today's Deaths: {data.todayDeaths.toLocaleString()}</p>
          <p>Total Recovered: {data.recovered.toLocaleString()}</p>
          <p>Active Cases: {data.active.toLocaleString()}</p>
        </div>
      )}
    </div>
 </Layout>
  );
};

export default CovidPieChart;
