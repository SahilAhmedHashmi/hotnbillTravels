import FinalCta from '../common/FinalCta.jsx';

export default function VehicleFinalCta({ vehicle }) {
  return (
    <FinalCta
      eyebrow="Book This Vehicle"
      title={`Ready to travel with ${vehicle.name}?`}
      text="Share your route, dates, group size, and luggage needs. We will confirm the right vehicle and final quote."
      primaryLabel="Book Now"
      primaryTo={`/plan-my-trip?vehicle=${vehicle.slug}`}
      className="vehicle-final-cta"
    />
  );
}
