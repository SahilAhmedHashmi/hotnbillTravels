import { Link } from 'react-router-dom';

export default function Logo({ asLink = true }) {
  const content = (
    <>
      <svg className="logo-mark" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="19" cy="19" r="18" stroke="#c8922a" strokeWidth="1" />
        <path d="M9 21 C9 21 11 15 16 14 C19 13 21 10 25 11 C28 11.5 29 9 31 10" stroke="#c8922a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <ellipse cx="17" cy="21" rx="6" ry="4" fill="none" stroke="#c8922a" strokeWidth="1" />
        <circle cx="25" cy="13" r="1.5" fill="#c8922a" />
        <path d="M17 25 L15 29 M17 25 L19 29" stroke="#c8922a" strokeWidth="1" strokeLinecap="round" />
      </svg>
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
