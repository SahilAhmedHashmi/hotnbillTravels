export default function VehiclePricing({ vehicle }) {
  return (
    <section className="vehicle-pricing-section">
      <div className="fleet-section-heading">
        <p className="label">Pricing</p>
        <h2>Clear daily rates, with route-specific final quotes.</h2>
      </div>
      <div className="vehicle-pricing-grid">
        <article className="pricing-card primary">
          <span>Starting from</span>
          <strong>{vehicle.pricing.perDay}</strong>
          <p>per day</p>
          {vehicle.pricing.secondaryPerDay ? <p>{vehicle.pricing.secondaryPerDay} for larger configuration</p> : null}
        </article>
        <article>
          <h3>Included</h3>
          <ul>{vehicle.pricing.included.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
        <article>
          <h3>Not Included</h3>
          <ul>{vehicle.pricing.notIncluded.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
        <article>
          <h3>Possible Extras</h3>
          <ul>{vehicle.pricing.extras.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
      </div>
    </section>
  );
}
