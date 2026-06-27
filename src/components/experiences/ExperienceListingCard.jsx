import { Link } from 'react-router-dom';

export default function ExperienceListingCard({ experience }) {
  return (
    <Link className="experience-list-card" to={`/experiences/${experience.slug}`}>
      <span className="experience-list-image">
        <img src={experience.image} alt={experience.alt} loading="lazy" decoding="async" />
        {experience.badge ? <span>{experience.badge}</span> : null}
      </span>
      <span className="experience-list-body">
        <span className="experience-icon">{experience.icon}</span>
        <strong>{experience.title}</strong>
        <span>{experience.shortDescription}</span>
        <span className="experience-tags">
          {experience.highlights.slice(0, 3).map((highlight) => <em key={highlight}>{highlight}</em>)}
        </span>
        <span className="experience-card-cta">Explore Experience</span>
      </span>
    </Link>
  );
}
