import { useEffect } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import FloatingContactWidget from '../components/layout/FloatingContactWidget.jsx';

function RouteEffects() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return undefined;

    const id = decodeURIComponent(location.hash.slice(1));
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.hash, location.pathname, location.search]);

  return null;
}

export default function RootLayout() {
  return (
    <>
      <ScrollRestoration />
      <RouteEffects />
      <Navbar />
      <Outlet />
      <Footer />
      <FloatingContactWidget />
    </>
  );
}
