export default function VehicleSpecGrid({ vehicle }) {
  const specs = [
    ['Passenger Capacity', vehicle.passengerCapacity],
    ['Luggage', vehicle.luggageCapacity],
    ['Air Conditioning', vehicle.airConditioning ? 'Yes' : 'No'],
    ['Driver Included', vehicle.driverIncluded ? 'Yes' : 'No'],
    ['Transmission', vehicle.transmission],
    ['Fuel Type', vehicle.fuelType],
    ['Ground Clearance', vehicle.groundClearance],
    ['Suitable Terrain', vehicle.suitableTerrain],
  ];

  return (
    <section className="vehicle-detail-section">
      <div className="fleet-section-heading">
        <p className="label">Specifications</p>
        <h2>Built for practical route planning.</h2>
      </div>
      <div className="vehicle-spec-grid">
        {specs.map(([label, value]) => (
          <div key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
