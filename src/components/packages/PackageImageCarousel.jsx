import { useEffect, useState } from 'react';
import { getDestinationBySlug } from '../../data/destinations.js';

// Build the image set for a package from the destinations it covers,
// falling back to the package's own cover image if none resolve.
function resolveImages(item) {
  const seen = new Set();
  const images = [];
  (item.destinations || []).forEach((slug) => {
    const dest = getDestinationBySlug(slug);
    if (dest?.image && !seen.has(dest.image)) {
      seen.add(dest.image);
      images.push({ src: dest.image, alt: dest.alt || `${dest.name}, ${dest.state}` });
    }
  });
  if (!images.length) {
    const fallback = item.coverImage || item.image;
    if (fallback) images.push({ src: fallback, alt: item.alt || item.title });
  }
  return images;
}

export default function PackageImageCarousel({ item, interval = 3200 }) {
  const [images] = useState(() => resolveImages(item));
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % images.length);
    }, interval);
    return () => clearInterval(id);
  }, [images.length, interval]);

  return (
    <span className="pkg-carousel" aria-hidden="true">
      {images.map((image, i) => (
        <img
          key={image.src}
          src={image.src}
          alt=""
          className={`pkg-carousel-img ${i === index ? 'is-active' : ''}`}
          loading="lazy"
          decoding="async"
        />
      ))}
      {images.length > 1 && (
        <span className="pkg-carousel-dots">
          {images.map((image, i) => (
            <span key={image.src} className={`pkg-carousel-dot ${i === index ? 'is-active' : ''}`} />
          ))}
        </span>
      )}
    </span>
  );
}
