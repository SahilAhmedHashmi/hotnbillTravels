export default function PackageServices({ item }) {
  return (
    <section className="package-services-section">
      <div className="package-section-heading">
        <p className="label">Services</p>
        <h2>What is included, and what stays flexible.</h2>
      </div>
      <div className="package-services-grid">
        <article>
          <h3>Included Services</h3>
          <ul>{item.inclusions.map((entry) => <li key={entry}>{entry}</li>)}</ul>
        </article>
        <article>
          <h3>Excluded Services</h3>
          <ul>{item.exclusions.map((entry) => <li key={entry}>{entry}</li>)}</ul>
        </article>
      </div>
    </section>
  );
}
