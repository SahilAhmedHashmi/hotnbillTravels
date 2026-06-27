import { Link } from 'react-router-dom';
import { getVehicleBySlug } from '../../data/vehicles.js';

export default function PackageVehicle({ item }) {
  const vehicle = getVehicleBySlug(item.recommendedVehicle);
  if (!vehicle) return null;

  return (
    <section className="package-vehicle-section">
      <div className="package-section-heading">
        <p className="label">Recommended Vehicle</p>
        <h2>Best suited for this route.</h2>
      </div>
      <article>
        <img src={vehicle.image} alt={vehicle.alt} loading="lazy" decoding="async" />
        <div>
          <span>{vehicle.passengerCapacity}</span>
          <h3>{vehicle.name}</h3>
          <p>{vehicle.description}</p>
          <Link to={`/plan-my-trip?package=${item.slug}&vehicle=${vehicle.slug}`}>Book This Vehicle</Link>
        </div>
      </article>
    </section>
  );
}
