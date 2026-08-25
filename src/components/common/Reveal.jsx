import { useRevealOnScroll } from '../../hooks/useRevealOnScroll.js';

export default function Reveal({ children, delay = 0, className = '', as: Component = 'div', ...props }) {
  const { ref, visible } = useRevealOnScroll();
  return (
    <Component ref={ref} className={`reveal reveal-delay-${delay} ${visible ? 'visible' : ''} ${className}`.trim()} {...props}>
      {children}
    </Component>
  );
}
