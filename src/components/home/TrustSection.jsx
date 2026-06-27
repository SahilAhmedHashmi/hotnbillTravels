import Reveal from '../common/Reveal.jsx';
import SectionLabel from '../common/SectionLabel.jsx';
import { trustStats } from '../../data/trustStats.js';

export default function TrustSection() {
  return (
    <section className="trust-section">
      <div className="trust-inner">
        <div className="trust-copy">
          <SectionLabel>Why Travelers Trust Us</SectionLabel>
          <h2>Local knowledge, careful planning, and support when the road changes.</h2>
        </div>
        <div className="trust-grid">
          {trustStats.map((item, index) => (
            <Reveal key={item.label} delay={index}>
              <article className="trust-card">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
                <p>{item.detail}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
