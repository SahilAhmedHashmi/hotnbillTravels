import { Link } from 'react-router-dom';
import Button from './Button.jsx';
import Icon from './Icon.jsx';
import { contact } from '../../data/contact.js';

export default function FinalCta({ eyebrow, title, text, primaryLabel = 'Plan My Trip', primaryTo, className = '' }) {
  return (
    <section className={`system-final-cta ${className}`.trim()}>
      <p className="label">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{text}</p>
      <div className="cta-actions">
        <Link className="btn btn-gold" to={primaryTo}>{primaryLabel}</Link>
        <Button href={contact.phoneHref} variant="ghost"><Icon name="phone" /> Call</Button>
        <Button href={contact.whatsappHref} variant="ghost"><Icon name="whatsapp" /> WhatsApp</Button>
      </div>
    </section>
  );
}
