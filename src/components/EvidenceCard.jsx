function EvidenceCard({ evidence, reviewed, onSelect, selected }) {
  return (
    <button
      type="button"
      className={`info-card evidence-card ${selected ? 'selected' : ''} ${reviewed ? 'is-reviewed' : ''}`}
      onClick={() => onSelect(evidence.id)}
    >
      <div className="card-header-row">
        <h4>{evidence.title}</h4>
        <span className="meta-pill">{reviewed ? 'Reviewed' : 'Unreviewed'}</span>
      </div>
      <p>{evidence.location}</p>
      <span className="mini-link">View Details</span>
    </button>
  )
}

export default EvidenceCard
