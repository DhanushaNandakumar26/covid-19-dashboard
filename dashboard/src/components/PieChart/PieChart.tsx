import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface PieChartProps {
  labels: string[];
  data: number[];
}

const PieChart: React.FC<PieChartProps> = ({ labels, data }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: 'COVID-19 Data Distribution',
        data,
        backgroundColor: [
          'rgba(76, 175, 80, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: {
        display: true,
        text: 'Pie Chart Example',
      },
    },
  };

  return (
    <div className="w-full h-full"> {/* Adjust height and width here */}
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
