export default function TestimonialCard({ item }) {
  return (
    <article className="testi-card">
      <div className="testi-stars" aria-label="Five star review">
        <span /><span /><span /><span /><span />
      </div>
      <p className="testi-text">"{item.quote}"</p>
      <div className="testi-author">
        <div className="testi-av">{item.initials}</div>
        <div>
          <p className="testi-name">{item.name}</p>
          <p className="testi-from">{item.from}</p>
        </div>
      </div>
    </article>
  );
}
