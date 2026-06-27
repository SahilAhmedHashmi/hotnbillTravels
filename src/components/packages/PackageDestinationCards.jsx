import { Link } from 'react-router-dom';
import { getDestinationBySlug } from '../../data/destinations.js';

export default function PackageDestinationCards({ item }) {
  const destinations = item.destinations.map((slug) => getDestinationBySlug(slug)).filter(Boolean);

  return (
    <section className="package-detail-section">
      <div className="package-section-heading">
        <p className="label">Destinations Covered</p>
        <h2>The route at a glance.</h2>
      </div>
      <div className="package-destination-grid">
        {destinations.map((destination) => (
          <Link key={destination.slug} to={`/destinations/${destination.slug}`}>
            <img src={destination.image} alt={destination.alt} loading="lazy" decoding="async" />
            <span>{destination.state}</span>
            <strong>{destination.name}</strong>
          </Link>
        ))}
      </div>
    </section>
  );
}
