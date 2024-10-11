import Checklet from "../Chicklet/Chicklet";
import { FaVirus, FaSkullCrossbones, FaHeart, FaClipboardCheck } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';

const Count: React.FC = () => {
  const [covidData, setCovidData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://data.incovid19.org/data.json');
      const jsonData = await response.json();
      const stateWiseData = jsonData.statewise;

      // Calculate total cases, deaths, and recoveries
      const totalCases = stateWiseData.reduce((acc: any, state: any) => acc + Number(state.confirmed), 0);
      const totalDeaths = stateWiseData.reduce((acc: any, state: any) => acc + Number(state.deaths), 0);
      const totalRecovered = stateWiseData.reduce((acc: any, state: any) => acc + Number(state.recovered), 0);
      const totalActive = stateWiseData.reduce((acc: any, state: any) => acc + Number(state.active), 0);
      
      setCovidData([
        { count: totalCases, label: "Total Cases", bgColor: 'bg-gray-600', icon: <FaClipboardCheck /> },
        { count: totalDeaths, label: "Total Deaths", bgColor: 'bg-red-600', icon: <FaSkullCrossbones /> },
        { count: totalRecovered, label: "Total Recovered", bgColor: 'bg-green-600', icon: <FaHeart /> },
        { count: totalActive, label: "Active Cases", bgColor: 'bg-orange-600', icon: <FaVirus /> },
      ]);
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {covidData.map((data, index) => (
        <Checklet 
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
