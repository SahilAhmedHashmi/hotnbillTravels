import { Link } from 'react-router-dom';

export default function ExperienceCard({ experience }) {
  return (
    <Link className="exp-card" to={`/experiences/${experience.slug}`}>
      <span className="exp-img">
        <img src={experience.image} alt={experience.alt} loading="lazy" decoding="async" />
        {experience.badge ? <span className="exp-badge">{experience.badge}</span> : null}
      </span>
      <span className="exp-body">
        <span className="exp-ico" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="#c8922a" strokeWidth="1.5">
            <path d="M3 17l4-8 4 4 4-6 4 10" />
          </svg>
        </span>
        <span className="exp-title">{experience.title}</span>
        <span className="exp-copy">{experience.summary}</span>
      </span>
    </Link>
  );
}
