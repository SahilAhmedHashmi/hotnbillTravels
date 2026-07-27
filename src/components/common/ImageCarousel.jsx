import { useEffect, useMemo, useState } from 'react';

function normalizeImages(images, fallbackAlt) {
  const seen = new Set();
  return (images || [])
    .map((image) => (typeof image === 'string' ? { src: image, alt: fallbackAlt } : image))
    .filter((image) => {
      if (!image?.src || seen.has(image.src)) return false;
      seen.add(image.src);
      return true;
    });
}

export default function ImageCarousel({ images, fallbackAlt = '', interval = 3200, eager = false, className = '' }) {
  const resolvedImages = useMemo(() => normalizeImages(images, fallbackAlt), [images, fallbackAlt]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (resolvedImages.length <= 1) return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % resolvedImages.length);
    }, interval);
    return () => clearInterval(id);
  }, [resolvedImages.length, interval]);

  return (
    <span className={`image-carousel ${className}`.trim()} aria-hidden="true">
      {resolvedImages.map((image, i) => (
        <img
          key={image.src}
          src={image.src}
          alt=""
          className={`image-carousel-img ${i === index ? 'is-active' : ''}`}
          loading={eager && i === 0 ? 'eager' : 'lazy'}
          decoding="async"
          {...(eager && i === 0 ? { fetchPriority: 'high' } : {})}
        />
      ))}
      {resolvedImages.length > 1 && (
        <span className="image-carousel-dots">
          {resolvedImages.map((image, i) => (
            <span key={image.src} className={`image-carousel-dot ${i === index ? 'is-active' : ''}`} />
          ))}
        </span>
      )}
    </span>
  );
}
