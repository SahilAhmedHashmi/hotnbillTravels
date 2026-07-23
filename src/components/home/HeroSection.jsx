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
        <h1 className="hero-title">Travel the <em>Wild</em><br /><em>Northeast</em> of India</h1>
        <p className="hero-desc">
          Tailor-made trips across Assam, Meghalaya, Nagaland, Arunachal, and beyond — with expert local guides,
          comfortable private vehicles, and itineraries planned entirely around you.
        </p>
        <div className="hero-actions">
          <Button to="/contact">Contact Us</Button>
          <Button to="/destinations" variant="ghost">Explore Destinations</Button>
        </div>
      </div>
      <div className="hero-scroll-indicator"><div className="scroll-track" />Scroll</div>
    </section>
  );
}
