import React, { useEffect, useState } from 'react';
import Chicklet from '../Chicklet/Chicklet';
import { FaVirus, FaSkullCrossbones, FaHeart, FaClipboardCheck } from 'react-icons/fa';
import { useGetTimeSeriesDataQuery } from '../../redux/Slices/CovidApi';

const Count: React.FC = () => {
  const { data, error, isLoading } = useGetTimeSeriesDataQuery({});
  const [covidData, setCovidData] = useState<any[]>([]);

  useEffect(() => {
    if (data && data.statewise) {
      const stateWiseData = data.statewise;

      const totalData = stateWiseData[0];

      const totalCases = Number(totalData.confirmed);
      const totalDeaths = Number(totalData.deaths);
      const totalRecovered = Number(totalData.recovered);
      const totalActive = Number(totalData.active);

      setCovidData([
        { count: totalCases, label: 'Total Cases', bgColor: 'bg-gray-600', icon: <FaClipboardCheck /> },
        { count: totalDeaths, label: 'Total Deaths', bgColor: 'bg-red-600', icon: <FaSkullCrossbones /> },
        { count: totalRecovered, label: 'Total Recovered', bgColor: 'bg-green-600', icon: <FaHeart /> },
        { count: totalActive, label: 'Active Cases', bgColor: 'bg-orange-600', icon: <FaVirus /> },
      ]);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {covidData.map((data, index) => (
        <Chicklet
          key={index}
          count={data.count}
          label={data.label}
          bgColor={data.bgColor}
          icon={data.icon}
        />
      ))}
    </div>
  );
};

export default Count;
