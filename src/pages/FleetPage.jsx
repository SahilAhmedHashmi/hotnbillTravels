import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';
import FleetVehicleCard from '../components/fleet/FleetVehicleCard.jsx';
import FleetWhySection from '../components/fleet/FleetWhySection.jsx';
import FleetDriverSection from '../components/fleet/FleetDriverSection.jsx';
import FleetFaqs from '../components/fleet/FleetFaqs.jsx';
import VehicleFinalCta from '../components/fleet/VehicleFinalCta.jsx';
import { vehicles } from '../data/vehicles.js';
import { usePageMeta } from '../hooks/usePageMeta.js';

export default function FleetPage() {
  usePageMeta({
    title: 'Fleet & Vehicle Rentals for Northeast India | Hornbill Journeys',
    description: 'Travel across Northeast India with comfortable vehicles, experienced local drivers, and transparent route-based pricing.',
    image: vehicles[0].image,
  });

  return (
    <main className="fleet-page">
      <section className="fleet-hero">
        <div className="fleet-hero-bg" />
        <div className="fleet-hero-overlay" />
        <div className="fleet-hero-inner">
          <Breadcrumbs items={[{ label: 'Fleet', current: true }]} />
          <p className="label">Fleet & Drivers</p>
          <h1>Travel in Comfort Across Northeast India</h1>
          <p>
            Professional local drivers, comfortable vehicles, practical route knowledge, and clear pricing for journeys
            across mountains, forests, valleys, and long highway transfers.
          </p>
          <div className="destination-hero-actions">
            <Link className="btn btn-gold" to="/plan-my-trip">Plan My Trip</Link>
            <a className="btn btn-ghost" href="#fleet-grid">View Vehicles</a>
          </div>
        </div>
      </section>

      <section className="fleet-list-section" id="fleet-grid">
        <div className="fleet-section-heading">
          <p className="label">Choose Your Vehicle</p>
          <h2>Reliable options for different routes, groups, and comfort needs.</h2>
        </div>
        <div className="fleet-grid">
          {vehicles.map((vehicle) => <FleetVehicleCard key={vehicle.slug} vehicle={vehicle} />)}
        </div>
      </section>

      <FleetWhySection />
      <FleetDriverSection />
      <FleetFaqs />
      <VehicleFinalCta vehicle={{ name: 'the Right Vehicle', slug: 'fleet-enquiry' }} />
    </main>
  );
}

