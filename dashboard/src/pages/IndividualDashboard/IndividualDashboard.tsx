// import { covidData } from '../../utils/constants';
// import Layout from '../../components/Layout/Layout';
// import React, { useState } from 'react';
// import Select, { SingleValue } from 'react-select'; // Import SingleValue type
// import { PieChart, Pie, Cell, Tooltip } from 'recharts';
// import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, CartesianGrid, Legend } from 'recharts';

// // Define the interface for state data
// interface CovidState {
//     name: string;
//     totalCases: number;
//     activeCases: number;
//     recovered: number;
//     deaths: number;
// }

// const IndividualDashboard = () => {
//     const [selectedState, setSelectedState] = useState<CovidState | null>(null);

//     // Create options for the Select component
    // const options = covidData.states.map((state) => ({
    //     value: state.name,
    //     label: state.name,
    // }));

//     // Handle state selection change
//     const handleSelectChange = (newValue: SingleValue<{ value: string; label: string }>) => {
//         if (newValue) {
//             const stateData = covidData.states.find(s => s.name === newValue.value) as CovidState;
//             setSelectedState(stateData);
//         }
//     };

//     // Define pie chart data based on the selected state's data
//     const PieChartComponent = () => {
//         if (!selectedState) return null;

//         const pieData = [
//             { name: 'Active Cases', value: selectedState.activeCases },
//             { name: 'Recovered', value: selectedState.recovered },
//             { name: 'Deaths', value: selectedState.deaths },
//         ];

//         const COLORS = ['#0088FE', '#00C49F', '#FF8042'];

//         return (
//             <PieChart width={200} height={200}>
//                 <Pie
//                     data={pieData}
//                     cx={100}
//                     cy={100}
//                     innerRadius={40}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     dataKey="value"
//                 >
//                     {pieData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={COLORS[index]} />
//                     ))}
//                 </Pie>
//                 <Tooltip />
//             </PieChart>
//         );
//     };

//     // Comparison chart to compare selected state data with national data
//     const ComparisonChart = () => {
//         if (!selectedState) return null;

//         const indiaData = {
//             activeCases: 300000,
//             recovered: 2900000,
//             deaths: 150000,
//         };

//         const data = [
//             {
//                 name: 'Active Cases',
//                 State: selectedState.activeCases,
//                 India: indiaData.activeCases,
//             },
//             {
//                 name: 'Recovered',
//                 State: selectedState.recovered,
//                 India: indiaData.recovered,
//             },
//             {
//                 name: 'Deaths',
//                 State: selectedState.deaths,
//                 India: indiaData.deaths,
//             },
//         ];

//         return (
//             <BarChart width={400} height={300} data={data}>
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <RechartsTooltip />
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <Legend />
//                 <Bar dataKey="State" fill="#8884d8" />
//                 <Bar dataKey="India" fill="#82ca9d" />
//             </BarChart>
//         );
//     };

//     return (
//         <Layout>
//             <div style={{ color: '#fff', padding: '20px' }}>
//                 <h1>COVID-19 Data Visualization</h1>
//                 <Select
//                     options={options}
//                     styles={{
//                         control: (provided) => ({
//                             ...provided,
//                             backgroundColor: '#111827',
//                             color: '#fff',
//                             border: '1px solid #555',
//                         }),
//                         option: (provided, state) => ({
//                             ...provided,
//                             backgroundColor: state.isSelected ? '#555' : '#333',
//                             color: state.isSelected ? '#fff' : '#ccc',
//                         }),
//                     }}
//                     onChange={handleSelectChange}
//                     placeholder="Select a State"
//                 />
//                 {selectedState && (
//                     <>
//                         <h2>{selectedState.name} COVID-19 Stats</h2>
//                         <div style={{ display: 'flex', gap: '20px' }}>
//                             <div>
//                                 <h3>Total Cases: {selectedState.totalCases}</h3>
//                                 <h3>Active Cases: {selectedState.activeCases}</h3>
//                                 <h3>Recovered: {selectedState.recovered}</h3>
//                                 <h3>Deaths: {selectedState.deaths}</h3>
//                             </div>
//                             <div>
//                                 <h4>Daily Cases Pie Chart</h4>
//                                 <PieChartComponent />
//                             </div>
//                         </div>
//                         <h4>Comparison Chart</h4>
//                         <ComparisonChart />
//                     </>
//                 )}
//             </div>
//         </Layout>
//     );
// };

