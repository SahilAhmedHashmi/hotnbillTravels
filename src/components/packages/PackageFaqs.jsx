import FAQ from '../common/FAQ.jsx';

export default function PackageFaqs({ item }) {
  return (
    <section className="package-detail-section">
      <div className="package-section-heading">
        <p className="label">Good to Know</p>
        <h2>FAQs</h2>
      </div>
      <FAQ items={item.faq} className="package-faqs" />
    </section>
  );
}
