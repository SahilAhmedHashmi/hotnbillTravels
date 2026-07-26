import { Link } from 'react-router-dom';
import PackageImageCarousel from '../packages/PackageImageCarousel.jsx';

export default function PackageCard({ item }) {
  return (
    <article className="pkg-item">
      <Link className="pkg-image-link" to={`/packages/${item.slug}`} aria-label={`View ${item.title}`}>
        <PackageImageCarousel item={item} />
      </Link>
      <div className="pkg-body">
        <div className="pkg-meta">
          <span className="pkg-meta-item">{item.duration}</span>
          <span className="pkg-meta-item">{item.groupSize}</span>
          <span className="pkg-meta-item rating">{item.rating}</span>
        </div>
        <h3><Link to={`/packages/${item.slug}`}>{item.title}</Link></h3>
        <p>{item.description}</p>
        <div className="pkg-tags">
          {item.tags.map((tag) => <span className="pkg-tag" key={tag}>{tag}</span>)}
        </div>
      </div>
      <div className="pkg-price-col">
        <div>
          <p className="pkg-price-from">Starting from</p>
          <p className="pkg-price-amt">{item.price}</p>
          <p className="pkg-price-per">per person</p>
        </div>
        <div className="pkg-actions">
          <Link className="pkg-btn secondary" to={`/packages/${item.slug}`}>View Details</Link>
          <Link className="pkg-btn" to="/contact">Enquire Now</Link>
        </div>
      </div>
    </article>
  );
}
