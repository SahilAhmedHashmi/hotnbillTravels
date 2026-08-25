import { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion.js';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const introSelectors = [
  '.section-header', '.vehicles-header', '.testi-header', '.destination-listing-intro',
  '.system-section-heading', '.section-heading', '.fleet-section-heading',
];

const imageSelectors = [
  '.about-img-col', '.system-gallery', '.destination-gallery', '.experience-gallery',
  '.fleet-driver-image', '.contact-story-image',
];

export default function ScrollMotion({ children }) {
  const scopeRef = useRef(null);
  const location = useLocation();
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (reducedMotion) return undefined;

    const intros = gsap.utils.toArray(introSelectors.join(', '), scopeRef.current);
    intros.forEach((intro) => {
      const parts = intro.querySelectorAll('.label, h2, h1, .section-bridge, .sub, p, .view-all, .btn');
      if (!parts.length) return;
      gsap.from(parts, {
        y: 24,
        autoAlpha: 0,
        duration: 0.72,
        stagger: 0.075,
        ease: 'power3.out',
        scrollTrigger: { trigger: intro, start: 'top 84%', once: true },
      });
    });

    gsap.utils.toArray(imageSelectors.join(', '), scopeRef.current).forEach((visual) => {
      gsap.from(visual, {
        clipPath: 'inset(0 0 100% 0)',
        y: 18,
        duration: 1,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: visual, start: 'top 86%', once: true },
      });
      const image = visual.querySelector('img');
      if (image) {
        gsap.from(image, {
          scale: 1.045,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: { trigger: visual, start: 'top 86%', once: true },
        });
      }
    });

    const cardGroups = gsap.utils.toArray(
      '.destination-list-grid, .experience-list-grid, .fleet-list-grid, .trust-grid, .testi-grid, .system-card-grid',
      scopeRef.current,
    );
    cardGroups.forEach((group) => {
      gsap.from(group.children, {
        y: 20,
        autoAlpha: 0,
        duration: 0.58,
        stagger: 0.065,
        ease: 'power2.out',
        scrollTrigger: { trigger: group, start: 'top 86%', once: true },
      });
    });

    const refresh = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => window.cancelAnimationFrame(refresh);
  }, { scope: scopeRef, dependencies: [location.pathname, reducedMotion], revertOnUpdate: true });

  return <div className="scroll-motion-scope" ref={scopeRef}>{children}</div>;
}
