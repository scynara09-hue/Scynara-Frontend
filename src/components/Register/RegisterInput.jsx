export default function RegisterInput({
  id, label, type = "text", placeholder,
  value, onChange, error, icon, children,
}) {
  return (
    <div className="reg-field">
      <label htmlFor={id}>{label}</label>
      <div className="reg-input-wrap">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`reg-input ${error ? "error" : ""}`}
        />
        <span className="reg-input-icon">{icon}</span>
        {children}
      </div>
      {error && <span className="reg-error">{error}</span>}
    </div>
  );
}