import React from 'react';
import Layout from '../../components/Layout/Layout';
import Count from '../../components/Count/Count';
import CovidData from '../covidPieChart/CovidPieChart';
import CovidChartPage from '../CovidChartPage/CovidChartPage';

const Dashboard: React.FC = () => {

  return (
    <Layout>
      <Count />
       <div className="p-4">
        <div className="grid grid-cols-10 gap-4">
          <div className="col-span-7 bg-gray-800 p-4 rounded-lg shadow-md h-96"> {/* Set a fixed height here */}
            <CovidChartPage />
          </div>
          <div className="col-span-3 bg-gray-800 p-4 rounded-lg shadow-md h-96"> {/* Set a fixed height here */}
            <CovidData />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
