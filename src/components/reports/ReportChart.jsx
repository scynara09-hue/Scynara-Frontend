import {
  ResponsiveContainer, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from "recharts";
import { useState } from "react";

const CustomTooltip = ({ active, payload, label, prefix = "" }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "var(--color-background-primary)",
      border: "0.5px solid var(--color-border-secondary)",
      borderRadius: 10,
      padding: "8px 12px",
      fontSize: 12,
    }}>
      <p style={{ color: "var(--color-text-tertiary)", marginBottom: 4 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color, fontWeight: 700 }}>
          {prefix}{typeof p.value === "number" ? p.value.toLocaleString("es-MX") : p.value}
        </p>
      ))}
    </div>
  );
};

export default function ReportChart({ title, sub, data, dataKey, color = "#10b981", prefix = "", allowToggle = true }) {
  const [type, setType] = useState("bar");

  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <div>
          <div className="chart-card-title">{title}</div>
          {sub && <div className="chart-card-sub">{sub}</div>}
        </div>
        {allowToggle && (
          <div className="chart-toggle">
            {["bar", "line"].map(t => (
              <button
                key={t}
                className={`chart-toggle-btn${type === t ? " active" : ""}`}
                onClick={() => setType(t)}
              >
                {t === "bar" ? "Barras" : "Línea"}
              </button>
            ))}
          </div>
        )}
      </div>

      <ResponsiveContainer width="100%" height={220}>
        {type === "bar" ? (
          <BarChart data={data} barSize={28}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-tertiary)" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: "var(--color-text-tertiary)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "var(--color-text-tertiary)" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip prefix={prefix} />} />
            <Bar dataKey={dataKey} fill={color} radius={[6, 6, 0, 0]} />
          </BarChart>
        ) : (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-tertiary)" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: "var(--color-text-tertiary)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "var(--color-text-tertiary)" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip prefix={prefix} />} />
            <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2.5} dot={{ r: 3, fill: color }} activeDot={{ r: 5 }} />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}