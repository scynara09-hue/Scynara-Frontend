import { useEffect, useState } from "react";

export default function Toast({ message, onHide }) {
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    if (!message) return;
    const t1 = setTimeout(() => setHiding(true), 2200);
    const t2 = setTimeout(() => { setHiding(false); onHide(); }, 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [message]);

  if (!message) return null;

  return (
    <div className={`toast ${hiding ? "hide" : ""}`}>
      <span className="toast-dot" />
      {message}
    </div>
  );
}