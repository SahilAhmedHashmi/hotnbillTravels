import { Link } from 'react-router-dom';

export default function ExperienceDestinationCard({ experience, destination }) {
  return (
    <article className="experience-destination-card">
      <Link to={`/destinations/${destination.slug}`} className="experience-destination-image">
        <img src={destination.image} alt={destination.alt} loading="lazy" decoding="async" />
      </Link>
      <div>
        <span>{destination.state}</span>
        <h3>{destination.name}</h3>
        <p>{destination.shortDescription}</p>
        <div className="experience-destination-actions">
          <Link to={`/destinations/${destination.slug}`}>Learn More</Link>
          <Link to={`/plan-my-trip?experience=${experience.slug}&destination=${destination.slug}`}>Plan My Trip</Link>
        </div>
      </div>
    </article>
  );
}
