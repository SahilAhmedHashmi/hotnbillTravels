import { useCallback, useEffect, useRef, useState } from 'react';

export function useHorizontalCarousel(itemCount = 0) {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(itemCount > 1 ? 1 : 0);

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const center = track.getBoundingClientRect().left + track.clientWidth / 2;
    const cards = [...track.querySelectorAll('[data-carousel-item]')];
    if (!cards.length) return;
    const nearest = cards.reduce((best, card, index) => {
      const rect = card.getBoundingClientRect();
      const distance = Math.abs(rect.left + rect.width / 2 - center);
      return distance < best.distance ? { index, distance } : best;
    }, { index: 0, distance: Number.POSITIVE_INFINITY });
    setActiveIndex(nearest.index);
  }, []);

  const goTo = useCallback((index) => {
    const track = trackRef.current;
    const cards = [...(track?.querySelectorAll('[data-carousel-item]') ?? [])];
    const next = Math.max(0, Math.min(index, cards.length - 1));
    cards[next]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    setActiveIndex(next);
  }, []);

  const move = useCallback((direction) => goTo(activeIndex + direction), [activeIndex, goTo]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    update();
    let frame;
    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.cancelAnimationFrame(frame);
      track.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
    };
  }, [update]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => goTo(itemCount > 1 ? 1 : 0));
    return () => window.cancelAnimationFrame(frame);
  }, [goTo, itemCount]);

  return {
    trackRef,
    activeIndex,
    canGoPrev: activeIndex > 0,
    canGoNext: activeIndex < itemCount - 1,
    move,
    goTo,
  };
}
