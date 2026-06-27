import { Link } from 'react-router-dom';
import { packages } from '../../data/packages.js';

export default function ExperiencePackages({ experience }) {
  const related = experience.relatedPackages
    .map((slug) => packages.find((item) => item.slug === slug))
    .filter(Boolean);

  return (
    <section className="experience-detail-section">
      <div className="experience-section-heading">
        <p className="label">Suggested Packages</p>
        <h2>Routes that match this travel style.</h2>
      </div>
      {related.length ? (
        <div className="experience-package-grid">
          {related.map((item) => (
            <article key={item.slug}>
              <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div>
                  <Link to={`/packages/${item.slug}`}>View Details</Link>
                  <Link to={`/plan-my-trip?experience=${experience.slug}&package=${item.slug}`}>Plan My Trip</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="experience-empty-state">
          <p>Custom trips for this experience are available. Tell us your travel dates and group size, and our team will help plan the right route.</p>
          <Link className="btn btn-gold" to={`/plan-my-trip?experience=${experience.slug}`}>Plan My Trip</Link>
        </div>
      )}
    </section>
  );
}
