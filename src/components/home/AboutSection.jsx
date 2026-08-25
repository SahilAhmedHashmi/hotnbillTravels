import Reveal from '../common/Reveal.jsx';
import SectionLabel from '../common/SectionLabel.jsx';

const features = [
  ['Local knowledge', 'Guides and drivers who understand the region’s roads and rhythms'],
  ['Private routes', 'A journey planned around your dates, pace, and interests'],
  ['Practical support', 'Help with vehicles, stays, transfers, and restricted-area permits'],
  ['Time to wander', 'Room for weather, photography, food stops, and small detours'],
];

export default function AboutSection() {
  return (
    <section className="about" id="about-preview">
      <div className="about-inner">
        <Reveal className="about-img-col">
          <div className="about-dot-grid" />
          <img
            className="about-img-main"
            src="/destinations/living-root-bridges.jpg"
            alt="Lush green hills of Northeast India"
            loading="lazy"
            decoding="async"
          />
          <div className="about-badge">
            <p className="about-badge-quote">"Where every trail tells a thousand-year story"</p>
            <span className="about-badge-attr">Hornbill Journeys</span>
          </div>
        </Reveal>
        <Reveal className="about-text" delay={2}>
          <SectionLabel>Who We Are</SectionLabel>
          <h2>Born from the valleys of Assam, raised by the Northeast</h2>
          <p>
            We are a homegrown travel agency rooted in the rich, layered culture of Northeast India. For over a
            decade, we have been quietly crafting journeys that take travellers deep into Assam, Meghalaya, Mizoram,
            Arunachal Pradesh, Tripura, and Sikkim.
          </p>
          <p>
            From the world's largest river island to the world's wettest place, from one-horned rhinos to hornbill
            festivals - we connect you to places that still feel like secrets.
          </p>
          <div className="about-features">
            {features.map(([title, copy]) => (
              <div className="about-feat" key={title}>
                <div className="feat-body"><strong>{title}</strong><span>{copy}</span></div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
