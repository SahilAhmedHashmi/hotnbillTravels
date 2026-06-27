import { useCallback, useEffect, useRef, useState } from 'react';

export function useHorizontalCarousel() {
  const trackRef = useRef(null);
  const [canGoPrev, setCanGoPrev] = useState(false);
  const [canGoNext, setCanGoNext] = useState(true);

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth - 2;
    setCanGoPrev(track.scrollLeft > 2);
    setCanGoNext(track.scrollLeft < maxScroll);
  }, []);

  const getStep = () => {
    const track = trackRef.current;
    const firstCard = track?.querySelector('.vehicle-card');
    if (!track || !firstCard) return 0;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return firstCard.getBoundingClientRect().width + gap;
  };

  const scrollByStep = (direction) => {
    trackRef.current?.scrollBy({ left: direction * getStep(), behavior: 'smooth' });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    update();
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      track.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [update]);

  return { trackRef, canGoPrev, canGoNext, scrollByStep };
}