// export default IndividualDashboard;

import { covidData } from '../../utils/constants';
import Layout from '../../components/Layout/Layout';
import React, { useState } from 'react';
import Select from 'react-select';
import { PieChart, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Pie } from 'recharts';

// Define the interface for state data
interface CovidState {
    name: string;
    totalCases: number;
    activeCases: number;
    recovered: number;
    deaths: number;
}

const IndividualDashboard = () => {
    const [selectedState, setSelectedState] = useState<CovidState | null>(null);
    
    // Create options for the Select component
    const options = covidData.states.map((state) => ({
        value: state.name,
        label: state.name,
    }));

    // Handle state selection change
    const handleChange = (newValue: any) => {
        const stateData = covidData.states.find(state => state.name === newValue.value) as CovidState;
        setSelectedState(stateData || null);
    };

    // Sample Pie Chart Component
    const PieChartComponent = () => {
        if (!selectedState) return null;

        const pieData = [
            { name: 'Active', value: selectedState.activeCases },
            { name: 'Recovered', value: selectedState.recovered },
            { name: 'Deaths', value: selectedState.deaths },
        ];

        return (
            <PieChart width={500} height={500}>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150} fill="#28a745" label />
                <Tooltip />
            </PieChart>
        );
    };

    return (
        <Layout>
            <div className="p-4 shadow-lg bg-gray-800 rounded-md">
                <h2 className="text-white">COVID-19 Dashboard</h2>
                <Select
                    options={options}
                    onChange={handleChange}
                    styles={{
                        control: (base) => ({
                            ...base,
                            backgroundColor: 'rgba(55, 65, 81, 1)', // bg-gray-700
                            color: 'white',
                        }),
                        option: (provided, state) => ({
                            ...provided,
                            color: state.isFocused ? 'white' : 'gray-300',
                            backgroundColor: state.isFocused ? 'rgba(255, 255, 255, 0.1)' : 'rgba(55, 65, 81, 1)',
                        }),
                    }}
                />

                {selectedState && (
                    <div className="flex justify-between mt-4">
                        <div className="w-1/2">
                            <h4 className="text-white">Daily Cases Pie Chart</h4>
                            <PieChartComponent />
                        </div>
                        <div className="w-1/2">
                            <h4 className="text-white">Cases Comparison Bar Chart</h4>
                            <BarChart width={600} height={400} data={[
                                { name: 'Active Cases', State: selectedState.activeCases, India: 20000 }, // Example India data
                                { name: 'Recovered', State: selectedState.recovered, India: 1500000 },
                                { name: 'Deaths', State: selectedState.deaths, India: 50000 },
                            ]}>
                                <XAxis dataKey="name" stroke="white" />
                                <YAxis stroke="white" />
                                <Tooltip contentStyle={{ backgroundColor: '#333', color: 'white' }} />
                                <CartesianGrid strokeDasharray="3 3" stroke="gray" />
                                <Legend />
                                <Bar dataKey="State" fill="#28a745" />
                                <Bar dataKey="India" fill="#007bff" />
                            </BarChart>
                        </div>
                    </div>
                )}

                {selectedState && (
                    <div className="text-white mt-4">
                        <h3>Active Cases: {selectedState.activeCases}</h3>
                        <h3>Recovered: {selectedState.recovered}</h3>
                        <h3>Deaths: {selectedState.deaths}</h3>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default IndividualDashboard;
