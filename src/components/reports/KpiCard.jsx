export default function KpiCard({ icon, iconBg, iconColor, num, label, sub, badge, badgeType = "neu" }) {
  return (
    <div className="kpi-card">
      <div className="kpi-top">
        <div className="kpi-icon" style={{ background: iconBg, color: iconColor }}>
          {icon}
        </div>
        {badge && ( 
          <span className={`kpi-badge ${badgeType}`}>{badge}</span>
        )}
      </div>
      <div>
        <div className="kpi-num">{num}</div>
        <div className="kpi-label">{label}</div>
        {sub && <div className="kpi-sub">{sub}</div>}
      </div>
    </div>
  );
}