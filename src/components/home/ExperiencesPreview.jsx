import Reveal from '../common/Reveal.jsx';
import SectionLabel from '../common/SectionLabel.jsx';
import ExperienceCard from '../cards/ExperienceCard.jsx';
import { homepageExperiences } from '../../data/experiences.js';

export default function ExperiencesPreview() {
  return (
    <section className="experiences">
      <div className="section-header exp-header">
        <div>
          <SectionLabel>What We Offer</SectionLabel>
          <h2>Experiences Woven<br />Into Your Journey</h2>
          <p className="section-bridge dark">Choose the pace and texture of your journey, from river quiet to highland trails.</p>
        </div>
      </div>
      <div className="exp-grid">
        {homepageExperiences.map((experience, index) => (
          <Reveal key={experience.slug} delay={index}>
            <ExperienceCard experience={experience} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
