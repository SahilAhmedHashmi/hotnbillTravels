import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';
import ExperienceListingCard from '../components/experiences/ExperienceListingCard.jsx';
import ExperienceDestinationCard from '../components/experiences/ExperienceDestinationCard.jsx';
import ExperienceFinalCta from '../components/experiences/ExperienceFinalCta.jsx';
import { experiences } from '../data/experiences.js';
import { getDestinationBySlug } from '../data/destinations.js';
import { usePageMeta } from '../hooks/usePageMeta.js';

export default function ExperiencesPage() {
  const previewExperience = experiences[0];
  const recommended = [...new Set(experiences.flatMap((experience) => experience.bestDestinations))].slice(0, 6);

  usePageMeta({
    title: 'Travel Experiences in Northeast India | Hornbill Journeys',
    description: 'Browse Northeast India travel by experience: wildlife, adventure, culture, photography, family trips, road trips, and nature escapes.',
    image: previewExperience.image,
  });

  return (
    <main className="experiences-page">
      <section className="experience-page-hero">
        <div className="experience-hero-bg" />
        <div className="experience-hero-overlay" />
        <div className="experience-page-hero-inner">
          <Breadcrumbs items={[{ label: 'Experiences', current: true }]} />
          <p className="label">Travel Style</p>
          <h1>Choose How You Want to Experience the Northeast</h1>
          <p>
            Whether you are looking for wildlife, waterfalls, mountain roads, culture, photography, or peaceful family
            travel, discover the experiences that match your journey.
          </p>
          <div className="destination-hero-actions">
            <Link className="btn btn-gold" to="/plan-my-trip">Plan My Trip</Link>
            <a className="btn btn-ghost" href="#experience-grid">Browse Experiences</a>
          </div>
        </div>
      </section>

      <section className="experience-listing-section" id="experience-grid">
        <div className="experience-listing-intro">
          <div>
            <p className="label">Choose by Travel Style</p>
            <h2>Start with what you want to feel, then we will shape where to go.</h2>
          </div>
          <p>
            Experience-led planning helps match destinations, vehicles, season, route difficulty, and pacing before the
            itinerary becomes too crowded.
          </p>
        </div>
        <div className="experience-list-grid">
          {experiences.map((experience) => <ExperienceListingCard key={experience.slug} experience={experience} />)}
        </div>
      </section>

      <section className="experience-recommended-section">
        <div className="experience-section-heading">
          <p className="label">Where It Leads</p>
          <h2>Destinations that often match these journeys.</h2>
        </div>
        <div className="experience-destination-grid">
          {recommended.map((slug) => {
            const destination = getDestinationBySlug(slug);
            return destination ? <ExperienceDestinationCard key={slug} experience={previewExperience} destination={destination} /> : null;
          })}
        </div>
      </section>

      <ExperienceFinalCta experience={{ slug: 'custom-experience' }} />
    </main>
  );
}

