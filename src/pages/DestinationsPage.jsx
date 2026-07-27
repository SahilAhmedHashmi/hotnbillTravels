import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';
import ImageCarousel from '../components/common/ImageCarousel.jsx';
import DestinationFilters from '../components/destinations/DestinationFilters.jsx';
import DestinationListingCard from '../components/destinations/DestinationListingCard.jsx';
import DestinationMap from '../components/destinations/DestinationMap.jsx';
import DestinationFinalCta from '../components/destinations/DestinationFinalCta.jsx';
import { destinationHeroImages, destinations, destinationStates } from '../data/destinations.js';
import { usePageMeta } from '../hooks/usePageMeta.js';

export default function DestinationsPage() {
  // The active state filter is derived from the `state` query param so links from
  // elsewhere (e.g. the footer) can deep-link to a pre-filtered listing.
  const [searchParams, setSearchParams] = useSearchParams();
  const stateParam = searchParams.get('state');
  const activeState = stateParam && destinationStates.includes(stateParam) ? stateParam : 'All';

  const handleStateChange = (nextState) => {
    const params = new URLSearchParams(searchParams);
    if (nextState === 'All') {
      params.delete('state');
    } else {
      params.set('state', nextState);
    }
    setSearchParams(params, { replace: true });
  };

  const filteredDestinations = useMemo(
    () => (activeState === 'All' ? destinations : destinations.filter((item) => item.state === activeState)),
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
        <ImageCarousel
          className="destination-hero-bg"
          images={destinationHeroImages}
          fallbackAlt="Northeast India nature landscape"
          interval={3800}
          eager
        />
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
            <Link className="btn btn-gold" to="/contact">Enquire Now</Link>
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
        <DestinationFilters activeState={activeState} onChange={handleStateChange} />
        <div className="destination-list-grid" aria-live="polite">
          {filteredDestinations.map((destination) => (
            <DestinationListingCard key={destination.slug} destination={destination} />
          ))}
        </div>
      </section>

      <DestinationMap />
      <section className="destination-help-strip">
        <strong>Not sure where to begin?</strong>
        <span>Tell us your dates, group size, and travel style. We will suggest a route that fits the season and road realities.</span>
        <Link to="/contact">Enquire Now</Link>
      </section>
      <DestinationFinalCta destination={{ name: 'Northeast India', slug: 'northeast-india' }} />
    </main>
  );
}

