export default function FAQ({ items, className = '' }) {
  return (
    <div className={`system-faq ${className}`.trim()}>
      {items.map((faq) => (
        <details key={faq.question}>
          <summary>{faq.question}</summary>
          <p>{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
