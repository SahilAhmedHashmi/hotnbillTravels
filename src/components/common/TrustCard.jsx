export default function TrustCard({ value, label, detail }) {
  return (
    <article className="trust-card card-surface">
      <strong>{value}</strong>
      <span>{label}</span>
      <p>{detail}</p>
    </article>
  );
}
