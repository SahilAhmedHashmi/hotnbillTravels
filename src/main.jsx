import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router.jsx';
import { DesignProvider } from './context/DesignContext.jsx';
import './styles/tokens.css';
import './styles/global.css';
import './styles/system.css';
import './styles/home.css';
import './styles/destinations.css';
import './styles/map.css';
import './styles/experiences.css';
import './styles/fleet.css';
import './styles/booking.css';
import './styles/contact.css';
import './styles/directions.css';
import './styles/journeys.css';
import './styles/version-homes.css';
import './styles/version-pages.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DesignProvider><RouterProvider router={router} /></DesignProvider>
  </React.StrictMode>,
);
