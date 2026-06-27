export default function SectionLabel({ children, className = '' }) {
  return <p className={`label ${className}`.trim()}>{children}</p>;
}
