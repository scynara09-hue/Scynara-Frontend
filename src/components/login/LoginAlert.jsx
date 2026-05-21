const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" width="15" height="15">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const IconX = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" width="15" height="15">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

export default function LoginAlert({ type, message }) {
  if (!message) return null;
  return (
    <div className={`reg-alert reg-alert--${type}`}>
      {type === "success" ? <IconCheck /> : <IconX />}
      {message}
    </div>
  );
}