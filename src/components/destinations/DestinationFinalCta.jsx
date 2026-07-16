import FinalCta from '../common/FinalCta.jsx';

export default function DestinationFinalCta({ destination }) {
  return (
    <FinalCta
      eyebrow="Start Planning"
      title={`Ready to Explore ${destination.name}?`}
      text="Share your travel dates, preferred pace, and interests. We will recommend the right route and help you plan a smooth journey."
      primaryTo="/contact"
      className="destination-final-cta"
    />
  );
}
