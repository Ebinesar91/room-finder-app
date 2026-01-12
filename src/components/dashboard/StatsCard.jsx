import './StatsCard.css';

export const StatsCard = ({ icon, label, value, trend, color = 'primary' }) => {
    return (
        <div className={`stats-card card stats-card-${color}`}>
            <div className="stats-icon">{icon}</div>
            <div className="stats-content">
                <div className="stats-value">{value}</div>
                <div className="stats-label">{label}</div>
                {trend && (
                    <div className={`stats-trend ${trend > 0 ? 'positive' : 'negative'}`}>
                        <span>{trend > 0 ? '↑' : '↓'}</span>
                        <span>{Math.abs(trend)}%</span>
                    </div>
                )}
            </div>
        </div>
    );
};
