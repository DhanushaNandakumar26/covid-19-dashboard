import React from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import LocatioIcon from '../../assets/location.png';
import Layout from '../Layout/Layout';
import { stateCoordinates } from '../../utils/constants';
import { useGetTimeSeriesDataQuery } from '../../redux/Slices/CovidApi';

interface CovidStateData {
  state: string;
  active: number;
  confirmed: number;
  recovered: number;
  deaths: number;
}

const CovidMap: React.FC = () => {
  const { data, error, isLoading } = useGetTimeSeriesDataQuery({}); // Use the Redux query to fetch data

  const getMarkerColor = (active: number) => {
    if (active < 1000) return 'green';
    if (active < 5000) return 'orange';
    return 'red';
  };

  const redCovidIcon = (active: number) => {
    const color = getMarkerColor(active);
    return L.divIcon({
      className: 'custom-icon',
      html: `<div><img src='${LocatioIcon}' style='width: 30px;'/></div>`,
      iconSize: [25, 25],
      iconAnchor: [12, 12],
    });
  };

  if (isLoading) {
    return <div>Loading data...</div>;
  }

  if (error) {
    // Check if error is FetchBaseQueryError
    if ('status' in error) {
      return <div>Error fetching data: {error.status}</div>; // Display status code
    }
    // Check if error is SerializedError
    return <div>Error fetching data: {error.message}</div>; // Display message if available
  }

  const covidData: CovidStateData[] = data.statewise.slice(1); // Adjust based on your API response structure

  return (
    <Layout>
      <div className="relative w-full h-screen">
        <MapContainer
          center={[20.5937, 78.9629]}
          zoom={5}
          style={{ height: '100%', width: '100%' }}
          className="absolute"
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.carto.com/attribution">CARTO</a>'
          />

          {covidData.map((stateData, index) => {
            const { state, active, confirmed, recovered, deaths } = stateData;
            const coordinates = stateCoordinates[state as keyof typeof stateCoordinates];

            if (!coordinates) return null;

            return (
              <Marker key={index} position={[coordinates.lat, coordinates.lng]} icon={redCovidIcon(active)}>
                <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={false}>
                  <div>
                    <h3>{state}</h3>
                    <p><strong>Active:</strong> {active}</p>
                    <p><strong>Confirmed:</strong> {confirmed}</p>
                    <p><strong>Recovered:</strong> {recovered}</p>
                    <p><strong>Deaths:</strong> {deaths}</p>
                  </div>
                </Tooltip>
                <Popup className="bg-gray-800 text-white">
                  <div className='bg-gray-800'>
                    <h3 className="text-lg font-bold">{state}</h3>
                    <p><strong>Active:</strong> {active}</p>
                    <p><strong>Confirmed:</strong> {confirmed}</p>
                    <p><strong>Recovered:</strong> {recovered}</p>
                    <p><strong>Deaths:</strong> {deaths}</p>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </Layout>
  );
};

export default CovidMap;
