import { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion.js';

gsap.registerPlugin(useGSAP);

export default function PageTransition({ children }) {
  const rootRef = useRef(null);
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  useGSAP(() => {
    if (reduceMotion) return;
    gsap.fromTo(rootRef.current, { y: 4 }, { y: 0, duration: 0.28, ease: 'power2.out', clearProps: 'transform' });
  }, { scope: rootRef, dependencies: [location.key, reduceMotion], revertOnUpdate: true });

  return <div className="page-transition" ref={rootRef}>{children}</div>;
}
