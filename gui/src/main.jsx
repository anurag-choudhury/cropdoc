import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Irrigation  from './Irrigation.jsx'
import Weather from './Weather.jsx'
import Disease from './Disease.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/IrrigationPage",
    element: <Irrigation/>,
  },
  {
    path: "/WeatherPage",
    element: <Weather/>,
  },
  {
    path: "/DiseasePage",
    element: <Disease/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
