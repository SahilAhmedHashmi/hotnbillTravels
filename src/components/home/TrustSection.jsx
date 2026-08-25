import Reveal from '../common/Reveal.jsx';
import SectionLabel from '../common/SectionLabel.jsx';
import { trustStats } from '../../data/trustStats.js';

export default function TrustSection() {
  return (
    <section className="trust-section">
      <div className="trust-inner">
        <div className="trust-copy">
          <SectionLabel>What we take care of</SectionLabel>
          <h2>Good journeys are built in the details you should not have to manage.</h2>
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
