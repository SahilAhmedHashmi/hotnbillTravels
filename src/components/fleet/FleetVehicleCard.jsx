import { Link } from 'react-router-dom';

export default function FleetVehicleCard({ vehicle }) {
  return (
    <article className="fleet-card">
      <Link className="fleet-card-image" to={`/fleet/${vehicle.slug}`}>
        <img src={vehicle.image} alt={vehicle.alt} loading="lazy" decoding="async" />
        {vehicle.badge ? <span>{vehicle.badge}</span> : null}
      </Link>
      <div className="fleet-card-body">
        <p>{vehicle.type}</p>
        <h2><Link to={`/fleet/${vehicle.slug}`}>{vehicle.name}</Link></h2>
        <div className="fleet-card-specs">
          <span>{vehicle.passengerCapacity}</span>
          <span>{vehicle.luggageCapacity}</span>
          <span>{vehicle.pricing.perDay} / day</span>
        </div>
        <p>{vehicle.description}</p>
        <div className="fleet-card-tags">
          {vehicle.recommendedFor.slice(0, 3).map((item) => <span key={item}>{item}</span>)}
        </div>
        <div className="fleet-card-actions">
          <Link to={`/fleet/${vehicle.slug}`}>View Details</Link>
          <Link to={`/plan-my-trip?vehicle=${vehicle.slug}`}>Choose Vehicle</Link>
        </div>
      </div>
    </article>
  );
}
