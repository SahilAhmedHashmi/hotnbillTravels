export default function PackageTimeline({ item }) {
  return (
    <section className="package-detail-section">
      <div className="package-section-heading">
        <p className="label">Itinerary</p>
        <h2>Day-by-day journey flow.</h2>
      </div>
      <div className="package-timeline">
        {item.itinerary.map((day) => (
          <article key={`${day.day}-${day.title}`}>
            <div>
              <span>{day.day}</span>
              <h3>{day.title}</h3>
            </div>
            <ul>
              {day.items.map((entry) => <li key={entry}>{entry}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
