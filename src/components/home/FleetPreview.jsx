import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Button from '../common/Button.jsx';
import Reveal from '../common/Reveal.jsx';
import SectionLabel from '../common/SectionLabel.jsx';
import VehicleCard from '../cards/VehicleCard.jsx';
import { vehicles } from '../../data/vehicles.js';
import { useHorizontalCarousel } from '../../hooks/useHorizontalCarousel.js';

export default function FleetPreview() {
  const rootRef = useRef(null);
  const { trackRef, activeIndex, canGoPrev, canGoNext, move, goTo } = useHorizontalCarousel(vehicles.length);

  useGSAP(() => {
    const items = [...(trackRef.current?.querySelectorAll('[data-carousel-item]') ?? [])];
    if (!items.length) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    items.forEach((item, index) => {
      item.classList.toggle('is-focused', index === activeIndex);
      item.setAttribute('aria-current', index === activeIndex ? 'true' : 'false');
    });
    if (reduced) return;
    gsap.to(items, {
      scale: (index) => (index === activeIndex ? 1 : 0.91),
      autoAlpha: (index) => (index === activeIndex ? 1 : 0.66),
      y: (index) => (index === activeIndex ? 0 : 14),
      duration: 0.48,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  }, { scope: rootRef, dependencies: [activeIndex], revertOnUpdate: false });

  return (
    <section className="vehicles" ref={rootRef} aria-roledescription="carousel" aria-label="Our fleet">
      <div className="vehicles-header">
        <div>
          <SectionLabel>Travel in Comfort</SectionLabel>
          <h2>Our <em>Fleet</em> of Vehicles</h2>
          <p className="sub">
            Every journey deserves the right wheels. Our maintained fleet is curated for Northeast India's mountain
            passes, forest roads, long transfers, and family routes.
          </p>
        </div>
        <Button to="/fleet">View Fleet</Button>
      </div>
      <div className="vehicles-carousel">
        <button className="vehicle-arrow prev" type="button" aria-label="Previous vehicle" disabled={!canGoPrev} onClick={() => move(-1)}>
          <span aria-hidden="true">‹</span>
        </button>
        <button className="vehicle-arrow next" type="button" aria-label="Next vehicle" disabled={!canGoNext} onClick={() => move(1)}>
          <span aria-hidden="true">›</span>
        </button>
        <div className="vehicles-grid" ref={trackRef} tabIndex="0" aria-label="Vehicle slides" onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
          if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
          if (event.key === 'Home') { event.preventDefault(); goTo(0); }
          if (event.key === 'End') { event.preventDefault(); goTo(vehicles.length - 1); }
        }}>
          {vehicles.map((vehicle, index) => (
            <Reveal key={vehicle.slug} data-carousel-item="" role="group" aria-label={`${index + 1} of ${vehicles.length}`}>
              <VehicleCard vehicle={vehicle} />
            </Reveal>
          ))}
        </div>
      </div>
      <Reveal className="vehicle-note">
        <span aria-hidden="true">i</span>
        All vehicles come with experienced local drivers who double as informal guides. Rates are indicative and vary
        by season and itinerary. Permit assistance for restricted areas is available.
      </Reveal>
    </section>
  );
}
