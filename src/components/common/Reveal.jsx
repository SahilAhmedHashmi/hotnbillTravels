import { useRevealOnScroll } from '../../hooks/useRevealOnScroll.js';

export default function Reveal({ children, delay = 0, className = '', as: Component = 'div' }) {
  const { ref, visible } = useRevealOnScroll();
  return (
    <Component ref={ref} className={`reveal reveal-delay-${delay} ${visible ? 'visible' : ''} ${className}`.trim()}>
      {children}
    </Component>
  );
}
