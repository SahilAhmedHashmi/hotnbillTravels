import VersionHome from '../components/versions/VersionHome.jsx';
import { destinations } from '../data/destinations.js';
import { usePageMeta } from '../hooks/usePageMeta.js';
import { useDesign } from '../context/DesignContext.jsx';
import { useDirectionMotion } from '../hooks/useDirectionMotion.js';

export default function HomePage() {
  const { direction } = useDesign();
  const motionScope = useDirectionMotion(direction);
  usePageMeta({
    title: 'Hornbill Journeys | Northeast India Travel',
    description: 'Premium Northeast India travel planning with curated destinations, guided experiences, reliable vehicles, and custom itineraries.',
    image: destinations[0]?.image,
  });

  return (
    <main ref={motionScope} className={`home home--${direction}`}>
      <VersionHome direction={direction} />
    </main>
  );
}
