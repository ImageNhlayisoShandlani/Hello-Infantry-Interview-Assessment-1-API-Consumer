import { memo } from "react";
import "./StatBar.css";

const StatBar = memo(({ label, value }) => {
  const pct = Math.min((value / 225) * 100, 100);
  return (
    <div className="stat-row">
      <span className="stat-row__label">{label}</span>
      <div className="stat-row__track">
        <div className="stat-row__fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="stat-row__value">{value}</span>
    </div>
  );
});

export default StatBar;
