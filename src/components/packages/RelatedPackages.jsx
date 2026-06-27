import PackageListingCard from './PackageListingCard.jsx';
import { packages } from '../../data/packages.js';

export default function RelatedPackages({ item }) {
  const related = item.relatedPackages
    .map((slug) => packages.find((pkg) => pkg.slug === slug))
    .filter(Boolean);

  if (!related.length) return null;

  return (
    <section className="package-detail-section">
      <div className="package-section-heading">
        <p className="label">Similar Journeys</p>
        <h2>Related Packages</h2>
      </div>
      <div className="package-list-grid compact">
        {related.map((pkg) => <PackageListingCard key={pkg.slug} item={pkg} />)}
      </div>
    </section>
  );
}
