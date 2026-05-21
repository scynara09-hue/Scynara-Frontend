function getStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

const labels = ["Ingresa una contraseña", "Muy débil", "Regular", "Buena", "Muy segura"];
const classes = ["", "weak", "fair", "good", "strong"];

export default function PasswordStrength({ password }) {
  const score = password ? getStrength(password) : 0;

  return (
    <div className="reg-strength">
      <div className="reg-strength-bar">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`reg-strength-seg ${password && i < score ? classes[score] : ""}`}
          />
        ))}
      </div>
      <span className="reg-strength-label">{labels[score]}</span>
    </div>
  );
}