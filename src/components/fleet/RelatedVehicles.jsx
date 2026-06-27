import FleetVehicleCard from './FleetVehicleCard.jsx';
import { vehicles } from '../../data/vehicles.js';

export default function RelatedVehicles({ vehicle }) {
  const related = vehicle.relatedVehicles
    .map((slug) => vehicles.find((item) => item.slug === slug))
    .filter(Boolean);

  if (!related.length) return null;

  return (
    <section className="vehicle-detail-section">
      <div className="fleet-section-heading">
        <p className="label">Compare Options</p>
        <h2>Related Vehicles</h2>
      </div>
      <div className="fleet-grid compact">
        {related.map((item) => <FleetVehicleCard key={item.slug} vehicle={item} />)}
      </div>
    </section>
  );
}
