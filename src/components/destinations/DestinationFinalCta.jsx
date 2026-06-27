import FinalCta from '../common/FinalCta.jsx';

export default function DestinationFinalCta({ destination }) {
  return (
    <FinalCta
      eyebrow="Start Planning"
      title={`Ready to Explore ${destination.name}?`}
      text="Share your dates, group size, comfort needs, and route preferences. We will shape a practical plan around them."
      primaryTo={`/plan-my-trip?destination=${destination.slug}`}
      className="destination-final-cta"
    />
  );
}
