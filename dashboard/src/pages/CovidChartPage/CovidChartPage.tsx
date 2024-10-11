// src/pages/CovidChartPage.tsx
import AreaChart from '../../components/AreaChart/AreaChart';
import { useGetTimeSeriesDataQuery } from '../../redux/Slices/CovidApi';
import React, { useEffect, useState } from 'react';

const CovidChartPage: React.FC = () => {
  const { data: covidData, isLoading } = useGetTimeSeriesDataQuery({});
  const [chartData, setChartData] = useState<{ labels: string[]; data: number[] }>({ labels: [], data: [] });

  useEffect(() => {
    if (covidData) {
      const timeSeriesData = covidData.cases_time_series;

      const today = new Date("2021-08-16"); // Last date in the data
      const last30Days = new Date(today);
      last30Days.setDate(today.getDate() - 30);

      // Filter and prepare data
      const filteredData = timeSeriesData.filter((data: any) => {
        const date = new Date(data.date);
        return date >= last30Days && date <= today;
      });

      const labels = filteredData.map((data: any) => data.date);
      const confirmedCases = filteredData.map((data: any) => Number(data.totalconfirmed));

      setChartData({ labels, data: confirmedCases });
    }
  }, [covidData]);

  return (
    <div>
      {isLoading ? (
        <div>Loading chart...</div>
      ) : (
        <AreaChart
          labels={chartData.labels}
          data={chartData.data}
          title="COVID-19 Confirmed Cases Over Last 30 Days"
          content={
            <p>This chart shows the confirmed cases of COVID-19 over the past 30 days, based on the latest available data.</p>
          }
        />
      )}
    </div>
  );
};

export default CovidChartPage;
