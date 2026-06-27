export default function FormField({ label, error, children }) {
  return (
    <label className={`form-field ${error ? 'has-error' : ''}`}>
      <span>{label}</span>
      {children}
      {error ? <small>{error}</small> : null}
    </label>
  );
}
