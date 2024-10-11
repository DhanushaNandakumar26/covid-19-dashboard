import { useGetTimeSeriesDataQuery } from '../../redux/Slices/CovidApi';
import Layout from '../../components/Layout/Layout';
import React, { useState } from 'react';
import Select from 'react-select';

interface StateData {
  state: string;
  confirmed: number;
  recovered: number;
  deaths: number;
  active: number;
}

const Covid19List: React.FC = () => {
  const { data, error, isLoading } = useGetTimeSeriesDataQuery({});
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedStates, setSelectedStates] = useState<any[]>([]); // State for the selected dropdown

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  const stateWiseData: StateData[] = data?.statewise ? data.statewise.slice(1) : []; // Skip the first entry

  const filteredData = stateWiseData.filter((item) =>
    item.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredByState = selectedStates.length > 0
    ? filteredData.filter((item) => selectedStates.some(state => state.value === item.state))
    : filteredData;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredByState.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredByState.length / itemsPerPage);

  const stateOptions = [
    { value: 'select-all', label: 'Select All' }, // Add "Select All" option
    ...stateWiseData.map((item) => ({
      value: item.state,
      label: item.state,
    })),
  ];

  const handleChange = (selected: any) => {
    if (selected.some((item: any) => item.value === 'select-all')) {
      setSelectedStates(selected.length === stateOptions.length ? [] : stateOptions.slice(1)); // Exclude "Select All" for toggling
    } else {
      setSelectedStates(selected);
    }
    setCurrentPage(1);
  };

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: '#1F2937',
      color: 'white',
      border: '1px solid #4B5563',
      '&:hover': {
        border: '1px solid #2563EB',
      },
      height: 'auto',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#2563EB' : state.isFocused ? '#374151' : '#1F2937', // Option background colors
      color: 'white',
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: '#1F2937',
    }),
    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: '#2563EB',
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: 'white',
    }),
    multiValueRemove: (provided: any) => ({
      ...provided,
      color: 'white',
      '&:hover': {
        backgroundColor: '#f56565',
        color: 'white',
      },
    }),
  };

  return (
    <Layout>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4 text-white">COVID-19 Cases in Indian States</h2>

        <input
          type="text"
          placeholder="Search by state..."
          className="border p-2 mb-4 w-full bg-gray-800 text-white placeholder-gray-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="mb-4">
          <Select
            isMulti
            options={stateOptions}
            value={selectedStates}
            onChange={handleChange}
            className="bg-gray-800 text-white"
            classNamePrefix="select"
            placeholder="Select states..."
            noOptionsMessage={() => "No states found"}
            styles={customStyles}
          />
        </div>

        <table className="min-w-full border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-900">
              <th className="border border-gray-700 p-2 text-left text-white">State</th>
              <th className="border border-gray-700 p-2 text-left text-white">Confirmed</th>
              <th className="border border-gray-700 p-2 text-left text-white">Recovered</th>
              <th className="border border-gray-700 p-2 text-left text-white">Deaths</th>
              <th className="border border-gray-700 p-2 text-left text-white">Active</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.state} className="border-b hover:bg-gray-700 hover:text-white">
                <td className="border border-gray-700 p-2 text-white">{item.state}</td>
                <td className="border border-gray-700 p-2 text-white">{item.confirmed}</td>
                <td className="border border-gray-700 p-2 text-white">{item.recovered}</td>
                <td className="border border-gray-700 p-2 text-white">{item.deaths}</td>
                <td className="border border-gray-700 p-2 text-white">{item.active}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-white">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Covid19List;
