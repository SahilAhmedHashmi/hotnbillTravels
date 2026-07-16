import { Link, useParams } from 'react-router-dom';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';
import DestinationGallery from '../components/destinations/DestinationGallery.jsx';
import DestinationFaqs from '../components/destinations/DestinationFaqs.jsx';
import DestinationFinalCta from '../components/destinations/DestinationFinalCta.jsx';
import RelatedDestinations from '../components/destinations/RelatedDestinations.jsx';
import { getDestinationBySlug } from '../data/destinations.js';
import { vehicles } from '../data/vehicles.js';
import { usePageMeta } from '../hooks/usePageMeta.js';

export default function DestinationDetailPage() {
  const { slug } = useParams();
  const destination = getDestinationBySlug(slug);
  const pageUrl = typeof window !== 'undefined' ? `${window.location.origin}/destinations/${slug}` : '';
  const pageDescription = destination
    ? `Explore ${destination.name} with local drivers, comfortable vehicles, and custom Northeast India travel support.`
    : 'The requested Northeast India destination could not be found.';

  usePageMeta({
    title: destination ? `${destination.name} Travel Guide | Northeast India Tours` : 'Destination Not Found | Hornbill Journeys',
    description: pageDescription,
    image: destination?.image,
    canonical: pageUrl,
    noIndex: !destination,
    schema: destination ? [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: `${destination.name} Travel Guide`,
        description: pageDescription,
        url: pageUrl,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${window.location.origin}/` },
          { '@type': 'ListItem', position: 2, name: 'Destinations', item: `${window.location.origin}/destinations` },
          { '@type': 'ListItem', position: 3, name: destination.name, item: pageUrl },
        ],
      },
    ] : undefined,
  });

  if (!destination) {
    return (
      <main className="placeholder-page">
        <section>
          <p className="label">Destination Not Found</p>
          <h1>We could not find that destination.</h1>
          <p>The route may have changed, or this destination has not been added yet.</p>
          <div className="placeholder-actions">
            <Link className="btn btn-gold" to="/destinations">Browse Destinations</Link>
            <Link className="btn btn-ghost" to="/contact">Enquire Now</Link>
          </div>
        </section>
      </main>
    );
  }

  const recommendedVehicles = destination.suggestedVehicles
    .map((vehicleSlug) => vehicles.find((vehicle) => vehicle.slug === vehicleSlug))
    .filter(Boolean);

  return (
    <main className="destination-detail-page">
      <section className="destination-detail-hero">
        <img src={destination.image} alt={destination.alt} loading="eager" decoding="async" fetchPriority="high" />
        <div className="destination-detail-hero-overlay" />
        <div className="destination-detail-hero-inner">
          <Breadcrumbs
            items={[
              { label: 'Destinations', to: '/destinations' },
              { label: destination.name, current: true },
            ]}
          />
          <span className="destination-state-badge">{destination.state}</span>
          <h1>{destination.name}</h1>
          <p>{destination.shortDescription}</p>
          <div className="destination-hero-actions">
            <Link className="btn btn-gold" to="/contact">Enquire Now</Link>
            <a className="btn btn-ghost" href="#itinerary">View Suggested Itinerary</a>
          </div>
        </div>
      </section>

      <section className="destination-overview">
        <div className="destination-overview-copy">
          <p className="label">Overview</p>
          <h2>Why travelers choose {destination.name}</h2>
          <p>{destination.longDescription}</p>
        </div>
        <div className="destination-fast-facts">
          <div><span>Best Time</span><strong>{destination.bestTimeToVisit}</strong></div>
          <div><span>Duration</span><strong>{destination.recommendedDuration}</strong></div>
          <div><span>Ideal For</span><strong>{destination.idealFor.join(', ')}</strong></div>
        </div>
      </section>

      <section className="destination-detail-section">
        <div className="detail-section-heading">
          <p className="label">Top Attractions</p>
          <h2>What to See</h2>
        </div>
        <div className="attraction-grid">
          {destination.highlights.map((highlight) => (
            <article key={highlight}>
              <h3>{highlight}</h3>
              <p>A key stop that helps define the route, pacing, and local character of {destination.name}.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="destination-detail-section" id="itinerary">
        <div className="detail-section-heading">
          <p className="label">Route Ideas</p>
          <h2>Suggested Itinerary Ideas</h2>
        </div>
        <div className="itinerary-grid">
          {destination.itineraryIdeas.map((idea) => (
            <article key={idea.title}>
              <h3>{idea.title}</h3>
              <ul>
                {idea.days.map((day) => <li key={day}>{day}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="destination-vehicle-section">
        <div className="detail-section-heading">
          <p className="label">Recommended Vehicles</p>
          <h2>Travel {destination.name} with the right vehicle.</h2>
          <p>
            Vehicle choice changes the comfort of a Northeast route. These options are recommended for this destination's
            distance, roads, and typical group size.
          </p>
        </div>
        <div className="destination-vehicle-grid">
          {recommendedVehicles.map((vehicle) => (
            <article key={vehicle.slug}>
              <img src={vehicle.image} alt={vehicle.alt} loading="lazy" decoding="async" />
              <div>
                <span>{vehicle.type}</span>
                <h3>{vehicle.name}</h3>
                <p>{vehicle.description}</p>
                <Link to="/contact">Enquire Now</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <DestinationGallery destination={destination} />
      <DestinationFaqs destination={destination} />
      <RelatedDestinations destination={destination} />
      <DestinationFinalCta destination={destination} />
    </main>
  );
}

