function WitnessCard({ witness, reviewed, onToggle }) {
  return (
    <div className={`info-card witness-card ${reviewed ? 'is-reviewed' : ''}`}>
      <div className="card-header-row">
        <h4>{witness.name}</h4>
        <span className="meta-pill">{witness.occupation}</span>
      </div>
      <p className="statement">“{witness.statement}”</p>
      <div className="meta-row">
        <span className="meta-pill">{witness.time}</span>
        <span className="meta-pill">{witness.location}</span>
      </div>
      <button type="button" className="secondary-button" onClick={() => onToggle(witness.id)}>
        {reviewed ? 'Reviewed' : 'Review Statement'}
      </button>
    </div>
  )
}

export default WitnessCard
