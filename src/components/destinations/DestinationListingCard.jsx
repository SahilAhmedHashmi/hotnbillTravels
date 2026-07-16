import { Link } from 'react-router-dom';

export default function DestinationListingCard({ destination }) {
  return (
    <article className="destination-list-card">
      <Link className="destination-list-image" to={`/destinations/${destination.slug}`} aria-label={`Learn more about ${destination.name}`}>
        <img src={destination.image} alt={destination.alt} loading="lazy" decoding="async" />
      </Link>
      <div className="destination-list-body">
        <div className="destination-list-meta">
          <span>{destination.state}</span>
          <span>{destination.recommendedDuration}</span>
        </div>
        <h2><Link to={`/destinations/${destination.slug}`}>{destination.name}</Link></h2>
        <p>{destination.shortDescription}</p>
        <div className="destination-tags">
          {destination.highlights.slice(0, 3).map((highlight) => <span key={highlight}>{highlight}</span>)}
        </div>
        <div className="destination-card-actions">
          <Link className="destination-learn" to={`/destinations/${destination.slug}`}>Learn More</Link>
          <Link className="destination-plan" to="/contact">Enquire Now</Link>
        </div>
      </div>
    </article>
  );
}
