// // src/components/TimeSeriesChart.tsx
// import React, { useEffect, useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   LineElement,
//   PointElement,
//   Filler,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { useGetTimeSeriesDataQuery } from '../../redux/Slices/CovidApi'

// // Register Chart.js components
// ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Filler, Title, Tooltip, Legend);

// const AreaChart: React.FC = () => {
//   const { data: covidData, isLoading } = useGetTimeSeriesDataQuery({});
//   const [chartData, setChartData] = useState<{ labels: string[]; data: number[] }>({ labels: [], data: [] });

//   useEffect(() => {
//     if (covidData) {
//       const timeSeriesData = covidData.cases_time_series;

//       const today = new Date("2021-08-16"); // Last date in the data
//       const last30Days = new Date(today);
//       last30Days.setDate(today.getDate() - 30);

//       // Filter and prepare data
//       const filteredData = timeSeriesData.filter((data: any) => {
//         const date = new Date(data.date);
//         return date >= last30Days && date <= today;
//       });

//       const labels = filteredData.map((data: any) => data.date);
//       const confirmedCases = filteredData.map((data: any) => Number(data.totalconfirmed));

//       setChartData({ labels, data: confirmedCases });
//     }
//   }, [covidData]);

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: 'top' as const,
//       },
//       title: {
//         display: true,
//         text: 'COVID-19 Confirmed Cases Over Last 30 Days',
//       },
//     },
//     scales: {
//       x: {
//         title: {
//           display: true,
//           text: 'Date',
//         },
//       },
//       y: {
//         title: {
//           display: true,
//           text: 'Confirmed Cases',
//         },
//       },
//     },
//   };

//   const data = {
//     labels: chartData.labels,
//     datasets: [
//       {
//         label: 'Confirmed Cases',
//         data: chartData.data,
//         fill: true,
//         backgroundColor: (ctx: any) => {
//           const chart = ctx.chart;
//           const { ctx: canvasCtx } = chart;
//           const gradient = canvasCtx.createLinearGradient(0, 0, 0, chart.height);
//           gradient.addColorStop(0, 'rgba(76, 175, 80, 0.5)'); // Green
//           gradient.addColorStop(1, 'rgba(76, 175, 80, 0.1)'); // Transparent
//           return gradient;
//         },
//         borderColor: 'rgba(76, 175, 80, 1)', // Darker green line
//         borderWidth: 2,
//         pointRadius: 0, // Remove dots
//         tension: 0.4, // Smooth curve
//       },
//     ],
//   };

//   return (
//     <div style={{ width: '100%', height: '370px', opacity: isLoading ? 0.5 : 1, transition: 'opacity 0.5s' }}>
//       {isLoading ? <div className="loading">Loading chart...</div> : <Line data={data} options={chartOptions} />}
//     </div>
//   );
// };

// export default AreaChart;

// src/components/AreaChart/AreaChart.tsx
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

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Filler, Title, Tooltip, Legend);

interface AreaChartProps {
  labels: string[];
  data: number[];
  title: string;
  content?: React.ReactNode; // Can be any JSX content passed as a prop
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
          gradient.addColorStop(0, 'rgba(76, 175, 80, 0.5)'); // Green
          gradient.addColorStop(1, 'rgba(76, 175, 80, 0.1)'); // Transparent
          return gradient;
        },
        borderColor: 'rgba(76, 175, 80, 1)', // Darker green line
        borderWidth: 2,
        pointRadius: 0, // Remove dots
        tension: 0.4, // Smooth curve
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
        text: title, // Dynamically display title
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
