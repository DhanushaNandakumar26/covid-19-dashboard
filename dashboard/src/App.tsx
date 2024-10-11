import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Covid19List from './pages/Covid19List/Covid19List';
import CovidMap from './components/Map/Map';
import IndividualDashboard from './pages/IndividualDashboard/IndividualDashboard';
import CovidPieChart from './pages/CovidChart/CovidChart';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Dashboard />
    )
  },
  {
    path: "/maps",
    element: (
      <CovidMap />
    )
  },
  {
    path: "/covid19-list",
    element: (
      <Covid19List/>
    )
  },
  {
    path: "/individualDashboard",
    element: (
      < IndividualDashboard/>
    )
  },
  {
    path: "/todayCovidCase",
    element: (
      <CovidPieChart/>
    )
  },
])

function App() {
  return (
    <div className="App">
     <RouterProvider router={router} />
    </div>
  );
}

export default App;
