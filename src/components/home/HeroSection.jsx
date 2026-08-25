import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../common/Button.jsx';
import { useReducedMotion } from '../../hooks/useReducedMotion.js';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const rootRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoaded(true), 80);
    return () => window.clearTimeout(timeout);
  }, []);

  useGSAP(() => {
    if (reduceMotion) return;

    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
    timeline
      .from('.hero-main', { y: 18, duration: 0.68 })
      .from('.hero-fieldnote', { x: 16, duration: 0.45 }, '-=0.5');

    gsap.to('.hero-bg', {
      yPercent: 8,
      ease: 'none',
      scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: 0.5 },
    });
  }, { scope: rootRef, dependencies: [reduceMotion], revertOnUpdate: true });

  return (
    <section className="hero" ref={rootRef}>
      <div className={`hero-bg ${loaded ? 'loaded' : ''}`} />
      <div className="hero-overlay" />
      <div className="hero-grain" />
      <div className="hero-content">
        <div className="hero-main">
          <p className="hero-eyebrow"><span className="hero-eyebrow-line" />Northeast India, thoughtfully travelled</p>
          <h1 className="hero-title"><span>Go further.</span><span><em>Travel closer.</em></span></h1>
          <p className="hero-desc">
            Private, tailor-made journeys shaped by local knowledge—from Assam’s river islands to Arunachal’s high passes.
          </p>
          <div className="hero-actions">
            <Button to="/plan-my-trip">Plan my journey</Button>
            <Button to="/destinations" variant="ghost">See the region</Button>
          </div>
        </div>
        <aside className="hero-fieldnote" aria-label="Featured journey">
          <span>Field note · 01</span>
          <strong>The Eastern Himalaya</strong>
          <p>Monastery roads, pine valleys and long mornings above the clouds.</p>
          <a href="#about-preview">How we travel <i aria-hidden="true">→</i></a>
        </aside>
      </div>
      <a className="hero-scroll-indicator" href="#about-preview"><span>Scroll to discover</span><span className="scroll-track" /></a>
    </section>
  );
}
