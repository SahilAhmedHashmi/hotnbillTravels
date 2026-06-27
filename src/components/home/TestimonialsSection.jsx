import Reveal from '../common/Reveal.jsx';
import SectionLabel from '../common/SectionLabel.jsx';
import TestimonialCard from '../cards/TestimonialCard.jsx';
import { testimonials } from '../../data/testimonials.js';

export default function TestimonialsSection() {
  return (
    <section className="testimonials">
      <div className="testi-header">
        <SectionLabel>Traveller Stories</SectionLabel>
        <h2>What Our Guests Say</h2>
      </div>
      <div className="testi-grid">
        {testimonials.map((item, index) => (
          <Reveal key={item.name} delay={index}>
            <TestimonialCard item={item} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
