import { Link } from 'react-router-dom';
import { vehicles } from '../../data/vehicles.js';

export default function ExperienceVehicles({ experience }) {
  const recommended = experience.suggestedVehicles
    .map((slug) => vehicles.find((vehicle) => vehicle.slug === slug))
    .filter(Boolean);

  return (
    <section className="experience-vehicle-section">
      <div className="experience-section-heading">
        <p className="label">Recommended Vehicles</p>
        <h2>The right vehicle changes the journey.</h2>
        <p>These options are recommended for this experience based on route comfort, terrain, and typical group size.</p>
      </div>
      <div className="experience-vehicle-grid">
        {recommended.map((vehicle) => (
          <article key={vehicle.slug}>
            <img src={vehicle.image} alt={vehicle.alt} loading="lazy" decoding="async" />
            <div>
              <span>{vehicle.type}</span>
              <h3>{vehicle.name}</h3>
              <p>{vehicle.description}</p>
              <Link to={`/plan-my-trip?experience=${experience.slug}&vehicle=${vehicle.slug}`}>Book This Vehicle</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
