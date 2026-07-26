import { Link } from 'react-router-dom';
import { getDestinationBySlug } from '../../data/destinations.js';
import PackageImageCarousel from './PackageImageCarousel.jsx';

export default function PackageListingCard({ item }) {
  const destinationNames = item.destinations.map((slug) => getDestinationBySlug(slug)?.name).filter(Boolean);

  return (
    <article className="package-list-card">
      <Link className="package-list-image" to={`/packages/${item.slug}`} aria-label={`View ${item.title}`}>
        <PackageImageCarousel item={item} />
      </Link>
      <div className="package-list-body">
        <p>{item.duration}</p>
        <h2><Link to={`/packages/${item.slug}`}>{item.title}</Link></h2>
        <p>{item.description}</p>
        <div className="package-list-meta">
          <span>{destinationNames.slice(0, 3).join(', ')}</span>
          <span>{item.idealFor.slice(0, 2).join(', ')}</span>
          <span>{item.price}</span>
        </div>
        <div className="package-list-actions">
          <Link to={`/packages/${item.slug}`}>View Details</Link>
          <Link to="/contact">Enquire Now</Link>
        </div>
      </div>
    </article>
  );
}
