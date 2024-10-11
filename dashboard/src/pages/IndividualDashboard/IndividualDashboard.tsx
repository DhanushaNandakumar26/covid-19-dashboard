import { covidData } from '../../utils/constants';
import Layout from '../../components/Layout/Layout';
import React, { useState } from 'react';
import Select from 'react-select';
import { PieChart, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Pie } from 'recharts';

interface CovidState {
    name: string;
    totalCases: number;
    activeCases: number;
    recovered: number;
    deaths: number;
}

const IndividualDashboard = () => {
    const [selectedState, setSelectedState] = useState<CovidState | null>(null);
    
    const options = covidData.states.map((state) => ({
        value: state.name,
        label: state.name,
    }));

    const handleChange = (newValue: any) => {
        const stateData = covidData.states.find(state => state.name === newValue.value) as CovidState;
        setSelectedState(stateData || null);
    };

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
