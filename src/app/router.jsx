import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout.jsx';

const page = (importer) => async () => ({ Component: (await importer()).default });

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, lazy: page(() => import('../pages/HomePage.jsx')) },
      { path: 'destinations', lazy: page(() => import('../pages/DestinationsPage.jsx')) },
      { path: 'destinations/:slug', lazy: page(() => import('../pages/DestinationDetailPage.jsx')) },
      { path: 'experiences', lazy: page(() => import('../pages/ExperiencesPage.jsx')) },
      { path: 'experiences/:slug', lazy: page(() => import('../pages/ExperienceDetailPage.jsx')) },
      { path: 'fleet', lazy: page(() => import('../pages/FleetPage.jsx')) },
      { path: 'fleet/:vehicleSlug', lazy: page(() => import('../pages/VehicleDetailPage.jsx')) },
      { path: 'plan-my-trip', lazy: page(() => import('../pages/PlanMyTripPage.jsx')) },
      { path: 'booking-confirmation', lazy: page(() => import('../pages/BookingConfirmationPage.jsx')) },
      { path: 'travel-guides', lazy: page(() => import('../pages/TravelGuidesPage.jsx')) },
      { path: 'about', lazy: page(() => import('../pages/AboutPage.jsx')) },
      { path: 'contact', lazy: page(() => import('../pages/ContactPage.jsx')) },
      { path: '*', lazy: page(() => import('../pages/NotFoundPage.jsx')) },
    ],
  },
]);
