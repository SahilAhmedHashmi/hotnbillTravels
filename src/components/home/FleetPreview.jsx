import Button from '../common/Button.jsx';
import Reveal from '../common/Reveal.jsx';
import SectionLabel from '../common/SectionLabel.jsx';
import VehicleCard from '../cards/VehicleCard.jsx';
import { vehicles } from '../../data/vehicles.js';
import { useHorizontalCarousel } from '../../hooks/useHorizontalCarousel.js';

export default function FleetPreview() {
  const { trackRef, canGoPrev, canGoNext, scrollByStep } = useHorizontalCarousel();

  return (
    <section className="vehicles">
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
        <button className="vehicle-arrow prev" type="button" aria-label="Previous vehicles" disabled={!canGoPrev} onClick={() => scrollByStep(-1)}>
          <span aria-hidden="true">‹</span>
        </button>
        <button className="vehicle-arrow next" type="button" aria-label="Next vehicles" disabled={!canGoNext} onClick={() => scrollByStep(1)}>
          <span aria-hidden="true">›</span>
        </button>
        <div className="vehicles-grid" ref={trackRef}>
          {vehicles.map((vehicle) => (
            <Reveal key={vehicle.slug}>
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
