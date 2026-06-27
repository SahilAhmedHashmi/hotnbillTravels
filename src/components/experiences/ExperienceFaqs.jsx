import FAQ from '../common/FAQ.jsx';

export default function ExperienceFaqs({ experience }) {
  return (
    <section className="experience-detail-section">
      <div className="experience-section-heading">
        <p className="label">Good to Know</p>
        <h2>FAQs</h2>
      </div>
      <FAQ items={experience.faqs} className="experience-faqs" />
    </section>
  );
}
