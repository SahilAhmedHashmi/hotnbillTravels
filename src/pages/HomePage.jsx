import HeroSection from '../components/home/HeroSection.jsx';
import StatsBar from '../components/home/StatsBar.jsx';
import AboutSection from '../components/home/AboutSection.jsx';
import DestinationsPreview from '../components/home/DestinationsPreview.jsx';
import FleetPreview from '../components/home/FleetPreview.jsx';
import PackagesPreview from '../components/home/PackagesPreview.jsx';
import TrustSection from '../components/home/TrustSection.jsx';
import TestimonialsSection from '../components/home/TestimonialsSection.jsx';
import FinalCtaSection from '../components/home/FinalCtaSection.jsx';
import SectionDivider from '../components/common/SectionDivider.jsx';
import { destinations } from '../data/destinations.js';
import { usePageMeta } from '../hooks/usePageMeta.js';

export default function HomePage() {
  usePageMeta({
    title: 'Hornbill Journeys | Northeast India Travel',
    description: 'Premium Northeast India travel planning with curated destinations, guided experiences, reliable vehicles, and custom itineraries.',
    image: destinations[0]?.image,
  });

  return (
    <main>
      <HeroSection />
      <StatsBar />
      <AboutSection />
      <SectionDivider />
      <DestinationsPreview />
      <SectionDivider />
      <FleetPreview />
      <SectionDivider />
      <PackagesPreview />
      <TrustSection />
      <TestimonialsSection />
      <FinalCtaSection />
    </main>
  );
}
