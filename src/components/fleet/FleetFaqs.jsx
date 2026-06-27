import FAQ from '../common/FAQ.jsx';

const defaultFaqs = [
  { question: 'Are drivers included with every vehicle?', answer: 'Yes. Vehicles are provided with experienced local drivers.' },
  { question: 'Are prices fixed?', answer: 'Listed rates are indicative. Final quotes depend on route, season, distance, permits, and trip duration.' },
  { question: 'Can I choose a vehicle for a specific route?', answer: 'Yes. The booking flow can preselect a vehicle, and our team can recommend alternatives if the route needs one.' },
];

export default function FleetFaqs({ items = defaultFaqs }) {
  return (
    <section className="fleet-faq-section">
      <div className="fleet-section-heading">
        <p className="label">Fleet FAQs</p>
        <h2>Common transport questions.</h2>
      </div>
      <FAQ items={items} className="fleet-faqs" />
    </section>
  );
}
