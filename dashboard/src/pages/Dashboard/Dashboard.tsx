import React from 'react';
import Layout from '../../components/Layout/Layout';
import Count from '../../components/Count/Count';
import AreaChart from '../../components/AreaChart/AreaChart';
import PieChart from '../../components/PieChart/PieChart';
import CovidData from '../covidPieChart/CovidPieChart';
import CovidMap from '../../components/Map/Map';
import CovidChart from '../CovidChart/CovidChart';
import CovidChartPage from '../CovidChartPage/CovidChartPage';

const Dashboard: React.FC = () => {
  const labels = ['January', 'February', 'March', 'April', 'May', 'June'];
  const areaData = [65, 59, 80, 81, 56, 55];
  const pieData = [12, 19, 3, 5, 2];

  return (
    <Layout>
      <Count />



       <div className="p-4">
        {/* Grid Container for Charts */}
        <div className="grid grid-cols-10 gap-4">
          {/* Area Chart - 70% Width (7 columns out of 10) */}
          <div className="col-span-7 bg-gray-800 p-4 rounded-lg shadow-md h-96"> {/* Set a fixed height here */}
            {/* <CovidChartPage /> */}
          </div>
          {/* Pie Chart - 30% Width (3 columns out of 10) */}
          <div className="col-span-3 bg-gray-800 p-4 rounded-lg shadow-md h-96"> {/* Set a fixed height here */}
            <CovidData />
          </div>
        </div>
      </div>
      {/* <div className='w-full flex'>
      <CovidChart/>
      </div> */}
    </Layout>
  );
};

export default Dashboard;
