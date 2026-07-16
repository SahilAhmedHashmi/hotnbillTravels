import { Link, useParams } from 'react-router-dom';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';
import ExperienceDestinationCard from '../components/experiences/ExperienceDestinationCard.jsx';
import ExperiencePackages from '../components/experiences/ExperiencePackages.jsx';
import ExperienceVehicles from '../components/experiences/ExperienceVehicles.jsx';
import ExperienceGallery from '../components/experiences/ExperienceGallery.jsx';
import ExperienceFaqs from '../components/experiences/ExperienceFaqs.jsx';
import ExperienceFinalCta from '../components/experiences/ExperienceFinalCta.jsx';
import { getExperienceBySlug } from '../data/experiences.js';
import { getDestinationBySlug } from '../data/destinations.js';
import { usePageMeta } from '../hooks/usePageMeta.js';

export default function ExperienceDetailPage() {
  const { slug } = useParams();
  const experience = getExperienceBySlug(slug);
  const pageUrl = typeof window !== 'undefined' ? `${window.location.origin}/experiences/${slug}` : '';
  const pageDescription = experience
    ? `Explore ${experience.title.toLowerCase()} routes across Northeast India with comfortable vehicles and experienced local drivers.`
    : 'The requested Northeast India travel experience could not be found.';

  usePageMeta({
    title: experience ? `${experience.title} Travel in Northeast India | Guided Vehicle Tours` : 'Experience Not Found | Hornbill Journeys',
    description: pageDescription,
    image: experience?.image,
    canonical: pageUrl,
    noIndex: !experience,
    schema: experience ? [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: `${experience.title} Travel Experience`,
        description: pageDescription,
        url: pageUrl,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${window.location.origin}/` },
          { '@type': 'ListItem', position: 2, name: 'Experiences', item: `${window.location.origin}/experiences` },
          { '@type': 'ListItem', position: 3, name: experience.title, item: pageUrl },
        ],
      },
    ] : undefined,
  });

  if (!experience) {
    return (
      <main className="placeholder-page">
        <section>
          <p className="label">Experience Not Found</p>
          <h1>We could not find that experience.</h1>
          <p>The route may have changed, or this experience has not been added yet.</p>
          <div className="placeholder-actions">
            <Link className="btn btn-gold" to="/experiences">Browse Experiences</Link>
            <Link className="btn btn-ghost" to="/contact">Enquire Now</Link>
          </div>
        </section>
      </main>
    );
  }

  const bestDestinations = experience.bestDestinations
    .map((destinationSlug) => getDestinationBySlug(destinationSlug))
    .filter(Boolean);

  return (
    <main className="experience-detail-page">
      <section className="experience-detail-hero">
        <img src={experience.image} alt={experience.alt} loading="eager" decoding="async" fetchPriority="high" />
        <div className="experience-detail-hero-overlay" />
        <div className="experience-detail-hero-inner">
          <Breadcrumbs
            items={[
              { label: 'Experiences', to: '/experiences' },
              { label: experience.title, current: true },
            ]}
          />
          <p className="label">Experience</p>
          <h1>{experience.title}</h1>
          <p>{experience.shortDescription}</p>
          <div className="destination-hero-actions">
            <Link className="btn btn-gold" to="/contact">Enquire Now</Link>
            <a className="btn btn-ghost" href="#best-destinations">View Destinations</a>
          </div>
        </div>
      </section>

      <section className="experience-overview">
        <div>
          <p className="label">Overview</p>
          <h2>What this experience involves.</h2>
          <p>{experience.longDescription}</p>
        </div>
        <div className="experience-fast-facts">
          <div><span>Ideal For</span><strong>{experience.idealFor.join(', ')}</strong></div>
          <div><span>Highlights</span><strong>{experience.highlights.slice(0, 3).join(', ')}</strong></div>
        </div>
      </section>

      <section className="experience-detail-section" id="best-destinations">
        <div className="experience-section-heading">
          <p className="label">Best Destinations</p>
          <h2>Where to have this experience.</h2>
        </div>
        <div className="experience-destination-grid">
          {bestDestinations.map((destination) => (
            <ExperienceDestinationCard key={destination.slug} experience={experience} destination={destination} />
          ))}
        </div>
      </section>

      <ExperiencePackages experience={experience} />
      <ExperienceVehicles experience={experience} />
      <ExperienceGallery experience={experience} />
      <ExperienceFaqs experience={experience} />
      <ExperienceFinalCta experience={experience} />
    </main>
  );
}

