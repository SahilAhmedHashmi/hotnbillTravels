import { Link, useParams } from 'react-router-dom';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';
import PackageDestinationCards from '../components/packages/PackageDestinationCards.jsx';
import PackageTimeline from '../components/packages/PackageTimeline.jsx';
import PackageServices from '../components/packages/PackageServices.jsx';
import PackageVehicle from '../components/packages/PackageVehicle.jsx';
import PackageGallery from '../components/packages/PackageGallery.jsx';
import PackageFaqs from '../components/packages/PackageFaqs.jsx';
import RelatedPackages from '../components/packages/RelatedPackages.jsx';
import PackageFinalCta from '../components/packages/PackageFinalCta.jsx';
import { getPackageBySlug } from '../data/packages.js';
import { usePageMeta } from '../hooks/usePageMeta.js';

export default function PackageDetailPage() {
  const { slug } = useParams();
  const item = getPackageBySlug(slug);
  const pageUrl = typeof window !== 'undefined' ? `${window.location.origin}/packages/${slug}` : '';
  const pageDescription = item ? `${item.title}: ${item.description}` : 'The requested Northeast India package could not be found.';

  usePageMeta({
    title: item ? `${item.title} | Northeast India Travel Package` : 'Package Not Found | Hornbill Journeys',
    description: pageDescription,
    image: item?.coverImage,
    canonical: pageUrl,
    noIndex: !item,
    schema: item ? [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: item.title,
        description: pageDescription,
        url: pageUrl,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${window.location.origin}/` },
          { '@type': 'ListItem', position: 2, name: 'Packages', item: `${window.location.origin}/packages` },
          { '@type': 'ListItem', position: 3, name: item.title, item: pageUrl },
        ],
      },
    ] : undefined,
  });

  if (!item) {
    return (
      <main className="placeholder-page">
        <section>
          <p className="label">Package Not Found</p>
          <h1>We could not find that package.</h1>
          <p>The package route may have changed, or this itinerary is not available yet.</p>
          <div className="placeholder-actions">
            <Link className="btn btn-gold" to="/packages">Browse Packages</Link>
            <Link className="btn btn-ghost" to="/contact">Enquire Now</Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="package-detail-page">
      <section className="package-detail-hero">
        <img src={item.coverImage} alt={item.alt} loading="eager" decoding="async" fetchPriority="high" />
        <div className="package-detail-hero-overlay" />
        <div className="package-detail-hero-inner">
          <Breadcrumbs
            items={[
              { label: 'Packages', to: '/packages' },
              { label: item.title, current: true },
            ]}
          />
          <p className="label">{item.duration}</p>
          <h1>{item.title}</h1>
          <p>{item.description}</p>
          <div className="package-hero-facts">
            <span>{item.duration}</span>
            <span>{item.price} starting</span>
            <span>{item.travelStyle}</span>
          </div>
          <div className="destination-hero-actions">
            <Link className="btn btn-gold" to="/contact">Enquire Now</Link>
            <a className="btn btn-ghost" href="#package-itinerary">View Itinerary</a>
          </div>
        </div>
      </section>

      <section className="package-overview-section">
        <div>
          <p className="label">Overview</p>
          <h2>A professionally planned route that stays flexible.</h2>
          <p>{item.overview}</p>
        </div>
        <div className="package-ideal-card">
          <span>Ideal For</span>
          <ul>{item.idealFor.map((entry) => <li key={entry}>{entry}</li>)}</ul>
        </div>
      </section>

      <PackageDestinationCards item={item} />
      <div id="package-itinerary">
        <PackageTimeline item={item} />
      </div>
      <PackageServices item={item} />
      <PackageVehicle item={item} />
      <PackageGallery item={item} />
      <PackageFaqs item={item} />
      <RelatedPackages item={item} />
      <PackageFinalCta item={item} />
    </main>
  );
}

