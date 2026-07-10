import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';
import DestinationFilters from '../components/destinations/DestinationFilters.jsx';
import DestinationListingCard from '../components/destinations/DestinationListingCard.jsx';
import DestinationMapPlaceholder from '../components/destinations/DestinationMapPlaceholder.jsx';
import DestinationFinalCta from '../components/destinations/DestinationFinalCta.jsx';
import { destinations } from '../data/destinations.js';
import { usePageMeta } from '../hooks/usePageMeta.js';

export default function DestinationsPage() {
  const [activeState, setActiveState] = useState('All');
  const filteredDestinations = useMemo(
    () => activeState === 'All' ? destinations : destinations.filter((item) => item.state === activeState),
    [activeState],
  );

  usePageMeta({
    title: 'Destinations Across Northeast India | Hornbill Journeys',
    description: 'Explore Northeast India destinations with local drivers, comfortable vehicles, and custom route planning.',
    image: destinations[0]?.image,
  });

  return (
    <main className="destinations-page">
      <section className="destination-page-hero">
        <div className="destination-hero-bg" />
        <div className="destination-hero-overlay" />
        <div className="destination-page-hero-inner">
          <Breadcrumbs items={[{ label: 'Destinations', current: true }]} />
          <p className="label">Destination Guide</p>
          <h1>Explore Destinations Across Northeast India</h1>
          <p>
            From misty hills and ancient monasteries to wildlife reserves and crystal-clear rivers, discover where your
            journey can begin.
          </p>
          <div className="destination-hero-actions">
            <Link className="btn btn-gold" to="/plan-my-trip">Plan My Trip</Link>
            <a className="btn btn-ghost" href="#destination-grid">Browse Destinations</a>
          </div>
        </div>
      </section>

      <section className="destination-listing-section" id="destination-grid">
        <div className="destination-listing-intro">
          <div>
            <p className="label">Where to Travel</p>
            <h2>Choose a region, then build the route around it.</h2>
          </div>
          <p>
            Filters are intentionally simple. Northeast India is best planned by state, road condition, travel season,
            and the vehicle your route needs.
          </p>
        </div>
        <DestinationFilters activeState={activeState} onChange={setActiveState} />
        <div className="destination-list-grid" aria-live="polite">
          {filteredDestinations.map((destination) => (
            <DestinationListingCard key={destination.slug} destination={destination} />
          ))}
        </div>
      </section>

      <DestinationMapPlaceholder activeState={activeState} onChange={setActiveState} />
      <section className="destination-help-strip">
        <strong>Not sure where to begin?</strong>
        <span>Tell us your dates, group size, and travel style. We will suggest a route that fits the season and road realities.</span>
        <Link to="/plan-my-trip">Plan My Trip</Link>
      </section>
      <DestinationFinalCta destination={{ name: 'Northeast India', slug: 'northeast-india' }} />
    </main>
  );
}

