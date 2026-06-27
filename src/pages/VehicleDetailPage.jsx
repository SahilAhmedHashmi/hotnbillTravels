import { Link, useParams } from 'react-router-dom';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';
import FleetDriverSection from '../components/fleet/FleetDriverSection.jsx';
import FleetFaqs from '../components/fleet/FleetFaqs.jsx';
import VehicleSpecGrid from '../components/fleet/VehicleSpecGrid.jsx';
import VehiclePricing from '../components/fleet/VehiclePricing.jsx';
import VehicleGallery from '../components/fleet/VehicleGallery.jsx';
import RelatedVehicles from '../components/fleet/RelatedVehicles.jsx';
import VehicleFinalCta from '../components/fleet/VehicleFinalCta.jsx';
import { getVehicleBySlug } from '../data/vehicles.js';
import { usePageMeta } from '../hooks/usePageMeta.js';

export default function VehicleDetailPage() {
  const { vehicleSlug } = useParams();
  const vehicle = getVehicleBySlug(vehicleSlug);
  const pageUrl = typeof window !== 'undefined' ? `${window.location.origin}/fleet/${vehicleSlug}` : '';
  const pageDescription = vehicle
    ? `${vehicle.name} with experienced local driver for Northeast India routes, transfers, and custom travel plans.`
    : 'The requested vehicle could not be found.';

  usePageMeta({
    title: vehicle ? `${vehicle.name} Rental | Northeast India Travel Fleet` : 'Vehicle Not Found | Hornbill Journeys',
    description: pageDescription,
    image: vehicle?.image,
    canonical: pageUrl,
    noIndex: !vehicle,
    schema: vehicle ? [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: `${vehicle.name} Rental`,
        description: pageDescription,
        url: pageUrl,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${window.location.origin}/` },
          { '@type': 'ListItem', position: 2, name: 'Fleet', item: `${window.location.origin}/fleet` },
          { '@type': 'ListItem', position: 3, name: vehicle.name, item: pageUrl },
        ],
      },
    ] : undefined,
  });

  if (!vehicle) {
    return (
      <main className="placeholder-page">
        <section>
          <p className="label">Vehicle Not Found</p>
          <h1>We could not find that vehicle.</h1>
          <p>The vehicle route may have changed, or this option is not available yet.</p>
          <div className="placeholder-actions">
            <Link className="btn btn-gold" to="/fleet">Browse Fleet</Link>
            <Link className="btn btn-ghost" to="/plan-my-trip">Plan My Trip</Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="vehicle-detail-page">
      <section className="vehicle-detail-hero">
        <img src={vehicle.image} alt={vehicle.alt} loading="eager" decoding="async" fetchPriority="high" />
        <div className="vehicle-detail-hero-overlay" />
        <div className="vehicle-detail-hero-inner">
          <Breadcrumbs
            items={[
              { label: 'Fleet', to: '/fleet' },
              { label: vehicle.name, current: true },
            ]}
          />
          <p className="label">{vehicle.type}</p>
          <h1>{vehicle.name}</h1>
          <p>{vehicle.description}</p>
          <div className="vehicle-hero-facts">
            <span>{vehicle.passengerCapacity}</span>
            <span>{vehicle.pricing.perDay} / day</span>
            <span>Driver Included</span>
          </div>
          <div className="destination-hero-actions">
            <Link className="btn btn-gold" to={`/plan-my-trip?vehicle=${vehicle.slug}`}>Book Now</Link>
            <a className="btn btn-ghost" href="#vehicle-pricing">View Pricing</a>
          </div>
        </div>
      </section>

      <section className="vehicle-overview-section">
        <div>
          <p className="label">Overview</p>
          <h2>Why choose this vehicle?</h2>
          <p>{vehicle.overview}</p>
        </div>
        <div className="vehicle-ideal-card">
          <span>Ideal For</span>
          <ul>{vehicle.recommendedFor.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </section>

      <VehicleSpecGrid vehicle={vehicle} />

      <section className="vehicle-detail-section">
        <div className="fleet-section-heading">
          <p className="label">Features</p>
          <h2>Comfort and route confidence.</h2>
        </div>
        <div className="vehicle-feature-grid">
          {vehicle.features.map((feature) => (
            <article key={feature}>
              <h3>{feature}</h3>
              <p>Selected because it makes Northeast India travel more comfortable, reliable, or practical.</p>
            </article>
          ))}
        </div>
      </section>

      <FleetDriverSection />

      <div id="vehicle-pricing">
        <VehiclePricing vehicle={vehicle} />
      </div>

      <VehicleGallery vehicle={vehicle} />
      <FleetFaqs items={vehicle.faq} />
      <RelatedVehicles vehicle={vehicle} />
      <VehicleFinalCta vehicle={vehicle} />
    </main>
  );
}

