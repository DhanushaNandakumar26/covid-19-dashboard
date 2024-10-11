import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Filler, Title, Tooltip, Legend);

interface AreaChartProps {
  labels: string[];
  data: number[];
  title: string;
  content?: React.ReactNode;
}

const AreaChart: React.FC<AreaChartProps> = ({ labels, data, title, content }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Confirmed Cases',
        data,
        fill: true,
        backgroundColor: (ctx: any) => {
          const chart = ctx.chart;
          const { ctx: canvasCtx } = chart;
          const gradient = canvasCtx.createLinearGradient(0, 0, 0, chart.height);
          gradient.addColorStop(0, 'rgba(76, 175, 80, 0.5)');
          gradient.addColorStop(1, 'rgba(76, 175, 80, 0.1)');
          return gradient;
        },
        borderColor: 'rgba(76, 175, 80, 1)',
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Confirmed Cases',
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '370px' }}>
      <Line data={chartData} options={chartOptions} />
      {content && <div className="chart-content">{content}</div>} {/* Display content if provided */}
    </div>
  );
};

export default AreaChart;
