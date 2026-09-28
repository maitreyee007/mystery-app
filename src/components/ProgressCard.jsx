function ProgressCard({ label, value, subtitle, tone = 'default' }) {
  return (
    <div className={`progress-card ${tone}`}>
      <p className="progress-label">{label}</p>
      <strong className="progress-value">{value}</strong>
      {subtitle ? <span className="progress-meta">{subtitle}</span> : null}
    </div>
  )
}

export default ProgressCard
