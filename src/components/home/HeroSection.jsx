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
        <p className="hero-eyebrow"><span className="hero-eyebrow-line" />Discover the Unexplored</p>
        <h1 className="hero-title">Where the <em>Wild</em><br />Meets the <em>Sacred</em></h1>
        <p className="hero-desc">
          Journey through mist-draped valleys, ancient living bridges, rhino sanctuaries, and the vibrant tribal
          heritage of India's last great frontier.
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
