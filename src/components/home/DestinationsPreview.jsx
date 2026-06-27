import { Link } from 'react-router-dom';
import Reveal from '../common/Reveal.jsx';
import SectionLabel from '../common/SectionLabel.jsx';
import DestinationCard from '../cards/DestinationCard.jsx';
import { featuredDestinations } from '../../data/destinations.js';

export default function DestinationsPreview() {
  return (
    <section className="destinations">
      <div className="section-header dest-header">
        <div>
          <SectionLabel>Explore the Region</SectionLabel>
          <h2>Our <em>Favourite</em> Destinations</h2>
          <p className="section-bridge">Start with the landscapes that define the Northeast - wild, sacred, remote, and deeply alive.</p>
        </div>
        <Link to="/destinations" className="view-all">View All Destinations</Link>
      </div>
      <div className="dest-grid">
        {featuredDestinations.map((destination, index) => (
          <Reveal key={destination.slug} delay={index % 3}>
            <DestinationCard destination={destination} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
