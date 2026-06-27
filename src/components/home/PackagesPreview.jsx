import { Link } from 'react-router-dom';
import Reveal from '../common/Reveal.jsx';
import SectionLabel from '../common/SectionLabel.jsx';
import PackageCard from '../cards/PackageCard.jsx';
import { featuredPackages } from '../../data/packages.js';

export default function PackagesPreview() {
  return (
    <section className="packages">
      <div className="section-header pkg-header">
        <div>
          <SectionLabel>Curated Itineraries</SectionLabel>
          <h2>Featured Packages</h2>
          <p className="section-bridge dark">For travellers who want the route, stays, transport, permits, and timing handled properly.</p>
        </div>
        <Link to="/packages" className="view-all dark">View All Packages</Link>
      </div>
      <div className="pkg-list">
        {featuredPackages.map((item, index) => (
          <Reveal key={item.slug} delay={index}>
            <PackageCard item={item} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
