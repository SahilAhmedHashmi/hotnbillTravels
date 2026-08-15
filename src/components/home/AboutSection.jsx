import Reveal from '../common/Reveal.jsx';
import SectionLabel from '../common/SectionLabel.jsx';

const features = [
  ['Route Knowledge', 'Practical local judgement for transfers and road days'],
  ['Vehicle Choice', 'A listed fleet for couples, families, and groups'],
  ['Complete Trips', 'Destinations, experiences, and transport planned together'],
  ['Custom Enquiries', 'Dates, pacing, and preferences collected in one flow'],
];

export default function AboutSection() {
  return (
    <section className="about" id="about-preview">
      <div className="about-inner">
        <Reveal className="about-img-col">
          <div className="about-dot-grid" />
          <img
            className="about-img-main"
            src="https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=900&q=80"
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
            Hornbill Journeys plans travel across Assam, Meghalaya, Mizoram, Arunachal Pradesh, Tripura, and Sikkim.
            Choose a private vehicle with an experienced local driver or ask us to shape the complete journey.
          </p>
          <p>
            The catalogue brings together wildlife landscapes, river islands, waterfalls, caves, monasteries,
            mountain roads, valleys, villages, and city gateways without reducing the region to a single story.
          </p>
          <div className="about-features">
            {features.map(([title, copy]) => (
              <div className="about-feat" key={title}>
                <div className="feat-ico" aria-hidden="true" />
                <div className="feat-body"><strong>{title}</strong><span>{copy}</span></div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
