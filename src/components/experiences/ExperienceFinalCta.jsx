import FinalCta from '../common/FinalCta.jsx';

export default function ExperienceFinalCta({ experience }) {
  return (
    <FinalCta
      eyebrow="Start Planning"
      title="Ready to Plan This Experience?"
      text="Share your travel dates, group size, comfort level, and interests. We will match the right route, vehicle, and pace."
      primaryTo={`/plan-my-trip?experience=${experience.slug}`}
      className="experience-final-cta"
    />
  );
}
