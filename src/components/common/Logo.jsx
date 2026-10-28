import { Link } from 'react-router-dom';

export default function Logo({ asLink = true }) {
  const content = (
    <>
      <img
        className="logo-mark"
        src="/hornbill-logo.svg"
        alt="Hornbill Journeys emblem"
        width="72"
        height="58"
        loading="eager"
        decoding="async"
      />
      <span>
        <span className="logo-name">Hornbill Journeys</span>
        <span className="logo-tagline">Northeast India Travel</span>
      </span>
    </>
  );

  if (!asLink) return <div className="logo">{content}</div>;
  return (
    <Link className="logo" to="/" aria-label="Hornbill Journeys home">
      {content}
    </Link>
  );
}
