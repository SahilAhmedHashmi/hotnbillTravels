import { useEffect, useState } from 'react';
import Button from '../common/Button.jsx';

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoaded(true), 80);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <section className="hero">
      <div className={`hero-bg ${loaded ? 'loaded' : ''}`} />
      <div className="hero-overlay" />
      <div className="hero-grain" />
      <div className="hero-content">
        <p className="hero-eyebrow"><span className="hero-eyebrow-line" />Northeast India · By Hornbill Journeys</p>
        <h1 className="hero-title">Where the <em>Wild</em><br />Meets the <em>Sacred</em></h1>
        <p className="hero-desc">
          Curated journeys across all eight states of Northeast India — from Kaziranga's rhinos to Meghalaya's
          living root bridges — with trusted local drivers and routes shaped around you.
        </p>
        <div className="hero-actions">
          <Button to="/plan-my-trip">Plan My Trip</Button>
          <Button to="/destinations" variant="ghost">Explore Destinations</Button>
        </div>
      </div>
      <div className="hero-scroll-indicator"><div className="scroll-track" />Scroll</div>
    </section>
  );
}
