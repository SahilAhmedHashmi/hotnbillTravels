import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout.jsx';
import HomePage from '../pages/HomePage.jsx';
import DestinationsPage from '../pages/DestinationsPage.jsx';
import DestinationDetailPage from '../pages/DestinationDetailPage.jsx';
import ExperiencesPage from '../pages/ExperiencesPage.jsx';
import ExperienceDetailPage from '../pages/ExperienceDetailPage.jsx';
import FleetPage from '../pages/FleetPage.jsx';
import VehicleDetailPage from '../pages/VehicleDetailPage.jsx';
import PackagesPage from '../pages/PackagesPage.jsx';
import PackageDetailPage from '../pages/PackageDetailPage.jsx';
import PlanMyTripPage from '../pages/PlanMyTripPage.jsx';
import BookingConfirmationPage from '../pages/BookingConfirmationPage.jsx';
import TravelGuidesPage from '../pages/TravelGuidesPage.jsx';
import AboutPage from '../pages/AboutPage.jsx';
import ContactPage from '../pages/ContactPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'destinations', element: <DestinationsPage /> },
      { path: 'destinations/:slug', element: <DestinationDetailPage /> },
      { path: 'experiences', element: <ExperiencesPage /> },
      { path: 'experiences/:slug', element: <ExperienceDetailPage /> },
      { path: 'fleet', element: <FleetPage /> },
      { path: 'fleet/:vehicleSlug', element: <VehicleDetailPage /> },
      { path: 'packages', element: <PackagesPage /> },
      { path: 'packages/:slug', element: <PackageDetailPage /> },
      { path: 'plan-my-trip', element: <PlanMyTripPage /> },
      { path: 'booking-confirmation', element: <BookingConfirmationPage /> },
      { path: 'travel-guides', element: <TravelGuidesPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
