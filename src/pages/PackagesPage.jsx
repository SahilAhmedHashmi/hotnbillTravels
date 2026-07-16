import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';
import PackageListingCard from '../components/packages/PackageListingCard.jsx';
import PackageFinalCta from '../components/packages/PackageFinalCta.jsx';
import PackageFaqs from '../components/packages/PackageFaqs.jsx';
import { packages } from '../data/packages.js';
import { usePageMeta } from '../hooks/usePageMeta.js';

const listingFaq = {
  faq: [
    { question: 'Are these fixed tours?', answer: 'No. Packages are professionally recommended itineraries that can be customized around dates, hotels, vehicles, and interests.' },
    { question: 'Can I change the vehicle?', answer: 'Yes. Each package has a recommended vehicle, but we can adjust based on group size and comfort needs.' },
    { question: 'Do prices include hotels?', answer: 'Package prices are starting references. Final quotes clarify hotels, meals, permits, and route inclusions.' },
  ],
};

export default function PackagesPage() {
  usePageMeta({
    title: 'Curated Northeast India Tour Packages | Hornbill Journeys',
    description: 'Explore customizable Northeast India tour packages designed around destinations, vehicles, route timing, and local expertise.',
    image: packages[0].coverImage,
  });

  return (
    <main className="packages-page">
      <section className="packages-hero">
        <div className="packages-hero-bg" />
        <div className="packages-hero-overlay" />
        <div className="packages-hero-inner">
          <Breadcrumbs items={[{ label: 'Packages', current: true }]} />
          <p className="label">Curated Itineraries</p>
          <h1>Curated Northeast India Tour Packages</h1>
          <p>
            Professionally designed itineraries that simplify planning while staying flexible around your dates, group
            size, preferred vehicle, and travel interests.
          </p>
          <div className="destination-hero-actions">
            <Link className="btn btn-gold" to="/contact">Enquire Now</Link>
            <a className="btn btn-ghost" href="#package-grid">View Packages</a>
          </div>
        </div>
      </section>

      <section className="package-list-section" id="package-grid">
        <div className="package-section-heading">
          <p className="label">Recommended Routes</p>
          <h2>Start with a route that already works.</h2>
        </div>
        <div className="package-list-grid">
          {packages.map((item) => <PackageListingCard key={item.slug} item={item} />)}
        </div>
      </section>

      <section className="package-why-section">
        <div className="package-section-heading">
          <p className="label">Why Choose Our Packages</p>
          <h2>They are route frameworks, not rigid products.</h2>
        </div>
        <div className="package-why-grid">
          <article><h3>Designed Around Roads</h3><p>Each route considers realistic drive times, terrain, season, and vehicle suitability.</p></article>
          <article><h3>Easy to Customize</h3><p>Add days, change destinations, upgrade vehicles, or slow the pace without starting from scratch.</p></article>
          <article><h3>Locally Grounded</h3><p>Planning accounts for permits, ferries, safari timing, mountain weather, and local driver knowledge.</p></article>
        </div>
      </section>

      <PackageFaqs item={listingFaq} />
      <PackageFinalCta item={{ slug: 'custom-package' }} />
    </main>
  );
}

