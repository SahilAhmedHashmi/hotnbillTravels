import DestinationListingCard from './DestinationListingCard.jsx';
import { destinations } from '../../data/destinations.js';

export default function RelatedDestinations({ destination }) {
  const related = destination.relatedDestinations
    .map((slug) => destinations.find((item) => item.slug === slug))
    .filter(Boolean)
    .slice(0, 3);

  if (!related.length) return null;

  return (
    <section className="destination-detail-section">
      <div className="detail-section-heading">
        <p className="label">Nearby Routes</p>
        <h2>Related Destinations</h2>
      </div>
      <div className="related-destinations">
        {related.map((item) => <DestinationListingCard key={item.slug} destination={item} />)}
      </div>
    </section>
  );
}
