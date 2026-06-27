const cues = [
  ['Experienced Drivers', 'Local drivers who understand hill roads, weather shifts, early departures, and remote routes.'],
  ['Clean Vehicles', 'Vehicles selected for comfort, luggage balance, and practical Northeast road conditions.'],
  ['Transparent Pricing', 'Rates are clearly presented with included items, extras, and route-specific notes.'],
  ['Local Expertise', 'Transport planning connected to destinations, permits, route timing, and realistic pacing.'],
];

export default function FleetWhySection() {
  return (
    <section className="fleet-why-section">
      <div className="fleet-section-heading">
        <p className="label">Why Our Fleet</p>
        <h2>Comfort is only useful when the route is handled properly.</h2>
      </div>
      <div className="fleet-trust-grid">
        {cues.map(([title, copy]) => (
          <article key={title}>
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
