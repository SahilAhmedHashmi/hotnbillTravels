import { useEffect } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import FloatingContactWidget from '../components/layout/FloatingContactWidget.jsx';
import { useDesign } from '../context/DesignContext.jsx';
import gsap from 'gsap';

function RouteEffects() {
  const location = useLocation();
  const { direction } = useDesign();

  useEffect(() => {
    if (!location.hash) return undefined;

    const id = decodeURIComponent(location.hash.slice(1));
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.hash, location.pathname, location.search]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let tween;
    const frame = requestAnimationFrame(() => {
      const main = document.querySelector('main');
      if (!main) return;
      const from = {
        cinematic:{y:18}, editorial:{x:-6}, earthy:{y:12}, minimal:{y:2}, photographic:{scale:.996},
      }[direction];
      const duration = {cinematic:.85,editorial:.36,earthy:.55,minimal:.16,photographic:.62}[direction];
      tween = gsap.fromTo(main,from,{x:0,y:0,scale:1,duration,ease:direction==='minimal'?'none':'power2.out',clearProps:'transform'});
    });
    return () => { cancelAnimationFrame(frame); tween?.kill(); };
  }, [location.pathname, direction]);

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
