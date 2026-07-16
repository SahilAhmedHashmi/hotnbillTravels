import { Link } from 'react-router-dom';

export default function VehicleCard({ vehicle }) {
  return (
    <article className="vehicle-card">
      <div className="vehicle-img-wrap">
        <img src={vehicle.image} alt={vehicle.alt} loading="lazy" decoding="async" />
        <div className="vehicle-img-overlay" />
        {vehicle.badge ? <span className="vehicle-badge">{vehicle.badge}</span> : null}
      </div>
      <div className="vehicle-body">
        <p className="vehicle-type">{vehicle.type}</p>
        <h3 className="vehicle-name">{vehicle.name}</h3>
        <p className="vehicle-desc">{vehicle.description}</p>
        <div className="vehicle-specs">
          {vehicle.specs.map((spec) => (
            <span className="vehicle-spec" key={spec}>{spec}</span>
          ))}
        </div>
        <div className="vehicle-foot">
          <div className="vehicle-rate">
            {vehicle.rate}
            <span>{vehicle.rateNote}</span>
            {vehicle.secondaryRate ? (
              <>
                {vehicle.secondaryRate}
                <span>{vehicle.secondaryRateNote}</span>
              </>
            ) : null}
          </div>
          <div className="vehicle-actions">
            <Link className="vehicle-btn" to={`/fleet/${vehicle.slug}`}>View Details</Link>
            <Link className="vehicle-btn primary" to="/contact">Enquire Now</Link>
          </div>
        </div>
      </div>
    </article>
  );
}
