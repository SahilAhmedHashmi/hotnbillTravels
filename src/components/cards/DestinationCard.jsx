import { Link } from 'react-router-dom';

export default function DestinationCard({ destination }) {
  return (
    <Link className={`dest-card ${destination.featured ? 'featured' : ''}`} to={`/destinations/${destination.slug}`}>
      <img src={destination.image} alt={destination.alt} loading={destination.featured ? 'eager' : 'lazy'} decoding="async" />
      <span className="dest-overlay" />
      <span className="dest-info">
        <span className="dest-tag">{destination.tag}</span>
        <span className="dest-name">{destination.name}</span>
        {destination.summary ? <span className="dest-sub">{destination.summary}</span> : null}
        <span className="dest-pill">Explore</span>
      </span>
    </Link>
  );
}
