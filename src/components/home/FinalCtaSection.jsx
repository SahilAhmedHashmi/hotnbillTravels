import Button from '../common/Button.jsx';
import Icon from '../common/Icon.jsx';
import SectionLabel from '../common/SectionLabel.jsx';
import { contact } from '../../data/contact.js';

export default function FinalCtaSection() {
  return (
    <section className="cta-section">
      <SectionLabel>Begin Your Journey</SectionLabel>
      <h2>Let the Northeast <em>Call</em> You Home</h2>
      <p>
        Tell us what you are drawn to - wildlife, mountains, culture, rivers, or a little of everything - and we will
        shape a route that feels personal.
      </p>
      <div className="cta-actions">
        <Button to="/plan-my-trip">Plan My Trip</Button>
        <Button href={contact.phoneHref} variant="ghost"><Icon name="phone" /> Call</Button>
        <Button href={contact.whatsappHref} variant="ghost"><Icon name="whatsapp" /> WhatsApp</Button>
      </div>
    </section>
  );
}
