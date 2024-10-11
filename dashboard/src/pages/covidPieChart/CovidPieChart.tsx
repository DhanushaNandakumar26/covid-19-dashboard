import React from 'react';
import PieChart from '../../components/PieChart/PieChart';
import { useGetTimeSeriesDataQuery } from '../../redux/Slices/CovidApi';

const CovidData: React.FC = () => {
  const { data, error, isLoading } = useGetTimeSeriesDataQuery({});

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  let covidData = [];

  if (data && data.statewise) {
    const statewiseData = data.statewise;
    const totalData = statewiseData[0];
    const totalCases = Number(totalData.confirmed);
    const totalDeaths = Number(totalData.deaths);
    const totalRecovered = Number(totalData.recovered);
    const totalActive = Number(totalData.active);

    covidData = [
      { count: totalCases, label: "Total Cases" },
      { count: totalDeaths, label: "Total Deaths" },
      { count: totalRecovered, label: "Total Recovered" },
      { count: totalActive, label: "Active Cases" },
    ];
  } else {
    console.error('Unexpected data format', data);
    return <div>Error: Unexpected data format.</div>;
  }

  const labels = covidData.map((data: any) => data.label);
  const chartData = covidData.map((data: any) => data.count);

  return (
    <div className='w-full h-full'>
      {covidData.length > 0 && <PieChart labels={labels} data={chartData} />}
    </div>
  );
};

export default CovidData;
