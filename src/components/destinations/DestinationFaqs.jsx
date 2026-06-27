import FAQ from '../common/FAQ.jsx';

export default function DestinationFaqs({ destination }) {
  return (
    <section className="destination-detail-section">
      <div className="detail-section-heading">
        <p className="label">Good to Know</p>
        <h2>FAQs</h2>
      </div>
      <FAQ items={destination.faqs} className="destination-faqs" />
    </section>
  );
}
