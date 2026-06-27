import FinalCta from '../common/FinalCta.jsx';

export default function PackageFinalCta({ item }) {
  return (
    <FinalCta
      eyebrow="Start This Journey"
      title="Ready to Start This Journey?"
      text="Use this package as a starting point. Dates, stays, vehicle, route pace, and interests can all be customized."
      primaryTo={`/plan-my-trip?package=${item.slug}`}
      className="package-final-cta"
    />
  );
}
