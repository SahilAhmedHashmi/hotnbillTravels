import { stats } from '../../data/stats.js';

export default function StatsBar() {
  return (
    <div className="stats-bar">
      <div className="stats-inner">
        {stats.map((stat) => (
          <div className="stat-item" key={stat.label}>
            <div className="stat-num">{stat.value}</div>
            <div className="stat-lbl">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
